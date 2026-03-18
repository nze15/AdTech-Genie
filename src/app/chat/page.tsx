'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { generateCode } from '@/lib/groq';
import { useChatStore, usePreview, useUIState } from '@/lib/store';
import { Button } from '@/components/button';
import { nanoid } from 'nanoid';
import ChatMessages from './components/chat-messages';
import CodePreview from './components/code-preview';

const suggestedPrompts = [
  'Build a responsive navbar',
  'Create a hero section',
  'Make a card component',
  'Design a footer',
  'Build a contact form',
  'Create a pricing table',
];

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const { preview, setPreview } = usePreview();
  const { isLoading, setLoading, error, setError } = useUIState();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    try {
      setError(null);
      
      // Add user message
      const userMessageId = nanoid();
      addMessage({
        id: userMessageId,
        role: 'user',
        content: input,
        timestamp: new Date(),
      });

      setInput('');
      setLoading(true);

      // Generate code with Groq
      const result = await generateCode(input);

      // Add assistant message with generated code
      addMessage({
        id: nanoid(),
        role: 'assistant',
        content: result.description,
        code: {
          html: result.html,
          css: result.css,
          javascript: result.javascript,
        },
        timestamp: new Date(),
      });

      // Set preview
      if (result.html) {
        setPreview({
          html: result.html,
          css: result.css,
          javascript: result.javascript,
          title: input,
        });
        setShowPreview(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate code';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [input, isLoading, addMessage, setLoading, setError, setPreview]);

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden lg:flex-row">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col w-full lg:max-w-md border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-primary-dark text-white">
          <h1 className="font-bold text-lg">AdTech Genie</h1>
          <p className="text-sm opacity-90">AI Code Generator</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="font-semibold text-foreground mb-2">Welcome to AdTech Genie</h2>
              <p className="text-sm text-muted mb-6">
                Describe what you want to build, and I'll generate the code for you
              </p>
              <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="text-left px-3 py-2 rounded-lg border border-border hover:bg-gray-50 text-sm transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ChatMessages messages={messages} />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Describe what to build..."
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="px-4"
            >
              {isLoading ? '⏳' : '→'}
            </Button>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden lg:flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            {showPreview ? '✓ Preview On' : '○ Preview Off'}
          </button>
        </div>
      </div>

      {/* Preview Panel (Desktop) */}
      {showPreview && preview && (
        <div className="hidden lg:flex flex-1 flex-col bg-gray-50 border-l border-border">
          <CodePreview preview={preview} />
        </div>
      )}

      {/* Mobile Preview Modal */}
      {showPreview && preview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="p-4 bg-white border-b border-border flex justify-between items-center">
              <h3 className="font-semibold">{preview.title || 'Preview'}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <CodePreview preview={preview} />
          </div>
        </div>
      )}
    </div>
  );
}
