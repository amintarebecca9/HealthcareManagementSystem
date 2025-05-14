"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService } from "./api/authService"

// Define types
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  register: (userData: any) => Promise<any>
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | null>(null)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      return response
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    setUser(null)
    router.push('/login')
  }

  // Register function
  const register = async (userData: any) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}