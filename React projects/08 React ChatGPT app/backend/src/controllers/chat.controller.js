import { Message } from "../models/Message.model.js";
import { Conversation } from "../models/Conversation.model.js";
import { getAIStream } from "../services/ai.service.js";

import { getAuth } from "@clerk/express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const streamChat = async (req, res) => {
  const { userId } = getAuth(req);
  try {
    const { conversationId, content } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    // res.flushHeaders();

    let newConversation = null;
    if (!conversationId) {
      newConversation = await Conversation.create({
        user: userId,
        title: content.substring(0, 40),
      });
    }

    const convId = conversationId || newConversation._id;

    // save user message
    await Message.create({
      conversation: convId,
      role: "user",
      content,
    });

    res.write(`data: ${JSON.stringify({ convId })}\n\n`);

    const stream = await getAIStream(convId);

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (!content) continue;
      fullResponse += content;

      res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      // Final chunk includes usage stats
      if (chunk.usage) {
        console.log("Usage:", chunk.usage);
      }
    }

    // save assistant message
    await Message.create({
      conversation: convId,
      role: "assistant",
      content: fullResponse,
    });

    await Conversation.findByIdAndUpdate(convId, {
      lastMessageAt: new Date(),
    });

    res.write("event: done\ndata: end\n\n");
    res.end();
  } catch (error) {
    // headers already sent, do NOT call res.json
    console.log(error);
    if (!res.headersSent) {
      return res.status(500).json({ message: err.message });
    }

    // send SSE error event instead
    res.write(
      `event: error\ndata: ${JSON.stringify({ message: "Stream failed" })}\n\n`,
    );
    res.end();
  }
};

const getUserConversations = async (req, res, next) => {
  const { userId } = getAuth(req);

  try {
    const conversations = await Conversation.find({ user: userId })
      .select("_id title lastMessageAt createdAt")
      .sort({ lastMessageAt: -1 });

    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const conversationId = req.params.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: userId,
    });

    if (!conversation) {
      throw new ApiError(404, "Conversation not found");
    }

    const messages = await Message.find({
      conversation: conversationId,
    })
      .select("role content tokensUsed createdAt")
      .sort({ createdAt: 1 });

    res.status(200).json(
      new ApiResponse(
        200,
        {
          conversation: {
            id: conversation._id,
            title: conversation.title,
          },
          messages,
        },
        "Conversation messages retrieved",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export { streamChat, getUserConversations, getConversationMessages };
