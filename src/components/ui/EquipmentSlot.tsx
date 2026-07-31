import { motion } from 'framer-motion'
import { Sword, Shield, Shirt, Hand, Footprints, Sparkles } from 'lucide-react'
import type { EquipmentMap } from '../../types/index.ts'

interface EquipmentSlotProps {
  name: keyof EquipmentMap
  label: string
  value: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  onClick?: () => void
  readOnly?: boolean
}

const slotIcons: Record<keyof EquipmentMap, typeof Sword> = {
  mainWeapon: Sword,
  helmet: Shield,
  chest: Shirt,
  gloves: Hand,
  boots: Footprints,
  accessory: Sparkles,
}

const rarityStyles = {
  common: 'border-slate-500/40 shadow-slate-500/10',
  rare: 'border-astra-primary/50 shadow-astra-primary/20',
  epic: 'border-astra-secondary/60 shadow-astra-secondary/30',
  legendary: 'border-astra-accent/70 shadow-astra-accent/30',
  mythic: 'border-fuchsia-400/80 shadow-fuchsia-400/40',
}

const determineRarity = (value: string) => {
  const lower = value.toLowerCase()
  if (lower.includes('mythic') || lower.includes('ancient')) return 'mythic'
  if (lower.includes('legendary') || lower.includes('divine')) return 'legendary'
  if (lower.includes('epic')) return 'epic'
  if (lower.includes('rare')) return 'rare'
  return 'common'
}

export const EquipmentSlot = ({ name, label, value, rarity, onClick, readOnly = false }: EquipmentSlotProps) => {
  const Icon = slotIcons[name]
  const finalRarity = rarity || determineRarity(value)
  const hasValue = value.trim().length > 0

  return (
    <motion.div
      whileHover={!readOnly ? { scale: 1.05, y: -4 } : undefined}
      whileTap={!readOnly ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={[
        'relative group flex flex-col items-center justify-center gap-2',
        'w-full aspect-square rounded-xl border-2 bg-astra-bg/40',
        'cursor-pointer transition-all duration-300',
        rarityStyles[finalRarity],
        'shadow-[0_0_15px_rgba(0,0,0,0.3)]',
        !hasValue ? 'opacity-70' : '',
        readOnly ? 'cursor-default' : '',
      ].join(' ')}
    >
      <div className={[
        'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity',
        finalRarity === 'common' ? 'bg-slate-500/5' : '',
        finalRarity === 'rare' ? 'bg-astra-primary/10' : '',
        finalRarity === 'epic' ? 'bg-astra-secondary/10' : '',
        finalRarity === 'legendary' ? 'bg-astra-accent/10' : '',
        finalRarity === 'mythic' ? 'bg-fuchsia-400/10' : '',
      ].join(' ')}
      />
      <Icon className={[
        'w-6 h-6 transition-colors',
        hasValue ? 'text-astra-primary' : 'text-astra-muted/40',
      ].join(' ')}
      />
      <div className="text-center px-2 z-10">
        <p className="text-[10px] uppercase tracking-wider text-astra-muted/70 mb-0.5">{label}</p>
        <p className={[
          'text-xs font-medium truncate max-w-full',
          hasValue ? 'text-astra-text' : 'text-astra-muted/50',
        ].join(' ')}
        >
          {hasValue ? value : 'Empty'}
        </p>
      </div>
    </motion.div>
  )
}
