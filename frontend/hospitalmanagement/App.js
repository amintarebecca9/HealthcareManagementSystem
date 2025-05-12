"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Import your layouts
import AdminLayout from "@/components/layouts/admin-layout"
import DoctorLayout from "@/components/layouts/doctor-layout"
import PatientLayout from "@/components/layouts/patient-layout"

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  // Simulated authentication check
  useEffect(() => {
    // Check if user is logged in (could be from localStorage, cookies, etc.)
    const checkAuth = () => {
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        setIsAuthenticated(true)
        setUserRole(userData.role)
      } else {
        setIsAuthenticated(false)
        setUserRole(null)
      }
    }

    checkAuth()
  }, [pathname])

  // Protected routes
  const protectedRoutes = ["/admin/dashboard", "/doctor/dashboard", "/patient/dashboard"]

  // Public routes
  const publicRoutes = ["/", "/login", "/register"]

  // Redirect logic
  useEffect(() => {
    // If trying to access protected route without auth, redirect to login
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
      router.push("/login")
    }

    // If authenticated user tries to access login/register, redirect to their dashboard
    if (isAuthenticated && publicRoutes.some((route) => pathname === route) && userRole) {
      router.push(`/${userRole}/dashboard`)
    }
  }, [isAuthenticated, pathname, router, userRole])

  // Mock patient data (preserved from patients page)
  const patientData = [
    {
      id: 1,
      name: "Supraj Bachawala",
      phone: "+1 234 567 890",
      created: new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      gender: "Male",
      bloodGroup: "A+",
      age: 25,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    // Other patients can be added here if needed
  ]

  // Apply the appropriate layout based on the route
  if (pathname.startsWith("/admin")) {
    return (
      <AdminLayout>
        <Component {...pageProps} patientData={patientData} />
      </AdminLayout>
    )
  }

  if (pathname.startsWith("/doctor")) {
    return (
      <DoctorLayout>
        <Component {...pageProps} patientData={patientData} />
      </DoctorLayout>
    )
  }

  if (pathname.startsWith("/patient")) {
    return (
      <PatientLayout>
        <Component {...pageProps} patientData={patientData} />
      </PatientLayout>
    )
  }

  // Default layout for public pages
  return <Component {...pageProps} />
}
