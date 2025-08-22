"use client";

import Link from "next/link";
import logo from "../../../../public/img/logo/planit-only.png";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, CheckSquare, Home, LayoutDashboard, LogOut, Menu, Plus, Settings, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";


interface SidebarItem {
  route: string
  label: string
  icon: React.ReactNode
  action?: () => void
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();


   const sidebarItems: SidebarItem[] = [
    {
      route: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      route: "/tasks",
      label: "My Tasks",
      icon: <CheckSquare className="w-5 h-5" />
    },
    {
      route: "/tasks/create",
      label: "Create Task",
      icon: <Plus className="w-5 h-5" />
    },
    {
      route: "/calendar",
      label: "Calendar",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      route: "/profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />
    },
    {
      route: "/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />
    }
  ]

  useEffect(()=> {
      setIsCollapsed(true)
  }, [])


  const handleLogout = () => {
    logout()
    setIsMobileOpen(false)
  }

  const closeMobile = () => {
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button
      <Button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#a98af7] hover:bg-[#c4b5fd] text-[#1d0c37] p-2"
        size="icon"
      >
        <Menu className="w-5 h-5" />
      </Button> */}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 top-24  z-50
        bg-gradient-to-b from-[#1d0c37] to-[#2a1548] 
        border-r border-[#a98af7]/20
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-30' : 'lg:w-72'}
        w-72 h-screen
        shadow-2xl
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-[#a98af7]/20">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex mx-auto xl:hidden items-center gap-3 group"
              onClick={closeMobile}
            >
                <Image
                  src={logo.src}
                  alt="Planit logo"
                  width={48}
                  height={48}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
            </Link>


            {/* Collapse button for desktop */}
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden xl:flex text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548] p-1
                ${isCollapsed ? 'mx-auto': 'ml-5'}
                
                `}
              variant="ghost"
              size="icon"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.route
              
              return (
                <li key={index}>
                  <Link
                    href={item.route}
                    onClick={closeMobile}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-300 group relative
                      ${isActive 
                        ? 'bg-[#a98af7] text-[#1d0c37] shadow-lg' 
                        : 'text-[#a98af7] hover:bg-[#2a1548] hover:text-[#c4b5fd]'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <div className={`
                      flex-shrink-0 transition-transform duration-300
                      ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    `}>
                      {item.icon}
                    </div>
                    
                    {!isCollapsed && (
                      <span className="font-medium truncate">
                        {item.label}
                      </span>
                    )}

                    {isActive && !isCollapsed && (
                      <div className="absolute right-2 w-2 h-2 bg-[#1d0c37] rounded-full" />
                    )}

                      <div className="absolute left-full ml-2 px-2 py-1 bg-[#1d0c37] text-[#a98af7] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-[#a98af7]/20">
                        {item.label}
                      </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#a98af7]/20">
          {/* Back to Home */}
          <Link
            href="/"
            onClick={closeMobile}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg mb-2
              text-[#a98af7] hover:bg-[#2a1548] hover:text-[#c4b5fd]
              transition-all duration-300 group
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Back to Home</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1d0c37] text-[#a98af7] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-[#a98af7]/20">
                Back to Home
              </div>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-red-400 hover:bg-red-500/10 hover:text-red-300
              transition-all duration-300 group
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1d0c37] text-red-400 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-red-400/20">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Content Spacer for Desktop */}
      {/* <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`} /> */}
    </>
  )
}


export default Sidebar;
