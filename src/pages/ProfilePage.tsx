import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Sparkles, Shield, Calendar, MessageCircle, X } from 'lucide-react'
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
import type { MemberFormData, MemberProfile } from '../types/index.ts'

const createInitialFormData = (profile: MemberProfile): MemberFormData => ({
  ign: profile.ign,
  discordName: profile.discordName,
  combatPower: profile.combatPower,
  level: profile.level,
  class: profile.class || '',
  mainWeapon: profile.mainWeapon,
  helmet: profile.helmet,
  chest: profile.chest,
  gloves: profile.gloves,
  boots: profile.boots,
  accessory: profile.accessory,
  notes: profile.notes,
})

export const ProfilePage = () => {
  const { profile, isLoading, isAdmin, refreshProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'equipment'>('overview')
  const [editForm, setEditForm] = useState<MemberFormData>({
    ign: '',
    discordName: '',
    combatPower: 0,
    level: 1,
    class: '',
    mainWeapon: '',
    helmet: '',
    chest: '',
    gloves: '',
    boots: '',
    accessory: '',
    notes: '',
  })

  const startEditing = () => {
    if (profile) {
      setEditForm(createInitialFormData(profile))
      setIsEditing(true)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    try {
      await updateMemberProfile(profile.uid, editForm)
      await refreshProfile()
      setIsEditing(false)
      setActiveTab('overview')
    } catch (err) {
      console.error('Failed to save profile', err)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <LoadingSpinner fullScreen message="Summoning your profile..." />
  if (!profile) {
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GlassCard>
                  <ProfileForm
                    profile={profile}
                    formData={editForm}
                    onChange={setEditForm}
                    onSubmit={handleSave}
                    isLoading={saving}
                  />
                </GlassCard>
              </div>
              <div className="lg:col-span-1">
                <GlassCard>
                  <h3 className="text-xl font-semibold text-astra-text font-display mb-4">Equipment</h3>
                  <EquipmentEditor formData={editForm} onChange={setEditForm} />
                  <div className="flex justify-end gap-3 mt-6">
                    <GlowButton
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      icon={<X className="w-4 h-4" />}
                    >
                      Cancel
                    </GlowButton>
                    <GlowButton
                      type="button"
                      onClick={handleSave}
                      loading={saving}
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Save Changes
                    </GlowButton>
                  </div>
                </GlassCard>
              </div>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-astra-primary/10 border border-astra-primary/20 text-astra-primary text-xs uppercase tracking-wider mb-6">
                    {isAdmin ? <Shield className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    {isAdmin ? 'Guild Master' : 'Member'}
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
                      <span className="text-astra-muted">Class</span>
                      <span className="text-astra-text">{profile.class || '—'}</span>
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      <EquipmentSlot name="mainWeapon" label="Main Weapon" value={profile.mainWeapon} readOnly />
                      <EquipmentSlot name="helmet" label="Helmet" value={profile.helmet} readOnly />
                      <EquipmentSlot name="chest" label="Chest" value={profile.chest} readOnly />
                      <EquipmentSlot name="gloves" label="Gloves" value={profile.gloves} readOnly />
                      <EquipmentSlot name="boots" label="Boots" value={profile.boots} readOnly />
                      <EquipmentSlot name="accessory" label="Accessory" value={profile.accessory} readOnly />
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
