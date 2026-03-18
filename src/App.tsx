import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import ChatPage from './pages/ChatPage'
import ImagePage from './pages/ImagePage'
import CodePage from './pages/CodePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/code" element={<CodePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(240 28% 12%)',
            color: 'hsl(240 20% 92%)',
            border: '1px solid hsl(240 20% 20%)',
            fontSize: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
          },
          success: {
            iconTheme: {
              primary: 'hsl(263 74% 57%)',
              secondary: 'white',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}
