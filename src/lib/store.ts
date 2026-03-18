import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  timestamp: Date;
}

export interface CodePreview {
  html: string;
  css: string;
  javascript?: string;
  title?: string;
}

interface ChatStore {
  // Messages
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;

  // Code preview
  currentPreview: CodePreview | null;
  setPreview: (preview: CodePreview | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Conversation metadata
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // Messages
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: nanoid(),
          timestamp: new Date(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),

  // Code preview
  currentPreview: null,
  setPreview: (preview) => set({ currentPreview: preview }),
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),

  // UI state
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),

  // Conversation
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));

// Hooks for easier access
export function useChatMessages() {
  return useChatStore((state) => state.messages);
}

export function useAddMessage() {
  return useChatStore((state) => state.addMessage);
}

export function usePreview() {
  return useChatStore((state) => ({
    preview: state.currentPreview,
    setPreview: state.setPreview,
  }));
}

export function useUIState() {
  return useChatStore((state) => ({
    isLoading: state.isLoading,
    setLoading: state.setLoading,
    error: state.error,
    setError: state.setError,
  }));
}
