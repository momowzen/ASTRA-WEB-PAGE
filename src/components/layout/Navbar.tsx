import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, User, LogIn, LogOut, UserPlus, Shield, Home, Users, Info, ShieldCheck, SparklesIcon } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.ts'
import { useScrollHeader } from '../../hooks/useScrollHeader.ts'
import { signOut } from '../../services/authService.ts'
import type { UserRole } from '../../types/index.ts'

const roleLabel = (role?: UserRole): string => {
  if (role === 'admin') return 'Guild Master'
  if (role === 'applicant') return 'Applicant'
  return 'Member'
}

export const Navbar = () => {
  const { profile, isAuthenticated, isAdmin, isLoading } = useAuth()
  const scrolled = useScrollHeader(50)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    ...(isAuthenticated ? [{ path: '/members', label: 'Members', icon: Users }] : []),
    { path: '/boss-tracker', label: 'Boss Tracker', icon: ShieldCheck },
    { path: '/hidden-class', label: 'Hidden Class', icon: SparklesIcon },
    { path: '/about', label: 'About', icon: Info },
    ...(isAuthenticated ? [{ path: '/profile', label: 'Profile', icon: User }] : []),
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: Shield }] : []),
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled ? 'glass-strong py-3 shadow-lg' : 'bg-transparent py-5',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-astra-primary to-astra-secondary flex items-center justify-center shadow-[0_0_20px_rgba(76,201,240,0.3)]"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-astra-text font-display tracking-wider group-hover:text-glow transition-all">
              ASTRA
            </h1>
            <p className="text-[10px] text-astra-muted uppercase tracking-[0.2em]">Guild Portal</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={[
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2',
                  active
                    ? 'text-astra-primary bg-astra-primary/10'
                    : 'text-astra-muted hover:text-astra-text hover:bg-astra-primary/5',
                ].join(' ')}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg border border-astra-primary/30 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center gap-3 group">
                    <div className="text-right">
                      <p className="text-sm font-medium text-astra-text group-hover:text-astra-primary transition-colors">
                        {profile?.ign || 'Member'}
                      </p>
                      <p className="text-xs text-astra-muted">{roleLabel(profile?.role)}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-astra-primary/20 to-astra-secondary/20 border border-astra-primary/30 flex items-center justify-center text-astra-primary font-semibold text-sm">
                      {profile?.ign ? profile.ign.charAt(0).toUpperCase() : '?'}
                    </div>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm text-astra-muted hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm text-astra-muted hover:text-astra-primary transition-colors flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-astra-primary to-astra-secondary text-white shadow-[0_0_20px_rgba(76,201,240,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-astra-text hover:bg-astra-primary/10 transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-astra-primary/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-astra-primary/10 text-astra-primary'
                        : 'text-astra-muted hover:bg-astra-primary/5 hover:text-astra-text',
                    ].join(' ')}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-astra-primary/10 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false) }}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-astra-muted hover:bg-astra-primary/5 transition-colors"
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-astra-primary to-astra-secondary text-white"
                    >
                      <UserPlus className="w-4 h-4" /> Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
