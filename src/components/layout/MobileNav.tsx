import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, ImagePlay, Code2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/image', icon: ImagePlay, label: 'Image' },
  { to: '/code', icon: Code2, label: 'Code' },
]

export default function MobileNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-150 min-w-0 flex-1',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                isActive ? 'bg-primary/15 border border-primary/20' : 'hover:bg-muted'
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium truncate">{label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
