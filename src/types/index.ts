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
  helmet: string
  chest: string
  gloves: string
  boots: string
  accessory: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface EquipmentSlot {
  key: keyof EquipmentMap
  label: string
  icon: string
}

export type EquipmentMap = {
  mainWeapon: string
  helmet: string
  chest: string
  gloves: string
  boots: string
  accessory: string
}

export interface MemberFormData {
  ign: string
  discordName: string
  combatPower: number
  level: number
  class: string
  mainWeapon: string
  helmet: string
  chest: string
  gloves: string
  boots: string
  accessory: string
  notes: string
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
