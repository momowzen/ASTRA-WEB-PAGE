import { motion } from 'framer-motion'
import { Sword, Shield, Shirt, Gem, Circle, CircleCheck } from 'lucide-react'
import type { EquipmentMap } from '../../types/index.ts'

interface EquipmentSlotProps {
  name: keyof EquipmentMap
  label: string
  value: string | boolean
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  onClick?: () => void
  readOnly?: boolean
}

const slotIcons: Record<keyof EquipmentMap, typeof Sword> = {
  mainWeapon: Sword,
  subWeapon: Shield,
  armor: Shirt,
  necklace: Gem,
  ring: Gem,
  earring: Gem,
  bracelet: Gem,
  belt: Gem,
}

const rarityStyles: Record<string, string> = {
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

const isAccessorySlot = (name: keyof EquipmentMap): boolean => {
  return ['necklace', 'ring', 'earring', 'bracelet', 'belt'].includes(name)
}

export const EquipmentSlot = ({ name, label, value, rarity, onClick, readOnly = false }: EquipmentSlotProps) => {
  const Icon = slotIcons[name]
  const isAccessory = isAccessorySlot(name)
  const hasStringValue = !isAccessory && typeof value === 'string' && value.trim().length > 0
  const hasBoolValue = isAccessory && value === true
  const finalRarity = typeof value === 'string' ? (rarity || determineRarity(value)) : 'common'

  return (
    <motion.div
      whileHover={!readOnly ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!readOnly ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={[
        'relative group flex flex-col items-center justify-center gap-2',
        'w-full min-h-[120px] rounded-xl border-2 bg-astra-bg/40 p-4',
        'cursor-pointer transition-all duration-300',
        isAccessory
          ? hasBoolValue
            ? 'border-astra-accent/80 shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-astra-accent/5'
            : 'border-slate-500/20'
          : rarityStyles[finalRarity],
        'shadow-[0_0_15px_rgba(0,0,0,0.3)]',
        !hasStringValue && !hasBoolValue ? 'opacity-60' : '',
        readOnly ? 'cursor-default' : '',
      ].join(' ')}
    >
      {isAccessory ? (
        <div className="flex flex-col items-center gap-2 z-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Icon className={['w-6 h-6 transition-colors', hasBoolValue ? 'text-astra-accent' : 'text-astra-muted/40'].join(' ')} />
            {hasBoolValue ? (
              <CircleCheck className="w-5 h-5 text-astra-accent" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600" />
            )}
          </div>
          <div className="text-center w-full">
            <p className="text-[11px] uppercase tracking-wider text-astra-muted/70 mb-1">{label}</p>
            <p className={['text-sm font-medium', hasBoolValue ? 'text-astra-accent' : 'text-astra-muted/50'].join(' ')}>
              {hasBoolValue ? 'Owned' : 'Missing'}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className={[
            'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity',
            finalRarity === 'common' ? 'bg-slate-500/5' : '',
            finalRarity === 'rare' ? 'bg-astra-primary/10' : '',
            finalRarity === 'epic' ? 'bg-astra-secondary/10' : '',
            finalRarity === 'legendary' ? 'bg-astra-accent/10' : '',
            finalRarity === 'mythic' ? 'bg-fuchsia-400/10' : '',
          ].join(' ')}
          />
          <Icon className={['w-6 h-6 transition-colors', hasStringValue ? 'text-astra-primary' : 'text-astra-muted/40'].join(' ')} />
          <div className="text-center w-full z-10">
            <p className="text-[11px] uppercase tracking-wider text-astra-muted/70 mb-1">{label}</p>
            <p className={['text-sm font-medium break-words leading-tight', hasStringValue ? 'text-astra-text' : 'text-astra-muted/50'].join(' ')}>
              {hasStringValue ? (value as string) : 'Empty'}
            </p>
          </div>
        </>
      )}
    </motion.div>
  )
}
