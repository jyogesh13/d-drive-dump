import "../config/env.js";
import { Message } from "../models/Message.model.js";
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

const getAIStream = async (conversationId) => {

  const messages = await Message.find({ conversation: conversationId })
    .sort({ createdAt: 1 })
    .limit(10);

  const aiMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  }));

  const stream = await openRouter.chat.send({
    chatGenerationParams: {
      model: "openai/gpt-oss-120b:free",
      messages: aiMessages,
      stream: true,
    },
  });

  return stream;
};

export { getAIStream };
