import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config.ts'

export const uploadAvatar = async (
  uid: string,
  file: File,
): Promise<string> => {
  const ext = file.name.split('.').pop()
  const filePath = `avatars/${uid}/avatar.${ext}`
  const storageRef = ref(storage, filePath)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
