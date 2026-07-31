import { EquipmentSlot } from '../ui/EquipmentSlot.tsx'
import { Input } from '../ui/Input.tsx'
import { Sword, Shield, Shirt, Hand, Footprints, Sparkles } from 'lucide-react'
import type { EquipmentMap, MemberFormData } from '../../types/index.ts'

interface EquipmentEditorProps {
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
}

const equipmentSlots: { key: keyof EquipmentMap; label: string; icon: typeof Sword }[] = [
  { key: 'mainWeapon', label: 'Main Weapon', icon: Sword },
  { key: 'helmet', label: 'Helmet', icon: Shield },
  { key: 'chest', label: 'Chest', icon: Shirt },
  { key: 'gloves', label: 'Gloves', icon: Hand },
  { key: 'boots', label: 'Boots', icon: Footprints },
  { key: 'accessory', label: 'Accessory', icon: Sparkles },
]

export const EquipmentEditor = ({ formData, onChange }: EquipmentEditorProps) => {
  const handleSlotClick = (key: keyof EquipmentMap) => {
    const currentValue = formData[key]
    const newValue = window.prompt(`Enter ${key}:`, currentValue) || currentValue
    onChange({ ...formData, [key]: newValue })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-astra-text font-display mb-2">Equipment</h3>
        <p className="text-sm text-astra-muted">Click on any slot to update your gear. Rarity glows automatically based on item names.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {equipmentSlots.map((slot) => (
          <div key={slot.key} className="space-y-2">
            <EquipmentSlot
              name={slot.key}
              label={slot.label}
              value={formData[slot.key]}
              onClick={() => handleSlotClick(slot.key)}
            />
            <Input
              name={slot.key}
              value={formData[slot.key]}
              onChange={(e) => onChange({ ...formData, [slot.key]: e.target.value })}
              placeholder={`Enter ${slot.label}`}
              className="py-2 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
