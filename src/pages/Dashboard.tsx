import { MessageSquare, ImagePlay, Code2, Zap, ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

const tools = [
  {
    to: '/chat',
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Stream conversations with powerful AI. Ask anything, get detailed answers, brainstorm ideas.',
    gradient: 'from-violet-600 to-purple-800',
    glowColor: 'hover:shadow-[0_0_30px_hsl(263_74%_57%_/_0.3)]',
    badge: 'Streaming',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  {
    to: '/image',
    icon: ImagePlay,
    title: 'Image AI',
    description: 'Upload images and edit them with AI prompts. Transform, enhance, or create entirely new visuals.',
    gradient: 'from-cyan-600 to-teal-800',
    glowColor: 'hover:shadow-[0_0_30px_hsl(192_91%_43%_/_0.3)]',
    badge: 'Vision',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    to: '/code',
    icon: Code2,
    title: 'Code AI',
    description: 'Write, review, debug, and explain code with AI. Supports all major programming languages.',
    gradient: 'from-emerald-600 to-green-800',
    glowColor: 'hover:shadow-[0_0_30px_hsl(142_70%_45%_/_0.3)]',
    badge: 'Multi-lang',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
]

const stats = [
  { label: 'AI Models', value: '3', icon: Sparkles, change: 'Available now' },
  { label: 'Response Time', value: '<1s', icon: TrendingUp, change: 'Streaming' },
  { label: 'Uptime', value: '99.9%', icon: Clock, change: 'Always on' },
]

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  return (
    <div className="h-full overflow-y-auto pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8">

        {/* Hero welcome */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20 p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(263_74%_57%_/_0.15),_transparent_60%)]" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-primary">AdTech Genie</span>
            </div>
            {isLoading ? (
              <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2" />
            ) : (
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {user ? `Welcome back, ${user.displayName ?? user.email?.split('@')[0] ?? 'Genie'}` : 'Welcome to AdTech Genie'}
              </h2>
            )}
            <p className="text-muted-foreground text-sm lg:text-base max-w-lg">
              Your AI-powered workspace for chat, image editing, and code generation. Pick a tool to get started.
            </p>
            {!user && !isLoading && (
              <button
                onClick={() => blink.auth.login()}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-all active:scale-95 w-fit"
              >
                <Sparkles className="w-4 h-4" />
                Get Started — Sign In Free
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {stats.map(({ label, value, icon: Icon, change }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-primary/70 mt-1">{change}</div>
            </div>
          ))}
        </div>

        {/* Tools grid */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">AI Tools</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map(({ to, icon: Icon, title, description, gradient, glowColor, badge, badgeColor }) => (
              <Link
                key={to}
                to={to}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-5 transition-all duration-200 hover:border-primary/30 ${glowColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-1.5">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Open tool
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick tips */}
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Quick Tips
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { tip: 'Ask the AI to explain complex topics step by step for clearer answers.', tool: 'Chat' },
              { tip: 'Upload a photo and describe the changes you want — AI handles the rest.', tool: 'Image AI' },
              { tip: 'Paste your code and ask "explain this" or "find bugs" for instant review.', tool: 'Code AI' },
            ].map(({ tip, tool }) => (
              <div key={tool} className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3">
                <span className="text-xs font-semibold text-primary block mb-1">{tool}</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
