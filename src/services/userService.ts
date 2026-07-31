import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase/config.ts'
import type { MemberProfile, MemberFormData } from '../types/index.ts'

const USERS_COLLECTION = 'users'

const profileConverter = {
  toFirestore: (profile: MemberProfile) => {
    const { uid, ...data } = profile
    return data
  },
  fromFirestore: (snapshot: { data: () => Record<string, unknown>; id: string }): MemberProfile => {
    const data = snapshot.data()
    return {
      uid: snapshot.id,
      role: (data.role as 'admin' | 'member') || 'member',
      ign: (data.ign as string) || '',
      discordName: (data.discordName as string) || '',
      email: (data.email as string) || '',
      avatar: (data.avatar as string) || null,
      combatPower: (data.combatPower as number) || 0,
      level: (data.level as number) || 1,
      class: (data.class as string) || '',
      mainWeapon: (data.mainWeapon as string) || '',
      helmet: (data.helmet as string) || '',
      chest: (data.chest as string) || '',
      gloves: (data.gloves as string) || '',
      boots: (data.boots as string) || '',
      accessory: (data.accessory as string) || '',
      notes: (data.notes as string) || '',
      createdAt: (data.createdAt as string) || new Date().toISOString(),
      updatedAt: (data.updatedAt as string) || new Date().toISOString(),
    }
  },
}

export const createMemberProfile = async (
  uid: string,
  data: {
    ign: string
    discordName: string
    email: string
    role?: 'admin' | 'member'
    avatar?: string | null
  },
): Promise<MemberProfile> => {
  const now = new Date().toISOString()
  const profile: MemberProfile = {
    uid,
    role: data.role || 'member',
    ign: data.ign,
    discordName: data.discordName,
    email: data.email,
    avatar: data.avatar || null,
    combatPower: 0,
    level: 1,
    class: '',
    mainWeapon: '',
    helmet: '',
    chest: '',
    gloves: '',
    boots: '',
    accessory: '',
    notes: '',
    createdAt: now,
    updatedAt: now,
  }
  await setDoc(doc(db, USERS_COLLECTION, uid), profile)
  return profile
}

export const getMemberProfile = async (uid: string): Promise<MemberProfile | null> => {
  const docRef = doc(db, USERS_COLLECTION, uid)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return profileConverter.fromFirestore(snapshot)
}

export const getAllMembers = async (): Promise<MemberProfile[]> => {
  const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) =>
    profileConverter.fromFirestore({ data: () => d.data(), id: d.id }),
  )
}

export const updateMemberProfile = async (
  uid: string,
  formData: Partial<MemberFormData>,
  role?: 'admin' | 'member',
): Promise<MemberProfile> => {
  const docRef = doc(db, USERS_COLLECTION, uid)
  const updateData: Record<string, unknown> = {
    ...formData,
    updatedAt: new Date().toISOString(),
  }
  if (role) {
    updateData.role = role
  }
  await updateDoc(docRef, updateData)
  const updated = await getDoc(docRef)
  if (!updated.exists()) throw new Error('Profile not found after update')
  return profileConverter.fromFirestore(updated)
}

export const updateMemberAvatar = async (uid: string, avatarUrl: string): Promise<void> => {
  const docRef = doc(db, USERS_COLLECTION, uid)
  await updateDoc(docRef, {
    avatar: avatarUrl,
    updatedAt: new Date().toISOString(),
  })
}

export const deleteMember = async (uid: string): Promise<void> => {
  await deleteDoc(doc(db, USERS_COLLECTION, uid))
}
