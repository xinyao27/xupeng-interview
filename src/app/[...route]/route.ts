import { Hono } from "hono";
import { handle } from "hono/vercel";
import { streamText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import {
  createConversation,
  addMessage,
  getConversation,
} from "@/lib/db/utils";

const app = new Hono().basePath("/agent");

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

app.post("/chat", async (c) => {
  try {
    const { messages: chatMessages, id } = await c.req.json();

    const conversationId = id;

    const isCreated = await getConversation(conversationId);

    if (!isCreated) {
      await createConversation(
        conversationId,
        chatMessages[0]?.content.substring(0, 50) || "new chat"
      );
    }

    const userMessage = chatMessages[chatMessages.length - 1];
    if (userMessage.role === "user") {
      await addMessage(conversationId, "user", userMessage.content);
    }

    const result = streamText({
      model: deepseek("deepseek-chat"),
      messages: chatMessages,
      async onFinish(res) {
        await addMessage(conversationId, "assistant", res.text);
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error(
      "an error occurred while processing the chat request:",
      error
    );
    return c.json(
      { error: "an error occurred while processing the request." },
      500
    );
  }
});

export const POST = handle(app);
