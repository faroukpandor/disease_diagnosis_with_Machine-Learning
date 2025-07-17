import { create } from 'zustand'

interface LocationState {
  location: {
    lat: number
    lng: number
    address: string
  } | null
  isLoading: boolean
  error: string | null
  requestLocation: () => Promise<void>
  setLocation: (location: { lat: number; lng: number; address: string }) => void
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  isLoading: false,
  error: null,

  requestLocation: async () => {
    set({ isLoading: true, error: null })

    if (!navigator.geolocation) {
      set({ error: 'Geolocation not supported', isLoading: false })
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        })
      })

      const { latitude: lat, longitude: lng } = position.coords

      // Reverse geocoding (mock implementation)
      const address = await reverseGeocode(lat, lng)

      set({
        location: { lat, lng, address },
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        error: 'Location access denied',
        isLoading: false
      })
    }
  },

  setLocation: (location) => {
    set({ location, error: null })
  }
}))

// Mock reverse geocoding function
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // In a real app, you'd use a free service like OpenStreetMap Nominatim
  // For demo purposes, return a mock address
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}