import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/mmkv'

export interface CoffeeLog {
  id: string
  brewMethod: string
  coffeeAmount: number
  waterAmount: number
  grindSize: string
  brewTime: number
  temperature: number
  rating: number
  notes: string
  createdAt: Date
  updatedAt: Date
  // Network sync fields
  syncStatus?: 'pending' | 'synced' | 'failed'
  lastSyncAttempt?: Date
  syncError?: string
}

interface LogStore {
  // State
  logs: CoffeeLog[]
  isLoading: boolean
  error: string | null
  // Network sync state
  isSyncing: boolean
  lastSyncTime: Date | null
  pendingSyncCount: number

  // Actions
  addLog: (log: Omit<CoffeeLog, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLog: (id: string, updates: Partial<CoffeeLog>) => void
  deleteLog: (id: string) => void
  getLog: (id: string) => CoffeeLog | undefined
  getLogs: () => CoffeeLog[]
  
  // Sync actions (placeholders for network implementation)
  syncLogs: () => Promise<void>
  markLogAsSynced: (id: string) => void
  markLogAsSyncFailed: (id: string, error: string) => void
  getPendingSyncLogs: () => CoffeeLog[]
  
  // Utility actions
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export const useLogStore = create<LogStore>()(
  persist(
    (set, get) => ({
      // Initial state
      logs: [],
      isLoading: false,
      error: null,
      isSyncing: false,
      lastSyncTime: null,
      pendingSyncCount: 0,

      // Actions
      addLog: (logData) => {
        const newLog: CoffeeLog = {
          ...logData,
          id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          syncStatus: 'pending',
        }
        
        set((state) => ({
          logs: [newLog, ...state.logs],
          pendingSyncCount: state.pendingSyncCount + 1,
        }))
      },

      updateLog: (id, updates) => {
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === id
              ? {
                  ...log,
                  ...updates,
                  updatedAt: new Date(),
                  syncStatus: 'pending',
                }
              : log
          ),
          pendingSyncCount: state.logs.filter(
            (log) => log.id === id && log.syncStatus !== 'pending'
          ).length > 0
            ? state.pendingSyncCount + 1
            : state.pendingSyncCount,
        }))
      },

      deleteLog: (id) => {
        set((state) => {
          const logToDelete = state.logs.find((log) => log.id === id)
          const wasPending = logToDelete?.syncStatus === 'pending'
          
          return {
            logs: state.logs.filter((log) => log.id !== id),
            pendingSyncCount: wasPending
              ? state.pendingSyncCount - 1
              : state.pendingSyncCount,
          }
        })
      },

      getLog: (id) => {
        return get().logs.find((log) => log.id === id)
      },

      getLogs: () => {
        return get().logs
      },

      // Network sync placeholders
      syncLogs: async () => {
        set({ isSyncing: true, error: null })
        
        try {
          // TODO: Implement actual network sync
          // This is a placeholder for future network implementation
          const pendingLogs = get().getPendingSyncLogs()
          
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000))
          
          // For now, just mark all pending logs as synced
          pendingLogs.forEach((log) => {
            get().markLogAsSynced(log.id)
          })
          
          set({
            isSyncing: false,
            lastSyncTime: new Date(),
            pendingSyncCount: 0,
          })
        } catch (error) {
          set({
            isSyncing: false,
            error: error instanceof Error ? error.message : 'Sync failed',
          })
        }
      },

      markLogAsSynced: (id) => {
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === id
              ? { ...log, syncStatus: 'synced', syncError: undefined }
              : log
          ),
          pendingSyncCount: Math.max(0, state.pendingSyncCount - 1),
        }))
      },

      markLogAsSyncFailed: (id, error) => {
        set((state) => ({
          logs: state.logs.map((log) =>
            log.id === id
              ? {
                  ...log,
                  syncStatus: 'failed',
                  lastSyncAttempt: new Date(),
                  syncError: error,
                }
              : log
          ),
        }))
      },

      getPendingSyncLogs: () => {
        return get().logs.filter(
          (log) => log.syncStatus === 'pending' || log.syncStatus === 'failed'
        )
      },

      // Utility actions
      clearError: () => set({ error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'coffee-logs-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        logs: state.logs,
        lastSyncTime: state.lastSyncTime,
      }),
    }
  )
)