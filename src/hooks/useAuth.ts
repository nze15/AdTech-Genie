import { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import type { BlinkUser } from '@blinkdotnew/sdk'

interface AuthState {
  user: BlinkUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
      })
    })
    return unsubscribe
  }, [])

  return authState
}
