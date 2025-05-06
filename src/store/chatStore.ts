import { Conversation, Message } from "@/lib/db/schema";
import { create } from "zustand";

interface ChatStore {
  currentConversationId: string;
  conversationList: Conversation[];
  messages: Message[];
  newChat: () => void;
  updateNewChat: (id: string, title: string) => void;
  setConversationList: (conversationList: Conversation[]) => void;
  setCurrentConversationId: (id: string) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  currentConversationId: "new chat",
  root: {
    id: -1,
    compName: "Wrap",
    styleProps: { width: "100%", height: "100%" },
    compProps: { fontSize: "32px", color: "red" },
    parentId: null,
    children: [],
    hasSlot: true,
  },
  conversationList: [],
  messages: [],

  setConversationList: (newList: Conversation[]) => {
    set(() => ({
      conversationList: [...newList],
    }));
  },

  setCurrentConversationId: (id: string) => {
    set(() => ({
      currentConversationId: id,
    }));
  },
  newChat: () => {
    const { conversationList } = get();

    set(() => ({
      componentTree: [
        { id: "new chat", title: "new chat" },
        ...conversationList,
      ],
      currentConversationId: "new chat",
    }));
  },

  updateNewChat: (id: string, title: string) => {
    const { conversationList } = get();
    if (id === "new chat") return;
    const newChatIndex = conversationList.findIndex(
      (conversation: Conversation) => conversation.id === "new chat"
    );
    if (newChatIndex === -1) return;
    const newList = [...conversationList];
    newList.splice(newChatIndex, 1, {
      id,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    set(() => ({
      conversationList: newList,
      currentConversationId: id,
    }));
  },
}));

export default useChatStore;
