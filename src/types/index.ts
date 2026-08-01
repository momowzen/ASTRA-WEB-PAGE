export type UserRole = 'admin' | 'member' | 'applicant'

export interface MemberProfile {
  uid: string
  role: UserRole
  ign: string
  discordName: string
  email: string
  avatar?: string | null
  combatPower: number
  level: number
  nationality: string
  server: string
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
  nationality: string
  server: string
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
  | 'nationality'
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

export const COUNTRY_OPTIONS = [
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Albania', flag: '🇦🇱' },
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Belarus', flag: '🇧🇾' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Bolivia', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Brunei', flag: '🇧🇳' },
  { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Cuba', flag: '🇨🇺' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Estonia', flag: '🇪🇪' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Georgia', flag: '🇬🇪' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'Hong Kong', flag: '🇭🇰' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Iceland', flag: '🇮🇸' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Latvia', flag: '🇱🇻' },
  { name: 'Lebanon', flag: '🇱🇧' },
  { name: 'Lithuania', flag: '🇱🇹' },
  { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Macau', flag: '🇲🇴' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Mongolia', flag: '🇲🇳' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Nicaragua', flag: '🇳🇮' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'North Macedonia', flag: '🇲🇰' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Palestine', flag: '🇵🇸' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Paraguay', flag: '🇵🇾' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Romania', flag: '🇷🇴' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Serbia', flag: '🇷🇸' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Syria', flag: '🇸🇾' },
  { name: 'Taiwan', flag: '🇹🇼' },
  { name: 'Tajikistan', flag: '🇹🇯' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Turkmenistan', flag: '🇹🇲' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Uzbekistan', flag: '🇺🇿' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Yemen', flag: '🇾🇪' },
] as const

export const getCountryFlag = (name: string): string => {
  return COUNTRY_OPTIONS.find((c) => c.name === name)?.flag ?? ''
}
