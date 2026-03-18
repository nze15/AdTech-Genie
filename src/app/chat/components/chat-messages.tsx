import { ChatMessage } from '@/lib/store';
import { Button } from '@/components/button';
import { useState } from 'react';

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-lg p-3 ${
              message.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-foreground'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

            {/* Code Display */}
            {message.code?.html && (
              <div className="mt-3 space-y-2">
                {message.code.html && (
                  <div className="bg-white/10 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-mono text-muted">HTML</span>
                      <button
                        onClick={() => copyCode(message.code?.html || '', `html-${message.id}`)}
                        className="text-xs px-2 py-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {copiedId === `html-${message.id}` ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-xs overflow-x-auto max-h-24 bg-gray-900/50 p-2 rounded text-gray-300">
                      <code>{message.code.html.substring(0, 150)}...</code>
                    </pre>
                  </div>
                )}

                {message.code.css && (
                  <div className="bg-white/10 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-mono text-muted">CSS</span>
                      <button
                        onClick={() => copyCode(message.code?.css || '', `css-${message.id}`)}
                        className="text-xs px-2 py-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {copiedId === `css-${message.id}` ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-xs overflow-x-auto max-h-24 bg-gray-900/50 p-2 rounded text-gray-300">
                      <code>{message.code.css.substring(0, 150)}...</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs mt-2 opacity-75">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
