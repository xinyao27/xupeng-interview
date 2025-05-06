import { Hono } from "hono";
import { handle } from "hono/vercel";
import { streamText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

const app = new Hono().basePath("/agent");

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

app.post("/chat", async (c) => {
  try {
    const { messages: chatMessages } = await c.req.json();
    const result = streamText({
      model: deepseek("deepseek-chat"),
      messages: chatMessages,
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
