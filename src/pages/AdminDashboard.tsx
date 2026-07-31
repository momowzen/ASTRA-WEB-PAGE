import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, AlertTriangle, Trash2 } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { LoadingSpinner } from '../components/ui/LoadingSpinner.tsx'
import { MemberTable } from '../components/admin/MemberTable.tsx'
import { StatsOverview } from '../components/admin/StatsOverview.tsx'
import { MemberQuickEdit } from '../components/admin/MemberQuickEdit.tsx'
import { useAuth } from '../hooks/useAuth.ts'
import { useUsers } from '../hooks/useUsers.ts'
import { deleteMember, updateMemberProfile, setAdminRole } from '../services/userService.ts'
import { Modal } from '../components/ui/Modal.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'
import type { MemberProfile, MemberFormData } from '../types/index.ts'

export const AdminDashboard = () => {
  const { profile, isLoading: authLoading, isAdmin } = useAuth()
  const { members, loading, refetch, setMembers } = useUsers()
  const [editingMember, setEditingMember] = useState<MemberProfile | null>(null)
  const [deletingMember, setDeletingMember] = useState<MemberProfile | null>(null)
  const [saving, setSaving] = useState(false)

  if (authLoading) return <LoadingSpinner fullScreen message="Verifying access..." />
  if (!isAdmin || !profile) {
    return (
      <div className="min-h-screen bg-astra-bg">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100svh-80px)] px-4">
          <GlassCard className="text-center max-w-md">
            <Shield className="w-12 h-12 text-astra-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-astra-text font-display mb-4">Access Denied</h2>
            <p className="text-astra-muted">This area is restricted to guild administrators.</p>
          </GlassCard>
        </main>
      </div>
    )
  }

  const handleEdit = async (uid: string, formData: MemberFormData, role: 'admin' | 'member') => {
    setSaving(true)
    try {
      await updateMemberProfile(uid, formData)
      await setAdminRole(uid, role)
      await refetch()
      setEditingMember(null)
    } catch (err) {
      console.error('Failed to update member', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingMember) return
    try {
      await deleteMember(deletingMember.uid)
      setMembers((prev) => prev.filter((m) => m.uid !== deletingMember.uid))
      setDeletingMember(null)
    } catch (err) {
      console.error('Failed to delete member', err)
    }
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
            <div className="flex items-center gap-2 text-astra-accent mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">Admin Console</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-astra-text font-display">Guild Management</h1>
              <div className="flex items-center gap-2 text-sm text-astra-muted">
                <Users className="w-4 h-4" />
                {members.length} members registered
              </div>
            </div>
          </motion.div>

          <StatsOverview members={members} />

          <GlassCard className="gradient-border">
            {loading ? (
              <LoadingSpinner message="Loading guild roster..." />
            ) : (
              <MemberTable
                members={members}
                onEdit={setEditingMember}
                onDelete={setDeletingMember}
                currentUserId={profile.uid}
                isAdmin={isAdmin}
              />
            )}
          </GlassCard>
        </div>
      </main>
      <Footer />

      <MemberQuickEdit
        member={editingMember}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleEdit}
        isAdmin={isAdmin}
        isLoading={saving}
      />

      <Modal isOpen={!!deletingMember} onClose={() => setDeletingMember(null)} title="Delete Member" size="sm">
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-astra-text font-medium">Are you sure?</p>
              <p className="text-sm text-astra-muted">
                This will permanently delete {deletingMember?.ign} from the guild roster.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <GlowButton variant="outline" onClick={() => setDeletingMember(null)}>
              Cancel
            </GlowButton>
            <GlowButton variant="danger" onClick={handleDelete} icon={<Trash2 className="w-4 h-4" />}>
              Delete
            </GlowButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}
