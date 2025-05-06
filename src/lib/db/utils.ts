// import { drizzle } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/libsql";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import {
  conversations,
  messages,
  type Message,
  type Conversation,
} from "./schema";

const db = drizzle(process.env.DATABASE_URL ?? "file:./sqlite.db");

export async function createConversation(
  id: string,
  title: string
): Promise<Conversation> {
  const now = new Date();

  await db.insert(conversations).values({
    id,
    title,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id,
    title,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getAllConversations(): Promise<Conversation[]> {
  return db.select().from(conversations).orderBy(conversations.updatedAt).all();
}

export async function getConversation(
  id: string
): Promise<Conversation | undefined> {
  return db.select().from(conversations).where(eq(conversations.id, id)).get();
}

export async function updateConversationTitle(
  id: string,
  title: string
): Promise<void> {
  await db
    .update(conversations)
    .set({ title, updatedAt: new Date() })
    .where(eq(conversations.id, id));
}

export async function deleteConversation(id: string): Promise<void> {
  await db.delete(messages).where(eq(messages.conversationId, id));
  await db.delete(conversations).where(eq(conversations.id, id));
}

export async function addMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message> {
  const id = nanoid();
  const now = new Date();

  await db.insert(messages).values({
    id,
    conversationId,
    role,
    content,
    createdAt: now,
  });

  await db
    .update(conversations)
    .set({ updatedAt: now })
    .where(eq(conversations.id, conversationId));

  return {
    id,
    conversationId,
    role,
    content,
    createdAt: now,
  };
}

export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt)
    .all();
}
