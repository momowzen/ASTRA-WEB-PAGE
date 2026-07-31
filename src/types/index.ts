export type UserRole = 'admin' | 'member'

export interface MemberProfile {
  uid: string
  role: UserRole
  ign: string
  discordName: string
  email: string
  avatar?: string | null
  combatPower: number
  level: number
  class?: string
  mainWeapon: string
  subWeapon: string
  armor: string
  necklace: boolean
  ring: boolean
  earring: boolean
  bracelet: boolean
  belt: boolean
  notes: string
  createdAt: string
  updatedAt: string
}

export interface MemberFormData {
  ign: string
  discordName: string
  combatPower: number
  level: number
  class: string
  mainWeapon: string
  subWeapon: string
  armor: string
  necklace: boolean
  ring: boolean
  earring: boolean
  bracelet: boolean
  belt: boolean
  notes: string
}

export type EquipmentMap = {
  mainWeapon: string
  subWeapon: string
  armor: string
  necklace: boolean
  ring: boolean
  earring: boolean
  bracelet: boolean
  belt: boolean
}

export interface EquipmentSlot {
  key: keyof EquipmentMap
  label: string
  icon: string
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export type MemberSortField =
  | 'ign'
  | 'combatPower'
  | 'level'
  | 'mainWeapon'
  | 'updatedAt'

export type SortDirection = 'asc' | 'desc'

export const MAIN_WEAPON_OPTIONS = [
  'Battle Staff',
  'Staff',
  'Dagger',
  'Bow',
  'Crossbow',
  'Sword & Shield',
  'Greatsword',
  'Combat Shield',
] as const

export const SUB_WEAPON_OPTIONS = [
  'Sword & Shield',
  'Dagger',
  'Gauntlets',
  'Crossbow',
  'Bow',
  'Staff',
  'Battle Staff',
  'Greatsword',
  'Combat Shield',
] as const

export const ARMOR_OPTIONS = ['Cloth', 'Leather', 'Plate'] as const
