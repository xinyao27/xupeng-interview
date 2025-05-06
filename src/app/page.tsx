import Chat from "@/components/chat/chat";
import NavLinks from "@/components/nav/nav-links";
import { getAllConversations } from "@/lib/db/utils";

export default async function Home() {
  const conversations = await getAllConversations();
  return (
    <div className="flex flex-col h-full">
      <header className="p-8 text-center">
        <h1 className="text-3xl font-bold">Simple Chat</h1>
        <p className="text-muted-foreground">
          A Simple Chat Application Based on Next.js and AI SDK
        </p>
      </header>
      <div className=" flex flex-row grow p-1">
        <div className="min-w-[240px] mr-0 mx-4 flex-none">
          <NavLinks conversations={conversations} />
        </div>
        <div className="flex-grow mx-4 overflow-y-auto p-1 ">
          <Chat />
        </div>
      </div>

      <footer className="p-8 text-center text-sm text-muted-foreground">
        <p>
          Built with TypeScript, Next.js, Hono, DrizzleORM, and the Vercel AI
          SDK
        </p>
      </footer>
    </div>
  );
}
