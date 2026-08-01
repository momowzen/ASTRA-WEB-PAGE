import { EquipmentSlot } from '../ui/EquipmentSlot.tsx'
import { Sword, Shield, Shirt } from 'lucide-react'
import { MAIN_WEAPON_OPTIONS, SUB_WEAPON_OPTIONS, ARMOR_OPTIONS } from '../../types/index.ts'
import type { EquipmentMap, MemberFormData } from '../../types/index.ts'

interface EquipmentEditorProps {
  formData: MemberFormData
  onChange: (data: MemberFormData) => void
}

const accessorySlots: { key: keyof EquipmentMap; label: string }[] = [
  { key: 'necklace', label: 'Necklace' },
  { key: 'ring', label: 'Ring' },
  { key: 'earring', label: 'Earring' },
  { key: 'bracelet', label: 'Bracelet' },
  { key: 'belt', label: 'Belt' },
]

export const EquipmentEditor = ({ formData, onChange }: EquipmentEditorProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-astra-text font-display mb-2">Weapons & Armor</h3>
        <p className="text-sm text-astra-muted mb-4">Select your equipment from the dropdown menus.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-astra-primary mb-1">
              <Sword className="w-4 h-4" />
              <label className="text-sm font-medium text-astra-text">Main Weapon</label>
            </div>
            <select
              value={formData.mainWeapon}
              onChange={(e) => onChange({ ...formData, mainWeapon: e.target.value })}
              className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text text-sm focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none px-3 py-3 appearance-none cursor-pointer"
            >
              <option value="">Select weapon...</option>
              {MAIN_WEAPON_OPTIONS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div className="glass rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-astra-primary mb-1">
              <Shield className="w-4 h-4" />
              <label className="text-sm font-medium text-astra-text">Sub Weapon</label>
            </div>
            <select
              value={formData.subWeapon}
              onChange={(e) => onChange({ ...formData, subWeapon: e.target.value })}
              className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text text-sm focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none px-3 py-3 appearance-none cursor-pointer"
            >
              <option value="">Select weapon...</option>
              {SUB_WEAPON_OPTIONS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div className="glass rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-astra-primary mb-1">
              <Shirt className="w-4 h-4" />
              <label className="text-sm font-medium text-astra-text">Armor</label>
            </div>
            <select
              value={formData.armor}
              onChange={(e) => onChange({ ...formData, armor: e.target.value })}
              className="w-full bg-astra-bg/60 border border-astra-primary/20 rounded-lg text-astra-text text-sm focus:border-astra-primary/60 focus:ring-2 focus:ring-astra-primary/20 transition-all outline-none px-3 py-3 appearance-none cursor-pointer"
            >
              <option value="">Select armor...</option>
              {ARMOR_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-astra-text font-display mb-2">Legendary Accessories</h3>
        <p className="text-sm text-astra-muted mb-4">Click a slot to mark legendary accessories you own.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {accessorySlots.map((slot) => (
            <EquipmentSlot
              key={slot.key}
              name={slot.key}
              label={slot.label}
              value={formData[slot.key] ?? false}
              onClick={() => onChange({ ...formData, [slot.key]: !formData[slot.key] })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
