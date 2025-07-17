import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Star, MapPin, Clock, Shield, MessageCircle, 
  Calendar, Award, CheckCircle, Camera, Heart
} from 'lucide-react'
import { useSkillStore } from '../stores/skillStore'
import toast from 'react-hot-toast'

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getProviderById } = useSkillStore()
  
  const provider = getProviderById(id!)

  if (!provider) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Provider not found</h2>
        <button onClick={() => navigate(-1)} className="btn-primary">
          Go Back
        </button>
      </div>
    )
  }

  const handleBooking = () => {
    toast.success('Booking request sent!')
    // In a real app, this would open a booking modal or navigate to booking page
  }

  const handleMessage = () => {
    toast.success('Message sent!')
    navigate('/messages')
  }

  const reviews = [
    {
      id: '1',
      author: 'Alice Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent work! Very professional and delivered exactly what I needed.'
    },
    {
      id: '2',
      author: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50',
      rating: 5,
      date: '1 week ago',
      comment: 'Great communication and high-quality results. Highly recommend!'
    }
  ]

  const portfolio = [
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-gray-900">Provider Details</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Provider Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                provider.isOnline ? 'bg-success-500' : 'bg-gray-400'
              }`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h2>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-warning-500 fill-current" />
                      <span className="font-medium ml-1">{provider.rating}</span>
                      <span className="text-gray-500 ml-1">({provider.reviewCount})</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{provider.distance}mi away</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-error-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-success-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{provider.trustScore}% Trust</span>
                </div>
                <div className="flex items-center text-primary-600">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{provider.completedJobs} jobs</span>
                </div>
                {provider.isOnline && (
                  <div className="flex items-center text-success-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{provider.responseTime}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((skill) => (
                  <span key={skill} className="skill-badge text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing & Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Pricing & Availability</h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-success-600">
              ${provider.hourlyRate}/hour
            </span>
            <div className="text-right">
              <div className="text-sm text-gray-600">Starting rate</div>
              <div className="text-xs text-gray-500">Negotiable for longer projects</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-lg text-center ${
              provider.availability.today ? 'bg-success-50 text-success-700' : 'bg-gray-50 text-gray-500'
            }`}>
              <CheckCircle className={`w-5 h-5 mx-auto mb-1 ${
                provider.availability.today ? 'text-success-500' : 'text-gray-400'
              }`} />
              <div className="text-sm font-medium">Today</div>
            </div>
            <div className={`p-3 rounded-lg text-center ${
              provider.availability.thisWeek ? 'bg-success-50 text-success-700' : 'bg-gray-50 text-gray-500'
            }`}>
              <CheckCircle className={`w-5 h-5 mx-auto mb-1 ${
                provider.availability.thisWeek ? 'text-success-500' : 'text-gray-400'
              }`} />
              <div className="text-sm font-medium">This Week</div>
            </div>
            <div className={`p-3 rounded-lg text-center ${
              provider.availability.flexible ? 'bg-success-50 text-success-700' : 'bg-gray-50 text-gray-500'
            }`}>
              <CheckCircle className={`w-5 h-5 mx-auto mb-1 ${
                provider.availability.flexible ? 'text-success-500' : 'text-gray-400'
              }`} />
              <div className="text-sm font-medium">Flexible</div>
            </div>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-3">About</h3>
          <p className="text-gray-600 leading-relaxed">
            {provider.description}
          </p>
        </motion.div>

        {/* Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Portfolio</h3>
            <button className="text-primary-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {portfolio.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Reviews</h3>
            <button className="text-primary-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start space-x-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{review.author}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-warning-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6">
        <div className="flex space-x-3">
          <button
            onClick={handleMessage}
            className="btn-secondary flex-1 flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </button>
          <button
            onClick={handleBooking}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default SkillDetail