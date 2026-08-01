import { createContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase/config.ts'
import { getMemberProfile } from '../services/userService.ts'
import type { MemberProfile } from '../types/index.ts'

interface AuthContextValue {
  user: User | null
  profile: MemberProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
  isApplicant: boolean
  authError: string | null
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadProfile = useCallback(async (currentUser: User | null, isRetry = false) => {
    if (!currentUser) {
      setProfile(null)
      setAuthError(null)
      return
    }
    try {
      const memberProfile = await getMemberProfile(currentUser.uid)
      if (memberProfile) {
        setProfile(memberProfile)
        setAuthError(null)
      } else if (!isRetry) {
        retryTimerRef.current = setTimeout(() => {
          loadProfile(currentUser, true)
        }, 1500)
      } else {
        setAuthError('Could not load your profile. Please try refreshing the page.')
      }
    } catch {
      if (!isRetry) {
        retryTimerRef.current = setTimeout(() => {
          loadProfile(currentUser, true)
        }, 1500)
      } else {
        setAuthError('Could not load your profile. Please try refreshing the page.')
        setProfile(null)
      }
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user) {
      setAuthError(null)
      await loadProfile(user, true)
    }
  }, [user, loadProfile])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current)
        retryTimerRef.current = null
      }
      setUser(currentUser)
      await loadProfile(currentUser)
      setIsLoading(false)
    })
    return () => {
      unsubscribe()
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current)
      }
    }
  }, [loadProfile])

  const value: AuthContextValue = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isMember: profile?.role === 'member' || profile?.role === 'admin',
    isApplicant: profile?.role === 'applicant',
    authError,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
