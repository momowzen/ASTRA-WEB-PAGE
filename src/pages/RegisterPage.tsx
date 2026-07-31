import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User as UserIcon, MessageCircle, Sparkles, AlertCircle } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { Input } from '../components/ui/Input.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'
import { registerUser } from '../services/authService.ts'
import { createMemberProfile } from '../services/userService.ts'
import { useAuth } from '../hooks/useAuth.ts'

export const RegisterPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    ign: '',
    discordName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/profile" replace />

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const user = await registerUser(formData.email, formData.password, formData.ign)
      try {
        await createMemberProfile(user.uid, {
          ign: formData.ign,
          discordName: formData.discordName,
          email: formData.email,
        })
      } catch (profileError) {
        await user.delete()
        throw new Error('Account created but profile setup failed. Please try again.')
      }
      navigate('/profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100svh-80px)] py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <GlassCard glow className="gradient-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-astra-secondary to-astra-primary flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-astra-text font-display mb-2">Join ASTRA</h1>
              <p className="text-astra-muted text-sm">Begin your journey among the stars</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="In-Game Name"
                  name="ign"
                  value={formData.ign}
                  onChange={handleChange}
                  placeholder="Your IGN"
                  icon={<UserIcon className="w-5 h-5" />}
                  required
                />
                <Input
                  label="Discord Name"
                  name="discordName"
                  value={formData.discordName}
                  onChange={handleChange}
                  placeholder="@username"
                  icon={<MessageCircle className="w-5 h-5" />}
                  required
                />
              </div>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="guild@astra.com"
                icon={<Mail className="w-5 h-5" />}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                required
              />
              <GlowButton type="submit" loading={loading} className="w-full" size="lg">
                Register
              </GlowButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-astra-muted">
                Already a member?{' '}
                <Link to="/login" className="text-astra-primary hover:text-astra-text transition-colors font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
