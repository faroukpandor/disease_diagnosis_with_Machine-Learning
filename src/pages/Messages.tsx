import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, Star } from 'lucide-react'

const Messages: React.FC = () => {
  const conversations = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Perfect! I can start the project tomorrow morning.',
      timestamp: '2 min ago',
      unread: 2,
      isOnline: true,
      skill: 'Web Development'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Thanks for the great photos! Here\'s your payment.',
      timestamp: '1 hour ago',
      unread: 0,
      isOnline: false,
      skill: 'Photography'
    },
    {
      id: '3',
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'What time works best for the guitar lesson?',
      timestamp: '3 hours ago',
      unread: 1,
      isOnline: true,
      skill: 'Guitar Lessons'
    }
  ]

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <div className="text-sm text-gray-600">
          {conversations.filter(c => c.unread > 0).length} unread
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {conversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 ${
                  conversation.isOnline ? 'status-online' : 'status-offline'
                }`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {conversation.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 truncate mb-2">
                  {conversation.lastMessage}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="skill-badge text-xs">
                    {conversation.skill}
                  </span>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Usually replies in ~5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">
            Start connecting with skilled neighbors to begin conversations
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="fixed bottom-24 right-4">
        <button className="w-14 h-14 bg-primary-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Messages