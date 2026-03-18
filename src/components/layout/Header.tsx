import { useLocation } from 'react-router-dom'
import { Zap, User, LogOut, Sparkles } from 'lucide-react'
import { blink } from '../../blink/client'
import type { BlinkUser } from '@blinkdotnew/sdk'

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': { title: 'Dashboard', description: 'Overview of your AI tools' },
  '/chat': { title: 'AI Chat', description: 'Streaming conversation with AI' },
  '/image': { title: 'Image AI', description: 'Edit and generate images with AI' },
  '/code': { title: 'Code AI', description: 'Write, edit, and explain code with AI' },
}

interface HeaderProps {
  user: BlinkUser | null
  isLoading: boolean
}

export default function Header({ user, isLoading }: HeaderProps) {
  const location = useLocation()
  const page = pageTitles[location.pathname] ?? pageTitles['/']

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-card/50 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm">AdTech Genie</span>
        </div>
        {/* Desktop title */}
        <div className="hidden lg:block">
          <h1 className="text-base font-semibold text-foreground">{page.title}</h1>
          <p className="text-xs text-muted-foreground">{page.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* AI Status indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
          <Sparkles className="w-3 h-3" />
          AI Ready
        </div>

        {/* User button */}
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white cursor-default select-none">
              {user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <button
              onClick={() => blink.auth.signOut()}
              className="hidden sm:flex w-7 h-7 rounded-md items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => blink.auth.login()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all active:scale-95"
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  )
}
