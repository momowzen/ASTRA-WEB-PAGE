import { Input } from '../ui/Input.tsx'
import { CountrySelect } from '../ui/CountrySelect.tsx'
import type { MemberFormData } from '../../types/index.ts'

interface ProfileFormProps {
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
}

export const ProfileForm = ({ formData, onChange }: ProfileFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({
      ...formData,
      [name]: name === 'combatPower' || name === 'level' ? parseInt(value) || 0 : value,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Input label="In-Game Name" name="ign" value={formData.ign} onChange={handleChange} required />
      <Input label="Discord Name" name="discordName" value={formData.discordName} onChange={handleChange} required />
      <Input label="Level" name="level" type="number" value={formData.level} onChange={handleChange} required />
      <Input label="Combat Power" name="combatPower" type="number" value={formData.combatPower} onChange={handleChange} required />
      <CountrySelect value={formData.nationality} onChange={(value) => onChange({ ...formData, nationality: value })} />
      <Input label="Current Server" name="server" value={formData.server} onChange={handleChange} placeholder="Server you play on" />
    </div>
  )
}
