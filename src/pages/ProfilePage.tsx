import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Sparkles, Shield, Calendar, MessageCircle, X, Save } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { Avatar } from '../components/ui/Avatar.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'
import { AnimatedCounter } from '../components/ui/AnimatedCounter.tsx'
import { EquipmentSlot } from '../components/ui/EquipmentSlot.tsx'
import { ProfileForm } from '../components/profile/ProfileForm.tsx'
import { EquipmentEditor } from '../components/profile/EquipmentEditor.tsx'
import { LoadingSpinner } from '../components/ui/LoadingSpinner.tsx'
import { useAuth } from '../hooks/useAuth.ts'
import { updateMemberProfile } from '../services/userService.ts'
import { formatDate } from '../utils/helpers.ts'
import { getCountryFlag } from '../types/index.ts'
import type { MemberFormData, MemberProfile, UserRole } from '../types/index.ts'

const roleLabel = (role: UserRole): string => {
  if (role === 'admin') return 'Guild Master'
  if (role === 'applicant') return 'Applicant'
  return 'Member'
}

const createInitialFormData = (profile: MemberProfile): MemberFormData => ({
  ign: profile.ign,
  discordName: profile.discordName,
  combatPower: profile.combatPower,
  level: profile.level,
  nationality: profile.nationality || '',
  server: profile.server || '',
  mainWeapon: profile.mainWeapon,
  subWeapon: profile.subWeapon,
  armor: profile.armor,
  necklace: profile.necklace ?? false,
  ring: profile.ring ?? false,
  earring: profile.earring ?? false,
  bracelet: profile.bracelet ?? false,
  belt: profile.belt ?? false,
  notes: profile.notes,
})

export const ProfilePage = () => {
  const { profile, isLoading, isAuthenticated, authError, refreshProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'equipment'>('overview')
  const [editTab, setEditTab] = useState<'basic' | 'equipment' | 'notes'>('basic')
  const [editForm, setEditForm] = useState<MemberFormData>({
    ign: '',
    discordName: '',
    combatPower: 0,
    level: 1,
    nationality: '',
    server: '',
    mainWeapon: '',
    subWeapon: '',
    armor: '',
    necklace: false,
    ring: false,
    earring: false,
    bracelet: false,
    belt: false,
    notes: '',
  })

  useEffect(() => {
    if (isAuthenticated && !profile && !isLoading && !authError) {
      refreshProfile()
    }
  }, [isAuthenticated, profile, isLoading, authError, refreshProfile])

  const startEditing = () => {
    if (profile) {
      setEditForm(createInitialFormData(profile))
      setIsEditing(true)
    }
  }

  const handleSave = async (e?: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    if (!profile) return
    setSaving(true)
    setError('')
    try {
      await updateMemberProfile(profile.uid, editForm)
      await refreshProfile()
      setIsEditing(false)
      setActiveTab('overview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <LoadingSpinner fullScreen message="Summoning your profile..." />
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-astra-bg">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100svh-80px)] px-4">
          <GlassCard className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-astra-text font-display mb-4">Not Signed In</h2>
            <p className="text-astra-muted mb-6">Please login or register to view your profile.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-astra-primary text-astra-bg font-medium">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg border border-astra-primary text-astra-primary">Register</Link>
            </div>
          </GlassCard>
        </main>
      </div>
    )
  }
  if (isAuthenticated && !profile) {
    return (
      <div className="min-h-screen bg-astra-bg">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100svh-80px)] px-4">
          <GlassCard className="text-center max-w-md">
            {authError ? (
              <>
                <h2 className="text-2xl font-bold text-astra-text font-display mb-4">Oops</h2>
                <p className="text-astra-muted mb-6">{authError}</p>
                <GlowButton onClick={refreshProfile} icon={<Edit className="w-4 h-4" />}>Retry</GlowButton>
              </>
            ) : (
              <>
                <LoadingSpinner message="Loading your profile..." />
                <p className="text-astra-muted mt-4">Your profile is being prepared among the stars.</p>
              </>
            )}
          </GlassCard>
        </main>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-astra-bg">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-astra-primary mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">Member Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-astra-text font-display">
              {isEditing ? 'Edit Profile' : 'My Profile'}
            </h1>
          </motion.div>

          {isEditing ? (
            <div className="max-w-5xl mx-auto">
              <form onSubmit={handleSave}>
                <GlassCard>
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-8 pb-6 border-b border-astra-primary/10">
                    <h2 className="text-2xl font-bold text-astra-text font-display">Edit Profile</h2>
                    <p className="text-sm text-astra-muted mt-1">Update your character details and equipment.</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-2 mb-8 p-1 rounded-xl bg-astra-bg/60 border border-astra-primary/10 w-fit">
                    {(['basic', 'equipment', 'notes'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setEditTab(tab)}
                        className={[
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                          editTab === tab
                            ? 'bg-astra-primary/10 text-astra-primary border border-astra-primary/30'
                            : 'text-astra-muted hover:text-astra-text hover:bg-astra-primary/5',
                        ].join(' ')}
                      >
                        {tab === 'basic' ? 'Basic Info' : tab}
                      </button>
                    ))}
                  </div>

                  {editTab === 'basic' && <ProfileForm formData={editForm} onChange={setEditForm} />}

                  {editTab === 'equipment' && (
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-astra-accent to-astra-primary" />
                        <h3 className="text-lg font-semibold text-astra-text font-display">Equipment</h3>
                      </div>
                      <EquipmentEditor formData={editForm} onChange={setEditForm} />
                    </div>
                  )}

                  {editTab === 'notes' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-astra-secondary to-astra-accent" />
                        <h3 className="text-lg font-semibold text-astra-text font-display">Notes</h3>
                      </div>
                      <textarea
                        name="notes"
                        value={editForm.notes}
                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                        rows={6}
                        className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all duration-300 outline-none px-4 py-3 resize-none"
                        placeholder="Additional notes about your character, availability, or goals..."
                      />
                    </div>
                  )}

                  {/* Bottom actions */}
                  <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-astra-primary/10">
                    <GlowButton
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      icon={<X className="w-4 h-4" />}
                    >
                      Cancel
                    </GlowButton>
                    <GlowButton
                      type="submit"
                      loading={saving}
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save Changes
                    </GlowButton>
                  </div>
                </GlassCard>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <GlassCard className="text-center" glow>
                  <Avatar src={profile.avatar} name={profile.ign} size="xl" glow className="mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-astra-text font-display mb-2">{profile.ign}</h2>
                  <p className="text-astra-muted mb-4 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> {profile.discordName}
                  </p>
                  <div className={[
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6',
                    profile.role === 'admin'
                      ? 'bg-astra-accent/10 border border-astra-accent/20 text-astra-accent'
                      : profile.role === 'applicant'
                        ? 'bg-astra-primary/10 border border-astra-primary/20 text-astra-primary'
                        : 'bg-astra-secondary/10 border border-astra-secondary/20 text-astra-secondary',
                  ].join(' ')}>
                    {profile.role === 'admin' ? <Shield className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    {roleLabel(profile.role)}
                  </div>
                  <GlowButton onClick={startEditing} icon={<Edit className="w-4 h-4" />} className="w-full">
                    Edit Profile
                  </GlowButton>
                </GlassCard>

                <GlassCard className="mt-6" delay={0.1}>
                  <h3 className="text-sm uppercase tracking-wider text-astra-muted mb-4 font-semibold">Account Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-astra-muted">Email</span>
                      <span className="text-astra-text">{profile.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-astra-muted">Level</span>
                      <span className="text-astra-text">{profile.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-astra-muted">Nationality</span>
                      <span className="text-astra-text">
                        {profile.nationality ? `${getCountryFlag(profile.nationality)} ${profile.nationality}` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-astra-muted">Server</span>
                      <span className="text-astra-text">{profile.server || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-astra-muted flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated</span>
                      <span className="text-astra-text">{formatDate(profile.updatedAt)}</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <GlassCard glow className="text-center py-12">
                  <p className="text-sm uppercase tracking-[0.3em] text-astra-muted mb-2">Combat Power</p>
                  <div className="text-6xl sm:text-7xl font-bold text-astra-text font-display text-glow">
                    <AnimatedCounter value={profile.combatPower || 0} />
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        activeTab === 'overview' ? 'bg-astra-primary/10 text-astra-primary' : 'text-astra-muted hover:text-astra-text',
                      ].join(' ')}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('equipment')}
                      className={[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        activeTab === 'equipment' ? 'bg-astra-primary/10 text-astra-primary' : 'text-astra-muted hover:text-astra-text',
                      ].join(' ')}
                    >
                      Equipment
                    </button>
                  </div>

                  {activeTab === 'overview' ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-astra-text font-display mb-4">Notes</h3>
                      <p className="text-astra-muted leading-relaxed whitespace-pre-wrap">
                        {profile.notes || 'No notes added yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      <EquipmentSlot name="mainWeapon" label="Main Weapon" value={profile.mainWeapon} readOnly />
                      <EquipmentSlot name="subWeapon" label="Sub Weapon" value={profile.subWeapon} readOnly />
                      <EquipmentSlot name="armor" label="Armor" value={profile.armor} readOnly />
                      <EquipmentSlot name="necklace" label="Necklace" value={profile.necklace} readOnly />
                      <EquipmentSlot name="ring" label="Ring" value={profile.ring} readOnly />
                      <EquipmentSlot name="earring" label="Earring" value={profile.earring} readOnly />
                      <EquipmentSlot name="bracelet" label="Bracelet" value={profile.bracelet} readOnly />
                      <EquipmentSlot name="belt" label="Belt" value={profile.belt} readOnly />
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
