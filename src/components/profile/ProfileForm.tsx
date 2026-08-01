import { Save } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input.tsx'
import { CountrySelect } from '../ui/CountrySelect.tsx'
import { GlowButton } from '../ui/GlowButton.tsx'
import type { MemberFormData } from '../../types/index.ts'

interface ProfileFormProps {
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
}

export const ProfileForm = ({ formData, onChange, onSubmit, isLoading = false }: ProfileFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({
      ...formData,
      [name]: name === 'combatPower' || name === 'level' ? parseInt(value) || 0 : value,
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center sm:text-left">
        <h3 className="text-2xl font-bold text-astra-text font-display">{formData.ign}</h3>
        <p className="text-astra-muted">{formData.discordName}</p>
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
        <CountrySelect
          value={formData.nationality}
          onChange={(value) => onChange({ ...formData, nationality: value })}
        />
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
          Save Changes
        </GlowButton>
      </motion.div>
    </form>
  )
}
