import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, Zap, TrendingUp } from 'lucide-react'
import { useSkillStore } from '../stores/skillStore'
import { useLocationStore } from '../stores/locationStore'

const Home: React.FC = () => {
  const { providers, isLoading, getNearbyProviders } = useSkillStore()
  const { location } = useLocationStore()

  useEffect(() => {
    if (location) {
      getNearbyProviders(location)
    }
  }, [location])

  const featuredSkills = [
    { name: 'Web Dev', icon: '💻', demand: 'High' },
    { name: 'Photography', icon: '📸', demand: 'Medium' },
    { name: 'Tutoring', icon: '📚', demand: 'High' },
    { name: 'Handyman', icon: '🔧', demand: 'Very High' },
    { name: 'Design', icon: '🎨', demand: 'Medium' },
    { name: 'Music', icon: '🎵', demand: 'Low' },
  ]

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card loading-shimmer h-24"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">Find Skills Instantly</h2>
        <p className="text-primary-100 mb-4">
          Connect with talented neighbors within 2 miles
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            <span>Instant matching</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Zero fees</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Popular Skills</h3>
        <div className="grid grid-cols-3 gap-3">
          {featuredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center py-4 hover:shadow-lg cursor-pointer"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <div className="font-medium text-sm">{skill.name}</div>
              <div className={`text-xs mt-1 ${
                skill.demand === 'Very High' ? 'text-error-600' :
                skill.demand === 'High' ? 'text-warning-600' :
                skill.demand === 'Medium' ? 'text-primary-600' :
                'text-gray-500'
              }`}>
                {skill.demand} demand
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nearby Providers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Available Now</h3>
          <Link to="/search" className="text-primary-600 text-sm font-medium">
            View all
          </Link>
        </div>
        
        <div className="space-y-3">
          {providers.slice(0, 3).map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <Link to={`/skill/${provider.id}`} className="block">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 ${
                      provider.isOnline ? 'status-online' : 'status-offline'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{provider.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{provider.distance}mi</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-warning-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{provider.rating}</span>
                        <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-medium text-success-600">
                        ${provider.hourlyRate}/hr
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-wrap gap-1">
                        {provider.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="skill-badge text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {provider.isOnline && (
                        <div className="flex items-center text-xs text-success-600">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{provider.responseTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home