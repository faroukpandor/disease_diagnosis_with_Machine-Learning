import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useLocationStore } from './stores/locationStore'
import { useAuthStore } from './stores/authStore'

// Components
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Bookings from './pages/Bookings'
import SkillDetail from './pages/SkillDetail'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'

function App() {
  const { requestLocation } = useLocationStore()
  const { user, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
    requestLocation()
  }, [])

  if (!user) {
    return <Auth />
  }

  if (user && !user.onboarded) {
    return <Onboarding />
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/skill/:id" element={<SkillDetail />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </>
  )
}

export default App