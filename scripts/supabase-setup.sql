-- Create tables for AdTech Genie

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  code JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Generated components table
CREATE TABLE generated_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  html TEXT NOT NULL,
  css TEXT NOT NULL,
  javascript TEXT,
  preview_url TEXT,
  deployed_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX conversations_user_id_idx ON conversations(user_id);
CREATE INDEX conversations_updated_at_idx ON conversations(updated_at DESC);
CREATE INDEX messages_conversation_id_idx ON messages(conversation_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX components_conversation_id_idx ON generated_components(conversation_id);
CREATE INDEX components_created_at_idx ON generated_components(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_components ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (update user_id with your auth setup)
-- For now, these are permissive policies - update based on your auth system

-- Conversations policy
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON conversations FOR DELETE
  USING (auth.uid() = user_id);

-- Messages policy (users can access messages in their conversations)
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

-- Generated components policy
CREATE POLICY "Users can view components in their conversations"
  ON generated_components FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert components in their conversations"
  ON generated_components FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update components in their conversations"
  ON generated_components FOR UPDATE
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid()
    )
  );

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE generated_components;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.conversations TO authenticated;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.generated_components TO authenticated;
