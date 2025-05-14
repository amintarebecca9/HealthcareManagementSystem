import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Hospital Management
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Dashboard
            </Link>
            <Link href="/patients" className="text-gray-500 hover:text-gray-700">
              Patients
            </Link>
            <Link href="/appointments" className="text-gray-500 hover:text-gray-700">
              Appointments
            </Link>
            <Link href="/staff" className="text-gray-500 hover:text-gray-700">
              Staff
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
