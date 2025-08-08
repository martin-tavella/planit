"use client"

import { useAuth } from "@/context/AuthContext"
import { User, Bell, Search } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const DashboardNavbar = () => {
  const { user } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <header className="bg-gradient-to-r from-[#1d0c37] to-[#2a1548] border-b border-[#a98af7]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end lg:justify-between h-16">
          
          {/* Greeting Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold text-white">
                {getGreeting()}, {user?.name || "User"}! 👋
              </h1>
              <p className="text-sm text-[#c4b5fd]">
                Ready to organize your day?
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548] transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548] transition-colors duration-300 relative"
            >
              <Bell className="w-5 h-5" />
              {/* Notification dot */}
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1d0c37]"></div> */}
            {/* </Button> */}

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#a98af7] overflow-hidden bg-[#2a1548] flex items-center justify-center transition-all duration-300 hover:border-[#c4b5fd] hover:scale-105">
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-[#a98af7]" />
                  )}
                </div>
                {/* Online status indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1d0c37]"></div>
              </div>
              
              {/* User info - hidden on mobile */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-[#c4b5fd]">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar