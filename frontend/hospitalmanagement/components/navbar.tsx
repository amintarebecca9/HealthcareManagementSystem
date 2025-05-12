"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-[#1a1a2e] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#1a1a2e] font-bold">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">HOSPITAL</span>
              <span className="text-xs leading-tight">MANAGEMENT SYSTEM</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              Solutions
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              On-Premise
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              Partners
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300">
              Company
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-white text-[#1a1a2e] hover:bg-gray-200">TRY FOR FREE</Button>
          </div>

          <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1a2e] pb-6 px-4">
          <nav className="flex flex-col gap-4">
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              Solutions
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              On-Premise
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              Partners
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-300 py-2">
              Company
            </Link>
            <Button className="bg-white text-[#1a1a2e] hover:bg-gray-200 w-full mt-2">TRY FOR FREE</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
