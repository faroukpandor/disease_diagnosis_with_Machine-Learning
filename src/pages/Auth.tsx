import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  
  const { login, signup, isLoading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        toast.success('Welcome back!')
      } else {
        await signup(formData.email, formData.password, formData.name)
        toast.success('Account created successfully!')
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join SkillSwap'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Connect with skilled neighbors instantly' 
              : 'Share your skills, earn without fees'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-sm">
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-success-600 font-bold">0%</span>
            </div>
            <span className="text-gray-600">Zero Fees</span>
          </div>
          <div className="text-sm">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-600 font-bold">AI</span>
            </div>
            <span className="text-gray-600">Smart Matching</span>
          </div>
          <div className="text-sm">
            <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-warning-600 font-bold">2mi</span>
            </div>
            <span className="text-gray-600">Hyper Local</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Auth