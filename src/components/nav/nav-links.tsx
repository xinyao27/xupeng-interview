"use client";

import { Conversation } from "@/lib/db/schema";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../ui/button";

export default function NavLinks({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");

  const handleConversationSelect = (id: string) => {
    setCurrentConversationId(id);
  };
  return (
    <div className=" w-full h-full">
      {conversations.map((c: Conversation) => {
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
  );
}
