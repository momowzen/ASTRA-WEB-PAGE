import { useState, useRef } from 'react'
import { Camera, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input.tsx'
import { GlowButton } from '../ui/GlowButton.tsx'
import { Avatar } from '../ui/Avatar.tsx'
import { uploadAvatar } from '../../services/storageService.ts'
import { updateMemberAvatar } from '../../services/userService.ts'
import type { MemberProfile, MemberFormData } from '../../types/index.ts'

interface ProfileFormProps {
  profile: MemberProfile
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
}

export const ProfileForm = ({ profile, formData, onChange, onSubmit, isLoading = false }: ProfileFormProps) => {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar || null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({
      ...formData,
      [name]: name === 'combatPower' || name === 'level' ? parseInt(value) || 0 : value,
    })
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingAvatar(true)
    try {
      const url = await uploadAvatar(profile.uid, file)
      await updateMemberAvatar(profile.uid, url)
      setAvatarUrl(url)
    } catch (err) {
      console.error('Avatar upload failed', err)
    } finally {
      setUploadingAvatar(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="relative group">
          <Avatar src={avatarUrl} name={formData.ign} size="xl" glow />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            {uploadingAvatar ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-astra-text font-display">{formData.ign}</h3>
          <p className="text-astra-muted">{formData.discordName}</p>
          <p className="text-xs text-astra-primary/70 mt-2 uppercase tracking-wider">Click avatar to upload</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label="In-Game Name" name="ign" value={formData.ign} onChange={handleChange} required />
        <Input label="Discord Name" name="discordName" value={formData.discordName} onChange={handleChange} required />
        <Input
          label="Combat Power"
          name="combatPower"
          type="number"
          value={formData.combatPower}
          onChange={handleChange}
          required
        />
        <Input label="Level" name="level" type="number" value={formData.level} onChange={handleChange} required />
        <Input label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Country" />
        <Input label="Server" name="server" value={formData.server} onChange={handleChange} placeholder="Current server" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all duration-300 outline-none px-4 py-3 resize-none"
          placeholder="Additional notes about your character, availability, or goals..."
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-end"
      >
        <GlowButton type="submit" loading={isLoading} icon={<Save className="w-5 h-5" />}>
          Save Profile
        </GlowButton>
      </motion.div>
    </form>
  )
}
