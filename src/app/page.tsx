"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm AdTech Genie, your AI marketing assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const responses = [
      "I've analyzed your request and prepared a comprehensive solution. Here's what I found...",
      "Processing your query through my neural networks. Let me generate the optimal response for you.",
      "I've accessed my knowledge base and compiled the most relevant information for your needs.",
      "Drawing from my AI capabilities, I can help you with that. Here's my analysis...",
      "Your request has been processed. I've prepared a detailed response based on current best practices.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-300 rounded-full mix-blend-screen filter blur-3xl opacity-50" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-64 h-64 border-2 border-green-400/30 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute inset-4 w-56 h-56 border border-emerald-400/20 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <div className="absolute inset-8 w-48 h-48 border border-lime-400/20 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute inset-12 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto h-screen flex flex-col p-4">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AdTech Genie</h1>
              <p className="text-xs text-green-300">Your AI Marketing Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-300">Online</span>
          </div>
        </header>

        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-green-500/20 shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-white/20 text-green-50 border border-green-500/20"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === "user" ? "text-green-100" : "text-green-300"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/20 rounded-2xl px-4 py-3 border border-green-500/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-green-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-green-500/30 disabled:shadow-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
