import { Input } from '../ui/Input.tsx'
import { CountrySelect } from '../ui/CountrySelect.tsx'
import type { MemberFormData } from '../../types/index.ts'

interface ProfileFormProps {
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
}

export const ProfileForm = ({ formData, onChange }: ProfileFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({
      ...formData,
      [name]: name === 'combatPower' || name === 'level' ? parseInt(value) || 0 : value,
    })
  }

  return (
    <div className="space-y-10">
      {/* Basic Information */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-astra-primary to-astra-secondary" />
          <h3 className="text-lg font-semibold text-astra-text font-display">Basic Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="In-Game Name" name="ign" value={formData.ign} onChange={handleChange} required />
          <Input label="Discord Name" name="discordName" value={formData.discordName} onChange={handleChange} required />
          <Input label="Level" name="level" type="number" value={formData.level} onChange={handleChange} required />
          <Input label="Combat Power" name="combatPower" type="number" value={formData.combatPower} onChange={handleChange} required />
          <CountrySelect value={formData.nationality} onChange={(value) => onChange({ ...formData, nationality: value })} />
          <Input label="Current Server" name="server" value={formData.server} onChange={handleChange} placeholder="Server you play on" />
        </div>
      </section>

      {/* Notes */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-astra-secondary to-astra-accent" />
          <h3 className="text-lg font-semibold text-astra-text font-display">Notes</h3>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-astra-muted mb-2 tracking-wide">About</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text placeholder:text-astra-muted/60 focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all duration-300 outline-none px-4 py-3 resize-none"
            placeholder="Additional notes about your character, availability, or goals..."
          />
        </div>
      </section>
    </div>
  )
}
