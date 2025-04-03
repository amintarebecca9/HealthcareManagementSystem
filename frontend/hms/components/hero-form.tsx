"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroForm() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    hospitalName: "",
    email: "",
    phone: "",
    country: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend

    setIsSubmitting(false)
    // Reset form or show success message
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">
        TRY HOSPITAL SOFTWARE
        <br />
        FOR FREE
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <Input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name*"
              value={formData.hospitalName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Work Email*"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone/WhatsApp*"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              type="text"
              name="country"
              placeholder="Country*"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#1a1a2e] hover:bg-[#2a2a4e]" disabled={isSubmitting}>
          {isSubmitting ? "PROCESSING..." : "GET STARTED"}
        </Button>
      </form>
    </div>
  )
}

