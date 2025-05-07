"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import useChatStore from "@/store/chatStore";
import { Message } from "ai";

function Chat({
  message,
  currentConversationId,
}: {
  message: Message[];
  currentConversationId: string | undefined;
}) {
  const { updateNewChat } = useChatStore();
  const { messages, input, handleInputChange, handleSubmit, status, stop, id } =
    useChat({
      api: "/agent/chat",
      id:
        currentConversationId === "new chat"
          ? undefined
          : currentConversationId,
      initialMessages: message,
      onFinish: () => {
        scrollToBottom();
        if (currentConversationId === "new chat") {
          updateNewChat(id, input.substring(0, 50));
        }
      },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <Card className="flex-1 p-4 mb-4 overflow-hidden">
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4 pb-4">
            {messages.map((message: Message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.role === "user" ? "👨🏻" : "🤖"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="enter your message…"
          className="flex-1 min-h-[80px] resize-none"
          disabled={status === "streaming"}
        />
        <div className="flex flex-col justify-end">
          {status === "streaming" ? (
            <Button
              type="button"
              variant="destructive"
              onClick={stop}
              className=" h-full"
            >
              stop
            </Button>
          ) : (
            <Button type="submit" disabled={!input.trim()} className=" h-full">
              send
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ChatComp({}) {
  const { currentConversationId } = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (currentConversationId === "new chat") {
      setMessages([]);
    } else if (currentConversationId) {
      fetch(`/agent/messages/${currentConversationId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("-----", data);
          setMessages(data.messages);
        })
        .catch((error) => console.error("Failed to load messages:", error));
    }
  }, [currentConversationId, setMessages]);
  return (
    <Chat message={messages} currentConversationId={currentConversationId} />
  );
}
