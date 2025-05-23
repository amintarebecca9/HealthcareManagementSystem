"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  MessageSquare,
  User,
  FilePlus,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function PatientLayout({ children }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { logout, user } = useAuth()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patient/profile", label: "My Profile", icon: User },
    { href: "/patient/appointments", label: "Appointments", icon: Calendar },
    { href: "/patient/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/patient/reports", label: "Medical Reports", icon: FilePlus },
    { href: "/patient/messages", label: "Messages", icon: MessageSquare },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 ${
          isSidebarOpen ? "w-64" : "w-0 md:w-20"
        } transition-all duration-300 overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <Link href="/patient/dashboard" className="flex items-center gap-2">
              {isSidebarOpen ? (
                <>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">HMS</span>
                  </div>
                  <span className="font-bold text-blue-800"></span>
                </>
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">HMS</span>
                </div>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        pathname === item.href ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div 
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span>Logout</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
          <div className="flex-1 flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-black">Patient Portal</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{user?.name?.substring(0, 2) || 'PT'}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.name || 'Patient Name'}</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
