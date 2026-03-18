import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'
import { useAuth } from '../../hooks/useAuth'

export default function AppShell() {
  const { user, isLoading } = useAuth()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header user={user} isLoading={isLoading} />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
