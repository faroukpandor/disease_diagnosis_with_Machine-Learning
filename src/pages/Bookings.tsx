import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'requests'>('upcoming')

  const bookings = {
    upcoming: [
      {
        id: '1',
        provider: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        skill: 'Web Development',
        date: '2024-01-15',
        time: '10:00 AM',
        duration: '3 hours',
        rate: 45,
        location: '0.3 miles away',
        status: 'confirmed'
      },
      {
        id: '2',
        provider: 'Emma Thompson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        skill: 'Guitar Lessons',
        date: '2024-01-16',
        time: '2:00 PM',
        duration: '1 hour',
        rate: 25,
        location: '1.2 miles away',
        status: 'pending'
      }
    ],
    past: [
      {
        id: '3',
        provider: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        skill: 'Photography',
        date: '2024-01-10',
        time: '3:00 PM',
        duration: '2 hours',
        rate: 35,
        location: '0.8 miles away',
        status: 'completed',
        rating: 5
      }
    ],
    requests: [
      {
        id: '4',
        client: 'John Smith',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        skill: 'Web Development',
        date: '2024-01-18',
        time: '9:00 AM',
        duration: '4 hours',
        rate: 45,
        message: 'Need help building a React application for my small business.',
        status: 'pending'
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-success-600 bg-success-50'
      case 'pending': return 'text-warning-600 bg-warning-50'
      case 'completed': return 'text-primary-600 bg-primary-50'
      case 'cancelled': return 'text-error-600 bg-error-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: bookings.upcoming.length },
    { key: 'past', label: 'Past', count: bookings.past.length },
    { key: 'requests', label: 'Requests', count: bookings.requests.length },
  ]

  return (
    <div className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.key
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {activeTab === 'upcoming' && bookings.upcoming.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start space-x-3">
              <img
                src={booking.avatar}
                alt={booking.provider}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{booking.provider}</h3>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="skill-badge text-xs mr-2">{booking.skill}</span>
                    <span className="font-medium text-success-600">${booking.rate}/hr</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{booking.time} ({booking.duration})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{booking.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    Message
                  </button>
                  <button className="btn-secondary text-sm py-2 px-4">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {activeTab === 'past' && bookings.past.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start space-x-3">
              <img
                src={booking.avatar}
                alt={booking.provider}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{booking.provider}</h3>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="skill-badge text-xs">{booking.skill}</span>
                    {booking.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-warning-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{booking.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{booking.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    Book Again
                  </button>
                  <button className="btn-secondary text-sm py-2 px-4">
                    Leave Review
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {activeTab === 'requests' && bookings.requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start space-x-3">
              <img
                src={request.avatar}
                alt={request.client}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{request.client}</h3>
                  <span className="text-sm font-medium text-success-600">
                    ${request.rate}/hr
                  </span>
                </div>
                
                <div className="space-y-2">
                  <span className="skill-badge text-xs">{request.skill}</span>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{request.time} ({request.duration})</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    "{request.message}"
                  </p>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    Accept
                  </button>
                  <button className="btn-secondary text-sm py-2 px-4">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty States */}
      {bookings[activeTab].length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} bookings
          </h3>
          <p className="text-gray-600">
            {activeTab === 'upcoming' && 'Your upcoming bookings will appear here'}
            {activeTab === 'past' && 'Your completed bookings will appear here'}
            {activeTab === 'requests' && 'New booking requests will appear here'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Bookings