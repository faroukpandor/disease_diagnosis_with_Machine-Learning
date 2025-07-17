import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Filter, Star, MapPin, Clock } from 'lucide-react'
import { useSkillStore } from '../stores/skillStore'
import { useLocationStore } from '../stores/locationStore'
import { Link } from 'react-router-dom'

const Search: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const { searchResults, isLoading, searchSkills } = useSkillStore()
  const { location } = useLocationStore()

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() && location) {
      await searchSkills(searchQuery, location)
    }
  }

  const filters = {
    availability: ['Available Now', 'Today', 'This Week'],
    priceRange: ['Under $25', '$25-$50', '$50-$100', 'Over $100'],
    rating: ['4.5+ Stars', '4.0+ Stars', '3.5+ Stars'],
    distance: ['Under 0.5mi', '0.5-1mi', '1-2mi', '2+ miles']
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search skills, services, or people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          className="input-field pl-10 pr-12"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2">
        {['Web Development', 'Photography', 'Tutoring', 'Handyman', 'Design'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag)
              handleSearch(tag)
            }}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card space-y-4"
        >
          {Object.entries(filters).map(([category, options]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-2 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    className="px-3 py-1 border border-gray-200 rounded-full text-sm hover:border-primary-500 hover:text-primary-600 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Search Results */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card loading-shimmer h-24"></div>
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">
            {searchResults.length} results found
          </h3>
          {searchResults.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <Link to={`/skill/${provider.id}`} className="block">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 ${
                      provider.isOnline ? 'status-online' : 'status-offline'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-warning-500 fill-current" />
                            <span className="text-sm font-medium ml-1">{provider.rating}</span>
                            <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{provider.distance}mi away</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-success-600">
                          ${provider.hourlyRate}/hr
                        </div>
                        {provider.isOnline && (
                          <div className="flex items-center text-xs text-success-600 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{provider.responseTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {provider.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {provider.skills.map((skill) => (
                        <span key={skill} className="skill-badge text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Search for skills</h3>
          <p className="text-gray-600">Find talented people in your neighborhood</p>
        </div>
      )}
    </div>
  )
}

export default Search