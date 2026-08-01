import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, UserPlus, AlertTriangle, Trash2 } from 'lucide-react'
import { ParticleBackground } from '../components/layout/ParticleBackground.tsx'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { GlassCard } from '../components/ui/GlassCard.tsx'
import { LoadingSpinner } from '../components/ui/LoadingSpinner.tsx'
import { MemberTable } from '../components/admin/MemberTable.tsx'
import { ApplicantTable } from '../components/admin/ApplicantTable.tsx'
import { StatsOverview } from '../components/admin/StatsOverview.tsx'
import { MemberQuickEdit } from '../components/admin/MemberQuickEdit.tsx'
import { useAuth } from '../hooks/useAuth.ts'
import { useUsers } from '../hooks/useUsers.ts'
import { deleteMember, updateMemberProfile } from '../services/userService.ts'
import { Modal } from '../components/ui/Modal.tsx'
import { GlowButton } from '../components/ui/GlowButton.tsx'
import type { MemberProfile, MemberFormData, UserRole } from '../types/index.ts'

export const AdminDashboard = () => {
  const { profile, isLoading: authLoading, isAdmin } = useAuth()
  const { members, loading, error: fetchError, refetch, setMembers } = useUsers()
  const [editingMember, setEditingMember] = useState<MemberProfile | null>(null)
  const [deletingMember, setDeletingMember] = useState<MemberProfile | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState('')

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

  const applicants = members.filter((m) => m.role === 'applicant')
  const roster = members.filter((m) => m.role !== 'applicant')

  const handleEdit = async (uid: string, formData: MemberFormData, role: UserRole) => {
    setSaving(true)
    setActionError('')
    try {
      await updateMemberProfile(uid, formData, role)
      await refetch()
      setEditingMember(null)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update member.')
    } finally {
      setSaving(false)
    }
  }

  const handleApprove = async (applicant: MemberProfile) => {
    setSaving(true)
    setActionError('')
    try {
      await updateMemberProfile(applicant.uid, {}, 'member')
      await refetch()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to approve applicant.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingMember) return
    setDeleting(true)
    setActionError('')
    try {
      await deleteMember(deletingMember.uid)
      setMembers((prev) => prev.filter((m) => m.uid !== deletingMember.uid))
      setDeletingMember(null)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete member.')
    } finally {
      setDeleting(false)
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
              <div className="flex items-center gap-4 text-sm text-astra-muted">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  {applicants.length} applicants
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {roster.length} members
                </div>
              </div>
            </div>
          </motion.div>

          <StatsOverview members={members} />

          {applicants.length > 0 && (
            <GlassCard className="gradient-border mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-astra-primary/10 flex items-center justify-center border border-astra-primary/20">
                  <UserPlus className="w-5 h-5 text-astra-primary" />
                </div>
                <h2 className="text-lg font-bold text-astra-text font-display">Pending Applications</h2>
                <span className="ml-auto text-xs text-astra-muted bg-astra-primary/10 px-3 py-1 rounded-full">
                  {applicants.length}
                </span>
              </div>
              {fetchError && (
                <div className="p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  Error loading applicants: {fetchError}
                </div>
              )}
              {loading ? (
                <LoadingSpinner message="Loading applications..." />
              ) : (
                <ApplicantTable
                  applicants={applicants}
                  onApprove={handleApprove}
                  onReject={setDeletingMember}
                  onEdit={setEditingMember}
                />
              )}
            </GlassCard>
          )}

          <GlassCard className="gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-astra-secondary/10 flex items-center justify-center border border-astra-secondary/20">
                <Users className="w-5 h-5 text-astra-secondary" />
              </div>
              <h2 className="text-lg font-bold text-astra-text font-display">Guild Roster</h2>
            </div>
            {fetchError && (
              <div className="p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                Error loading members: {fetchError}
              </div>
            )}
            {loading ? (
              <LoadingSpinner message="Loading guild roster..." />
            ) : (
              <MemberTable
                members={roster}
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

      <Modal isOpen={!!deletingMember} onClose={() => { if (!deleting) setDeletingMember(null) }} title={deletingMember?.role === 'applicant' ? 'Reject Application' : 'Delete Member'} size="sm">
        <div className="space-y-6">
          {actionError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{actionError}</div>
          )}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-astra-text font-medium">Are you sure?</p>
              <p className="text-sm text-astra-muted mt-1">
                {deletingMember?.role === 'applicant'
                  ? `This will reject ${deletingMember?.ign}'s application and remove their account data.`
                  : `This will permanently delete ${deletingMember?.ign} from the guild roster.`}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <GlowButton variant="outline" onClick={() => setDeletingMember(null)} disabled={deleting}>
              Cancel
            </GlowButton>
            <GlowButton variant="danger" onClick={handleDelete} loading={deleting} icon={<Trash2 className="w-4 h-4" />}>
              {deletingMember?.role === 'applicant' ? 'Reject' : 'Delete'}
            </GlowButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}
