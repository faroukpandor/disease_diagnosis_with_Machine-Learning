import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin, Star, Zap } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useLocationStore } from '../stores/locationStore'
import toast from 'react-hot-toast'

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  
  const { updateProfile } = useAuthStore()
  const { requestLocation, location } = useLocationStore()

  const popularSkills = [
    'Web Development', 'Photography', 'Graphic Design', 'Tutoring',
    'Handyman', 'Music Lessons', 'Pet Care', 'Cooking', 'Cleaning',
    'Writing', 'Translation', 'Fitness Training', 'Hair Styling'
  ]

  const steps = [
    {
      title: 'Enable Location',
      subtitle: 'Find skills and services near you',
      icon: MapPin,
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-12 h-12 text-primary-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Share Your Location</h3>
            <p className="text-gray-600">
              We'll help you find skilled neighbors within 2 miles of your location.
              Your exact location is never shared with others.
            </p>
          </div>
          <button
            onClick={requestLocation}
            className="btn-primary w-full"
          >
            Enable Location Access
          </button>
          {location && (
            <div className="text-success-600 text-sm">
              ✓ Location enabled successfully
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Add Your Skills',
      subtitle: 'What services can you offer?',
      icon: Star,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-warning-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Your Talents</h3>
            <p className="text-gray-600">
              Add skills you can offer to your neighbors. You can always update these later.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newSkill.trim()) {
                    setSkills([...skills, newSkill.trim()])
                    setNewSkill('')
                  }
                }}
                className="input-field flex-1"
              />
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    setSkills([...skills, newSkill.trim()])
                    setNewSkill('')
                  }
                }}
                className="btn-primary px-4"
              >
                Add
              </button>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      if (!skills.includes(skill)) {
                        setSkills([...skills, skill])
                      }
                    }}
                    disabled={skills.includes(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      skills.includes(skill)
                        ? 'bg-primary-100 text-primary-700 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {skills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Your skills:</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-badge cursor-pointer"
                      onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                    >
                      {skill} ×
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'You\'re All Set!',
      subtitle: 'Start connecting with your community',
      icon: Zap,
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-12 h-12 text-success-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Welcome to SkillSwap!</h3>
            <p className="text-gray-600">
              You're ready to discover amazing skills in your neighborhood and share your own talents.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary-600">Zero Fees</div>
              <div className="text-gray-600">Keep 100% of earnings</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary-600">Instant Match</div>
              <div className="text-gray-600">AI-powered connections</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-primary-600">Local Focus</div>
              <div className="text-gray-600">2-mile radius only</div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep === 0 && !location) {
      toast.error('Please enable location access to continue')
      return
    }
    
    if (currentStep === 1 && skills.length === 0) {
      toast.error('Please add at least one skill to continue')
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      updateProfile({
        skills,
        location: location || { lat: 0, lng: 0, address: '' },
        onboarded: true
      })
      toast.success('Welcome to SkillSwap!')
    }
  }

  const canProceed = () => {
    if (currentStep === 0) return !!location
    if (currentStep === 1) return skills.length > 0
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <div className="flex-1">
                {steps[currentStep].content}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Onboarding