import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not configured. Real-time data will not be available."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Database types
export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  code?: {
    html?: string;
    css?: string;
    javascript?: string;
  };
  created_at: string;
}

export interface GeneratedComponent {
  id: string;
  conversation_id: string;
  title: string;
  html: string;
  css: string;
  javascript?: string;
  preview_url?: string;
  deployed_url?: string;
  created_at: string;
  updated_at: string;
}

// Conversation operations
export async function createConversation(
  userId: string,
  title: string
): Promise<Conversation> {
  const { data, error } = await supabase
    .from("conversations")
    .insert([
      {
        user_id: userId,
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getConversations(
  userId: string
): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateConversation(
  conversationId: string,
  updates: Partial<Conversation>
): Promise<Conversation> {
  const { data, error } = await supabase
    .from("conversations")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", conversationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Message operations
export async function addMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  code?: { html?: string; css?: string; javascript?: string }
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        conversation_id: conversationId,
        role,
        content,
        code,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(
  conversationId: string
): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

// Component operations
export async function saveComponent(
  conversationId: string,
  title: string,
  html: string,
  css: string,
  javascript?: string
): Promise<GeneratedComponent> {
  const { data, error } = await supabase
    .from("generated_components")
    .insert([
      {
        conversation_id: conversationId,
        title,
        html,
        css,
        javascript,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getComponents(
  conversationId: string
): Promise<GeneratedComponent[]> {
  const { data, error } = await supabase
    .from("generated_components")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateComponentUrl(
  componentId: string,
  previewUrl?: string,
  deployedUrl?: string
): Promise<GeneratedComponent> {
  const { data, error } = await supabase
    .from("generated_components")
    .update({
      preview_url: previewUrl,
      deployed_url: deployedUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", componentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Subscribe to real-time message updates
export function subscribeToMessages(
  conversationId: string,
  callback: (message: Message) => void
) {
  const subscription = supabase
    .from(`messages:conversation_id=eq.${conversationId}`)
    .on("*", (payload) => {
      if (payload.new) {
        callback(payload.new);
      }
    })
    .subscribe();

  return () => {
    supabase.removeSubscription(subscription);
  };
}
