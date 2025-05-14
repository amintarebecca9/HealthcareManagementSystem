import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">HMS</span>
            </div>
            <span className="font-bold text-xl text-blue-800"></span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </header>

        <main className="py-12">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Modern Healthcare Management System</h1>
              <p className="text-lg text-gray-600 mb-8">
                Streamline your healthcare facility with our comprehensive management system. Connect doctors and
                patients seamlessly for better care.
              </p>
              <div className="flex gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&h=400&auto=format&fit=crop"
                alt="Modern hospital building"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Designed for Everyone in Healthcare</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides specialized interfaces for administrators, doctors, and patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">For Administrators</h3>
                <p className="text-gray-600 text-center">
                  Manage staff, monitor operations, and oversee the entire healthcare facility from a centralized
                  dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">For Doctors</h3>
                <p className="text-gray-600 text-center">
                  Manage appointments, access patient records, issue prescriptions, and communicate with patients
                  efficiently.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">For Patients</h3>
                <p className="text-gray-600 text-center">
                  Book appointments, view medical records, access prescriptions, and communicate with healthcare
                  providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">HMS</span>
              </div>
              <span className="font-bold text-blue-800"></span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
