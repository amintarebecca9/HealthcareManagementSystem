import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    email: "admin@hms.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: 2,
    email: "jyothirmai.puram@hms.com",
    password: "doctor123",
    name: "Dr. Jyothirmai Puram",
    role: "doctor",
  },
  {
    id: 3,
    email: "patient@hms.com",
    password: "patient123",
    name: "Supraj Bachawala",
    role: "patient",
  },
]

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

