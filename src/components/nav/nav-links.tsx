"use client";
import { MessageSquarePlus } from "lucide-react";
import { Conversation } from "@/lib/db/schema";
import clsx from "clsx";
import { Button } from "../ui/button";
import useChatStore from "@/store/chatStore";
import { useEffect } from "react";

export default function NavLinks({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const {
    conversationList,
    currentConversationId,
    setCurrentConversationId,
    setConversationList,
    newChat,
  } = useChatStore();

  const handleConversationSelect = (id: string) => {
    setCurrentConversationId(id);
  };
  useEffect(() => {
    if (currentConversationId === "new chat") {
      setConversationList([
        {
          id: "new chat",
          title: "new chat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...conversations,
      ]);
    }
  }, [conversations, currentConversationId, setConversationList]);

  const handleNewChat = async () => {
    newChat();
  };
  return (
    <div className="flex flex-col h-full w-full ">
      <div className=" w-full flex-grow">
        {conversationList.slice(0, 5).map((c: Conversation) => {
          return (
            <Button
              key={c.id}
              onClick={() => handleConversationSelect(c.id)}
              className={clsx(
                " cursor-pointer text-gray-400 flex h-[48px] w-full items-center justify-center mb-8 hover:bg-sky-100 rounded-md bg-transparent p-3 text-sm font-medium hover:text-gray-500 ",
                {
                  "bg-sky-100 text-blue-600": c.id === currentConversationId,
                }
              )}
            >
              <p className="hidden md:block">{c.title}</p>
            </Button>
          );
        })}
      </div>
      <Button
        onClick={handleNewChat}
        className="cursor-pointer text-gray-100 flex h-[48px] w-full items-center justify-center bg-[#4ade80] rounded-md p-3 text-sm font-medium hover:text-gray-500"
      >
        <MessageSquarePlus /> New Chat
      </Button>
    </div>
  );
}
