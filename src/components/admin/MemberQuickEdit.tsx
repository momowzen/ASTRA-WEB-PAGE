import { useEffect, useState } from 'react'
import { X, Save, Crown, User, Upload, Loader2 } from 'lucide-react'
import { Modal } from '../ui/Modal.tsx'
import { Input } from '../ui/Input.tsx'
import { GlowButton } from '../ui/GlowButton.tsx'
import { Avatar } from '../ui/Avatar.tsx'
import { EquipmentEditor } from '../profile/EquipmentEditor.tsx'
import { uploadAvatar } from '../../services/storageService.ts'
import { updateMemberAvatar } from '../../services/userService.ts'
import type { MemberProfile, MemberFormData } from '../../types/index.ts'

interface MemberQuickEditProps {
  member: MemberProfile | null
  isOpen: boolean
  onClose: () => void
  onSave: (uid: string, data: MemberFormData, role: 'admin' | 'member') => void
  isAdmin: boolean
  isLoading: boolean
}

const initialFormData = (member: MemberProfile | null): MemberFormData => ({
  ign: member?.ign || '',
  discordName: member?.discordName || '',
  combatPower: member?.combatPower || 0,
  level: member?.level || 1,
  class: member?.class || '',
  mainWeapon: member?.mainWeapon || '',
  subWeapon: member?.subWeapon || '',
  armor: member?.armor || '',
  necklace: member?.necklace ?? false,
  ring: member?.ring ?? false,
  earring: member?.earring ?? false,
  bracelet: member?.bracelet ?? false,
  belt: member?.belt ?? false,
  notes: member?.notes || '',
})

export const MemberQuickEdit = ({ member, isOpen, onClose, onSave, isAdmin, isLoading }: MemberQuickEditProps) => {
  const [formData, setFormData] = useState<MemberFormData>(initialFormData(member))
  const [role, setRole] = useState<'admin' | 'member'>('member')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (member) {
      setFormData(initialFormData(member))
      setRole(member.role)
      setAvatarUrl(member.avatar || null)
    }
  }, [member])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'combatPower' || name === 'level' ? parseInt(value) || 0 : value,
    }))
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !member) return
    setUploading(true)
    try {
      const url = await uploadAvatar(member.uid, file)
      await updateMemberAvatar(member.uid, url)
      setAvatarUrl(url)
    } catch (err) {
      console.error('Avatar upload failed', err)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!member) return
    onSave(member.uid, formData, role)
  }

  if (!member) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Member" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar src={avatarUrl} name={formData.ign} size="lg" glow />
            {isAdmin && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-astra-primary flex items-center justify-center cursor-pointer hover:bg-astra-secondary transition-colors shadow-lg">
                {uploading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 text-white" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-astra-text font-display">{formData.ign}</h3>
            <p className="text-astra-muted text-sm">{member.email}</p>
            <p className="text-astra-primary text-xs mt-1 uppercase tracking-wider">{member.discordName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="In-Game Name" name="ign" value={formData.ign} onChange={handleChange} required />
          <Input label="Discord Name" name="discordName" value={formData.discordName} onChange={handleChange} required />
          <Input label="Combat Power" name="combatPower" type="number" value={formData.combatPower} onChange={handleChange} required />
          <Input label="Level" name="level" type="number" value={formData.level} onChange={handleChange} required />
          <Input label="Class" name="class" value={formData.class} onChange={handleChange} />
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">Role</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('member')}
                  className={[
                    'flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2',
                    role === 'member'
                      ? 'bg-astra-primary/10 border-astra-primary text-astra-primary'
                      : 'bg-astra-bg/60 border-astra-primary/10 text-astra-muted hover:text-astra-text',
                  ].join(' ')}
                >
                  <User className="w-4 h-4" /> Member
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={[
                    'flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2',
                    role === 'admin'
                      ? 'bg-astra-accent/10 border-astra-accent text-astra-accent'
                      : 'bg-astra-bg/60 border-astra-primary/10 text-astra-muted hover:text-astra-text',
                  ].join(' ')}
                >
                  <Crown className="w-4 h-4" /> Admin
                </button>
              </div>
            </div>
          )}
        </div>

        <EquipmentEditor formData={formData} onChange={setFormData} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none px-4 py-3 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <GlowButton type="button" variant="outline" onClick={onClose} icon={<X className="w-4 h-4" />}>
            Cancel
          </GlowButton>
          <GlowButton type="submit" loading={isLoading} icon={<Save className="w-4 h-4" />}>
            Save Changes
          </GlowButton>
        </div>
      </form>
    </Modal>
  )
}
