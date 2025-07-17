import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  skills: string[]
  rating: number
  reviewCount: number
  location: {
    lat: number
    lng: number
    address: string
  }
  onboarded: boolean
  isOnline: boolean
  lastSeen: Date
  trustScore: number
  completedJobs: number
}

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '1',
          email,
          name: 'John Doe',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          skills: ['Web Development', 'Photography', 'Guitar Lessons'],
          rating: 4.8,
          reviewCount: 127,
          location: {
            lat: 40.7128,
            lng: -74.0060,
            address: 'New York, NY'
          },
          onboarded: true,
          isOnline: true,
          lastSeen: new Date(),
          trustScore: 95,
          completedJobs: 89
        }
        
        set({ user: mockUser, isLoading: false })
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          skills: [],
          rating: 0,
          reviewCount: 0,
          location: {
            lat: 0,
            lng: 0,
            address: ''
          },
          onboarded: false,
          isOnline: true,
          lastSeen: new Date(),
          trustScore: 50,
          completedJobs: 0
        }
        
        set({ user: newUser, isLoading: false })
      },

      logout: () => {
        set({ user: null })
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...updates } })
        }
      },

      checkAuth: () => {
        // Check if user session is valid
        const { user } = get()
        if (user) {
          set({ user: { ...user, isOnline: true, lastSeen: new Date() } })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)