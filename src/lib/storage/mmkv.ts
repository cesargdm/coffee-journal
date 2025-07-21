import { Platform } from 'react-native'

let storage: any

// Only import MMKV on native platforms
if (Platform.OS !== 'web') {
  const { MMKV } = require('react-native-mmkv')
  storage = new MMKV({
    id: 'coffee-journal-storage',
    encryptionKey: undefined, // Add encryption key if needed for sensitive data
  })
}

// Create storage adapter for Zustand
export const zustandStorage = {
  getItem: (name: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      const value = typeof window !== 'undefined' ? window.localStorage.getItem(name) : null
      return value
    }
    const value = storage?.getString(name)
    return value ?? null
  },
  setItem: (name: string, value: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(name, value)
      }
      return
    }
    storage?.set(name, value)
  },
  removeItem: (name: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(name)
      }
      return
    }
    storage?.delete(name)
  },
}