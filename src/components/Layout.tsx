import React from 'react'
import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const hideHeader = ['/auth', '/onboarding'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideHeader && <Header />}
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <BottomNav />
    </div>
  )
}

export default Layout