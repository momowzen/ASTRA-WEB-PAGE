import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User as UserIcon, MessageCircle, Sparkles, AlertCircle, Sword, Server, Gauge, BarChart3, ChevronDown } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { Input } from '../components/ui/Input.tsx'
import { CountrySelect } from '../components/ui/CountrySelect.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'
import { registerUser } from '../services/authService.ts'
import { createApplicantProfile } from '../services/userService.ts'
import { useAuth } from '../hooks/useAuth.ts'
import { MAIN_WEAPON_OPTIONS } from '../types/index.ts'

export const RegisterPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    ign: '',
    discordName: '',
    email: '',
    password: '',
    confirmPassword: '',
    level: '',
    combatPower: '',
    nationality: '',
    server: '',
    mainWeapon: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/profile" replace />

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    const level = parseInt(formData.level)
    const combatPower = parseInt(formData.combatPower)
    if (!level || level < 1) {
      setError('Please enter a valid level')
      return
    }
    if (!combatPower || combatPower < 1) {
      setError('Please enter a valid combat power')
      return
    }
    if (!formData.mainWeapon) {
      setError('Please select your main weapon mastery')
      return
    }
    if (!formData.nationality.trim()) {
      setError('Please enter your nationality')
      return
    }
    if (!formData.server.trim()) {
      setError('Please enter your current server')
      return
    }

    setLoading(true)
    try {
      const user = await registerUser(formData.email, formData.password, formData.ign)
      try {
        await createApplicantProfile(user.uid, {
          ign: formData.ign,
          discordName: formData.discordName,
          email: formData.email,
          level,
          combatPower,
          nationality: formData.nationality.trim(),
          server: formData.server.trim(),
          mainWeapon: formData.mainWeapon,
        })
      } catch (profileError) {
        console.error('Application profile setup failed:', profileError)
        await user.delete()
        throw new Error('Account created but application setup failed. Please try again.')
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
          className="w-full max-w-2xl"
        >
          <GlassCard glow padding="lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-astra-secondary to-astra-primary flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-astra-text font-display mb-2">Apply to Join ASTRA</h1>
              <p className="text-astra-muted text-sm">Submit your application. A guild admin will review it soon.</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Level"
                  name="level"
                  type="number"
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="Character level"
                  icon={<BarChart3 className="w-5 h-5" />}
                  required
                />
                <Input
                  label="Combat Power"
                  name="combatPower"
                  type="number"
                  value={formData.combatPower}
                  onChange={handleChange}
                  placeholder="Your CP"
                  icon={<Gauge className="w-5 h-5" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CountrySelect
                  value={formData.nationality}
                  onChange={(value) => setFormData((prev) => ({ ...prev, nationality: value }))}
                  required
                />
                <Input
                  label="Current Server"
                  name="server"
                  value={formData.server}
                  onChange={handleChange}
                  placeholder="Server you play on"
                  icon={<Server className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">
                  Main Weapon Mastery
                  <span className="text-astra-accent ml-1">*</span>
                </label>
                <div className="relative">
                  <Sword className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-astra-muted/70 pointer-events-none" />
                  <select
                    name="mainWeapon"
                    value={formData.mainWeapon}
                    onChange={handleChange}
                    required
                    className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text text-sm focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none pl-11 pr-10 h-11 py-2 leading-tight appearance-none cursor-pointer"
                  >
                    <option value="">Select main weapon...</option>
                    {MAIN_WEAPON_OPTIONS.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-astra-muted/70 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              </div>

              <GlowButton type="submit" loading={loading} className="w-full" size="lg">
                Submit Application
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
