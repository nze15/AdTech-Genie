import { useState, useRef, useCallback } from 'react'
import {
  Code2, Play, Copy, Check, Loader2, Sparkles, RotateCcw,
  ChevronDown, FileCode, Wand2, Bug, BookOpen, RefreshCw
} from 'lucide-react'
import { cn } from '../lib/utils'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'React/JSX',
  'SQL', 'Bash', 'Go', 'Rust', 'Java', 'C#', 'PHP', 'Ruby', 'Swift',
]

const CODE_ACTIONS = [
  { id: 'explain', label: 'Explain Code', icon: BookOpen, prompt: 'Explain what this code does step by step:' },
  { id: 'debug', label: 'Find Bugs', icon: Bug, prompt: 'Find and fix bugs in this code, explaining each issue:' },
  { id: 'optimize', label: 'Optimize', icon: RefreshCw, prompt: 'Optimize this code for better performance and readability:' },
  { id: 'generate', label: 'Complete/Extend', icon: Wand2, prompt: 'Complete or extend this code following best practices:' },
]

const STARTER_SNIPPETS = [
  {
    label: 'Ad Pixel Tracker',
    lang: 'JavaScript',
    code: `// Facebook Pixel & Google Analytics 4 tracking
function trackAdConversion(eventName, params = {}) {
  // Facebook Pixel
  if (window.fbq) {
    fbq('track', eventName, params);
  }
  
  // Google Analytics 4
  if (window.gtag) {
    gtag('event', eventName, params);
  }
  
  console.log('Tracked:', eventName, params);
}

// Usage
trackAdConversion('Purchase', {
  currency: 'USD',
  value: 99.99,
  campaign: 'summer_sale_2026'
});`,
  },
  {
    label: 'Campaign API Fetch',
    lang: 'TypeScript',
    code: `interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  roas: number;
}

async function getCampaigns(accountId: string): Promise<Campaign[]> {
  const response = await fetch(\`/api/campaigns?account=\${accountId}\`, {
    headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` }
  });
  
  if (!response.ok) throw new Error('Failed to fetch campaigns');
  
  const data = await response.json();
  return data.campaigns;
}`,
  },
]

export default function CodePage() {
  const { user, isLoading } = useAuth()
  const [code, setCode] = useState(STARTER_SNIPPETS[0].code)
  const [language, setLanguage] = useState(STARTER_SNIPPETS[0].lang)
  const [customPrompt, setCustomPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedOutput, setCopiedOutput] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const runAction = useCallback(async (actionId: string, promptPrefix?: string) => {
    if (!user && !isLoading) {
      blink.auth.login()
      return
    }

    const action = CODE_ACTIONS.find(a => a.id === actionId)
    const prefix = promptPrefix ?? action?.prompt ?? 'Analyze this code:'
    const userPrompt = customPrompt.trim()

    const fullPrompt = code.trim()
      ? `${prefix}\n\n\`\`\`${language}\n${code}\n\`\`\`${userPrompt ? `\n\nAdditional instructions: ${userPrompt}` : ''}`
      : userPrompt || 'Generate a useful code example in ' + language

    setIsGenerating(true)
    setActiveAction(actionId)
    setOutput('')

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await blink.ai.streamText(
        {
          messages: [
            {
              role: 'system',
              content: `You are an expert software engineer and code reviewer. When analyzing or generating code:
- Always use proper markdown code blocks with language syntax
- Be concise but thorough
- Highlight important issues or improvements
- Follow ${language} best practices`
            },
            { role: 'user', content: fullPrompt }
          ],
          signal: controller.signal,
        },
        (chunk) => {
          setOutput(prev => prev + chunk)
        }
      )
    } catch (err: unknown) {
      const error = err as Error
      if (error?.name === 'AbortError') return
      const isAuthError = error?.message?.includes('401') || error?.message?.includes('Unauthorized')
      if (isAuthError) { blink.auth.login(); return }
      toast.error('AI request failed. Please try again.')
    } finally {
      setIsGenerating(false)
      setActiveAction(null)
      abortRef.current = null
    }
  }, [code, language, customPrompt, user, isLoading])

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
    setCopiedOutput(true)
    setTimeout(() => setCopiedOutput(false), 2000)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card/30 flex-wrap">
        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium text-secondary-foreground hover:bg-muted transition-all"
          >
            <FileCode className="w-4 h-4" />
            {language}
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>
          {showLangDropdown && (
            <div className="absolute top-full left-0 mt-1 z-50 w-44 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              <div className="max-h-60 overflow-y-auto py-1">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangDropdown(false) }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm transition-colors',
                      lang === language
                        ? 'bg-primary/15 text-primary'
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Snippet loaders */}
        <div className="flex gap-1">
          {STARTER_SNIPPETS.map(s => (
            <button
              key={s.label}
              onClick={() => { setCode(s.code); setLanguage(s.lang); setOutput('') }}
              className="px-2 py-1.5 text-xs rounded-lg bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-all border border-border"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => { setCode(''); setOutput('') }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            title="Clear"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={copyCode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            title="Copy code"
          >
            {copiedCode ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Code editor */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-3 py-2 border-b border-border bg-card/20 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Code2 className="w-3 h-3" /> Editor · {language}
            </span>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder={`// Write or paste your ${language} code here...\n// Or use a template above`}
              className="absolute inset-0 w-full h-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none p-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px lg:h-auto h-px bg-border flex-shrink-0" />

        {/* Output panel */}
        <div className="flex-1 flex flex-col min-h-0 lg:min-h-0" style={{ minHeight: '200px' }}>
          <div className="px-3 py-2 border-b border-border bg-card/20 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" /> AI Output
            </span>
            {output && (
              <button
                onClick={copyOutput}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              >
                {copiedOutput ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {output ? (
              <pre className="font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                {output}
                {isGenerating && <span className="animate-blink text-primary">▋</span>}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">AI output will appear here</p>
                <p className="text-xs text-muted-foreground/60">Use the actions below to analyze or generate code</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="border-t border-border bg-card/30 p-3 mb-16 lg:mb-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {CODE_ACTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => runAction(id)}
              disabled={isGenerating}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
                activeAction === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary border border-border'
              )}
            >
              {activeAction === id && isGenerating
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Icon className="w-4 h-4" />
              }
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Custom instruction (optional)..."
            onKeyDown={(e) => e.key === 'Enter' && runAction('generate')}
            className="flex-1 bg-card border border-border rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => runAction('generate', customPrompt || 'Process this:')}
            disabled={isGenerating || (!code.trim() && !customPrompt.trim())}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run
          </button>
        </div>
      </div>
    </div>
  )
}
