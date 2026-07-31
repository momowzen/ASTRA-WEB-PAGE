import type { UserRole } from '../types/index.ts'

export const isAdmin = (role?: UserRole): boolean => role === 'admin'

export const canEditMember = (
  currentUserId: string,
  currentUserRole: UserRole | undefined,
  targetUserId: string,
): boolean => {
  if (currentUserRole === 'admin') return true
  return currentUserId === targetUserId
}

export const getInitials = (name: string): string => {
  return name
    .split(/[\s_]+/)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
