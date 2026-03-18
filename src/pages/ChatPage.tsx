import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Bot, User, RotateCcw, Copy, Check, Sparkles, StopCircle } from 'lucide-react'
import { cn } from '../lib/utils'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

const SYSTEM_PROMPT = `You are AdTech Genie, a powerful AI assistant specialized in advertising technology, marketing, digital campaigns, creative strategy, data analytics, and general AI assistance.

Help users with:
- Ad campaign strategy and copywriting
- Image and creative direction advice
- Code for ad tech integrations, tracking, analytics
- Marketing automation and data analysis
- General questions and brainstorming

Be concise, actionable, and creative. Format responses clearly with markdown when helpful.`

const suggestedPrompts = [
  'Write a compelling Facebook ad for a SaaS product',
  'Explain retargeting pixel implementation in JavaScript',
  'Create a 7-day email campaign strategy',
  'What are the best ad formats for mobile in 2026?',
]

export default function ChatPage() {
  const { user, isLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [input])

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || isGenerating) return

    if (!user && !isLoading) {
      blink.auth.login()
      return
    }

    setInput('')

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    setIsGenerating(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      await blink.ai.streamText(
        {
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
            { role: 'user', content },
          ],
          signal: controller.signal,
        },
        (chunk) => {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk, isStreaming: true }
                : m
            )
          )
        }
      )
    } catch (err: unknown) {
      const error = err as Error
      if (error?.name === 'AbortError') return
      const isAuthError =
        error?.message?.includes('401') ||
        error?.message?.includes('Unauthorized') ||
        error?.message?.toLowerCase().includes('auth')
      if (isAuthError) {
        blink.auth.login()
        return
      }
      toast.error('Failed to generate response. Please try again.')
      setMessages(prev => prev.filter(m => m.id !== assistantId))
    } finally {
      setIsGenerating(false)
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m)
      )
      abortRef.current = null
    }
  }, [input, isGenerating, messages, user, isLoading])

  const stopGeneration = () => {
    abortRef.current?.abort()
    setIsGenerating(false)
    setMessages(prev => prev.map(m => m.isStreaming ? { ...m, isStreaming: false } : m))
  }

  const copyMessage = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => {
    if (isGenerating) stopGeneration()
    setMessages([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
          <span className="text-xs text-muted-foreground font-medium">
            {messages.length > 0 ? `${Math.ceil(messages.length / 2)} message${Math.ceil(messages.length / 2) !== 1 ? 's' : ''}` : 'New conversation'}
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">AdTech Genie AI</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Your AI assistant for ad campaigns, marketing strategy, code, and creative ideas.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left text-sm text-muted-foreground bg-card hover:bg-muted border border-border hover:border-primary/30 rounded-xl px-4 py-3 transition-all hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3 group animate-fade-in',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {/* Avatar */}
              <div className={cn(
                'w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5',
                msg.role === 'assistant'
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'bg-secondary text-primary'
              )}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={cn(
                'max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-card border border-border text-foreground rounded-tl-sm'
              )}>
                {msg.content ? (
                  <div className={cn('whitespace-pre-wrap', msg.isStreaming && 'typing-cursor')}>
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                  </div>
                )}

                {/* Copy button for assistant */}
                {msg.role === 'assistant' && !msg.isStreaming && msg.content && (
                  <button
                    onClick={() => copyMessage(msg.id, msg.content)}
                    className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copiedId === msg.id ? (
                      <><Check className="w-3 h-3 text-primary" />Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" />Copy</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-border bg-card/30 mb-16 lg:mb-0">
        <div className="relative flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 focus-within:border-primary/50 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={user ? 'Message AI...' : 'Sign in to start chatting...'}
            disabled={isGenerating || (!user && !isLoading)}
            rows={1}
            className="flex-1 bg-transparent outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground max-h-40 disabled:opacity-50"
          />
          {isGenerating ? (
            <button
              onClick={stopGeneration}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-destructive/20 hover:bg-destructive/30 flex items-center justify-center text-destructive transition-all"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || (!user && !isLoading)}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
