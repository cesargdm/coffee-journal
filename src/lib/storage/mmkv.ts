import { MMKV } from 'react-native-mmkv'

// Create MMKV instance for the app
export const storage = new MMKV({
  id: 'coffee-journal-storage',
  encryptionKey: undefined, // Add encryption key if needed for sensitive data
})

// Create storage adapter for Zustand
export const zustandStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name)
    return value ?? null
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value)
  },
  removeItem: (name: string) => {
    storage.delete(name)
  },
}