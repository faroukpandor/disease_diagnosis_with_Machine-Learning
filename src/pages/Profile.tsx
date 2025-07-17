import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Award, Settings, LogOut, Edit } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore()

  if (!user) return null

  const stats = [
    { label: 'Trust Score', value: user.trustScore, suffix: '/100', color: 'text-success-600' },
    { label: 'Jobs Completed', value: user.completedJobs, suffix: '', color: 'text-primary-600' },
    { label: 'Response Time', value: '5', suffix: ' min avg', color: 'text-warning-600' },
    { label: 'Rating', value: user.rating, suffix: '/5.0', color: 'text-warning-600' },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center"
      >
        <div className="relative inline-block mb-4">
          <img
            src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
            user.isOnline ? 'bg-success-500' : 'bg-gray-400'
          }`}></div>
          <button className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white">
            <Edit className="w-3 h-3" />
          </button>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
        <div className="flex items-center justify-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user.location.address}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-warning-500 fill-current mr-1" />
            <span className="font-medium">{user.rating}</span>
            <span className="text-gray-500 ml-1">({user.reviewCount} reviews)</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center text-success-600">
            <Award className="w-4 h-4 mr-1" />
            <span className="font-medium">{user.trustScore}% Trust</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {user.skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center"
          >
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Completed web development project', time: '2 hours ago', type: 'success' },
            { action: 'Received 5-star review from Mike', time: '1 day ago', type: 'rating' },
            { action: 'New booking request received', time: '2 days ago', type: 'booking' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-success-500' :
                activity.type === 'rating' ? 'bg-warning-500' :
                'bg-primary-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-gray-600 mr-3" />
            <span className="font-medium text-gray-900">Settings</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all text-error-600"
        >
          <div className="flex items-center">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  )
}

export default Profile