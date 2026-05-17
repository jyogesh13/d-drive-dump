import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();

let chat = null; // Persistent chat session

const safetySettings = [
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
];

export async function* main(contents, history = []) {
  try {
    // Create or reuse chat session with history
    if (!chat || history.length > 0) {
      chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: history || [],
        config: {
          safetySettings: safetySettings,
        },
      });
    }

    // Handle contents: single text, [text], or [imageData, text]
    let messageContents;
    if (typeof contents === "string") {
      messageContents = contents;
    } else {
      messageContents = contents; // Array: supports [imagePart, {text: prompt}]
    }

    const stream = await chat.sendMessageStream({ message: messageContents });
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini error:", error);
    yield "Error: Unable to generate response.";
  }
}
