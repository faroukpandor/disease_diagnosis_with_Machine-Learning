import { create } from 'zustand'

export interface SkillProvider {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  hourlyRate: number
  skills: string[]
  distance: number
  isOnline: boolean
  responseTime: string
  trustScore: number
  completedJobs: number
  description: string
  availability: {
    today: boolean
    thisWeek: boolean
    flexible: boolean
  }
}

interface SkillState {
  providers: SkillProvider[]
  searchResults: SkillProvider[]
  isLoading: boolean
  searchSkills: (query: string, location: { lat: number; lng: number }) => Promise<void>
  getNearbyProviders: (location: { lat: number; lng: number }) => Promise<void>
  getProviderById: (id: string) => SkillProvider | undefined
}

// Mock data
const mockProviders: SkillProvider[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviewCount: 89,
    hourlyRate: 45,
    skills: ['Web Development', 'React', 'Node.js'],
    distance: 0.3,
    isOnline: true,
    responseTime: '~5 min',
    trustScore: 98,
    completedJobs: 156,
    description: 'Full-stack developer with 5+ years experience. Specialized in React and modern web technologies.',
    availability: {
      today: true,
      thisWeek: true,
      flexible: true
    }
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.7,
    reviewCount: 134,
    hourlyRate: 35,
    skills: ['Photography', 'Photo Editing', 'Event Photography'],
    distance: 0.8,
    isOnline: false,
    responseTime: '~15 min',
    trustScore: 92,
    completedJobs: 203,
    description: 'Professional photographer specializing in portraits and events. Available for same-day shoots.',
    availability: {
      today: false,
      thisWeek: true,
      flexible: true
    }
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5.0,
    reviewCount: 67,
    hourlyRate: 25,
    skills: ['Guitar Lessons', 'Music Theory', 'Songwriting'],
    distance: 1.2,
    isOnline: true,
    responseTime: '~2 min',
    trustScore: 96,
    completedJobs: 78,
    description: 'Experienced guitar instructor with classical and contemporary training. All skill levels welcome.',
    availability: {
      today: true,
      thisWeek: true,
      flexible: false
    }
  }
]

export const useSkillStore = create<SkillState>((set, get) => ({
  providers: mockProviders,
  searchResults: [],
  isLoading: false,

  searchSkills: async (query: string, location: { lat: number; lng: number }) => {
    set({ isLoading: true })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const results = mockProviders.filter(provider =>
      provider.skills.some(skill => 
        skill.toLowerCase().includes(query.toLowerCase())
      ) || provider.name.toLowerCase().includes(query.toLowerCase())
    )
    
    set({ searchResults: results, isLoading: false })
  },

  getNearbyProviders: async (location: { lat: number; lng: number }) => {
    set({ isLoading: true })
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Sort by distance and online status
    const nearby = [...mockProviders]
      .sort((a, b) => {
        if (a.isOnline && !b.isOnline) return -1
        if (!a.isOnline && b.isOnline) return 1
        return a.distance - b.distance
      })
    
    set({ providers: nearby, isLoading: false })
  },

  getProviderById: (id: string) => {
    const { providers } = get()
    return providers.find(p => p.id === id)
  }
}))