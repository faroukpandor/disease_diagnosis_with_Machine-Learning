import React from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, MapPin } from 'lucide-react'
import { useLocationStore } from '../stores/locationStore'
import { useAuthStore } from '../stores/authStore'

const Header: React.FC = () => {
  const location = useLocation()
  const { location: userLocation } = useLocationStore()
  const { user } = useAuthStore()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Discover Skills'
      case '/search': return 'Search'
      case '/profile': return 'Profile'
      case '/messages': return 'Messages'
      case '/bookings': return 'Bookings'
      default: return 'SkillSwap'
    }
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">{getPageTitle()}</h1>
            {userLocation && (
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{userLocation.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
          </button>
          
          {user && (
            <div className="flex items-center space-x-2">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className={user.isOnline ? 'status-online' : 'status-offline'}></div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header