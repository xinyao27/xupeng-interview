import { Hono } from "hono";
import { handle } from "hono/vercel";
import { streamText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import {
  createConversation,
  addMessage,
  getConversation,
  getConversationMessages,
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
      const chatTitle = chatMessages[0]?.content.substring(0, 50) || "new chat";

      await createConversation(conversationId, chatTitle);
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

app.get("/messages/:conversationId", async (c) => {
  try {
    const { conversationId } = c.req.param();
    const messages = await getConversationMessages(conversationId);
    return c.json({ messages });
  } catch (error) {
    console.error("an error occurred while fetching messages:", error);
    return c.json({ error: "an error occurred while fetching messages." }, 500);
  }
});

export const POST = handle(app);
export const GET = handle(app);
