"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/layouts/admin-layout"
import { Users, UserPlus, Activity, Calendar, Search, MoreHorizontal, PlusCircle } from "lucide-react"

export default function AdminDashboard() {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "doctor",
    department: "",
  })

  const handleAddUser = (e) => {
    e.preventDefault()
    // In a real app, you would make an API call to add the user
    console.log("Adding user:", newUser)
    setShowAddUserDialog(false)
    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "doctor",
      department: "",
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for doctors, patients, or staff members.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newUser.role === "doctor" && (
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newUser.department}
                        onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <p className="text-3xl font-bold">145</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Appointments Today</p>
                  <p className="text-3xl font-bold">32</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Staff</p>
                  <p className="text-3xl font-bold">18</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-4 bg-blue-50">
            <TabsTrigger value="users" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Departments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>All Users</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search users..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Email</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Role</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Department</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: 1,
                            name: "Dr. Jyothirmai Puram",
                            email: "jyothirmai.puram@hms.com",
                            role: "doctor",
                            department: "Cardiology",
                            status: "active",
                          },
                          {
                            id: 2,
                            name: "Dr. Sarah Johnson",
                            email: "sarah.johnson@hms.com",
                            role: "doctor",
                            department: "Neurology",
                            status: "active",
                          },
                          {
                            id: 3,
                            name: "Michael Brown",
                            email: "michael.brown@hms.com",
                            role: "patient",
                            department: "",
                            status: "active",
                          },
                          {
                            id: 4,
                            name: "Emily Davis",
                            email: "emily.davis@hms.com",
                            role: "patient",
                            department: "",
                            status: "inactive",
                          },
                          {
                            id: 5,
                            name: "Robert Wilson",
                            email: "robert.wilson@hms.com",
                            role: "staff",
                            department: "Administration",
                            status: "active",
                          },
                        ].map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  user.role === "doctor" ? "default" : user.role === "patient" ? "secondary" : "outline"
                                }
                              >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{user.department || "-"}</td>
                            <td className="py-3 px-4">
                              <Badge variant={user.status === "active" ? "success" : "destructive"}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Appointments</CardTitle>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Patient</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Doctor</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Date & Time</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: 1,
                            patient: "Michael Brown",
                            doctor: "Dr. John Smith",
                            date: "2023-06-15",
                            time: "09:00 AM",
                            status: "completed",
                          },
                          {
                            id: 2,
                            patient: "Emily Davis",
                            doctor: "Dr. Sarah Johnson",
                            date: "2023-06-15",
                            time: "10:30 AM",
                            status: "scheduled",
                          },
                          {
                            id: 3,
                            patient: "David Wilson",
                            doctor: "Dr. John Smith",
                            date: "2023-06-15",
                            time: "02:00 PM",
                            status: "scheduled",
                          },
                          {
                            id: 4,
                            patient: "Jennifer Lee",
                            doctor: "Dr. Sarah Johnson",
                            date: "2023-06-16",
                            time: "11:00 AM",
                            status: "scheduled",
                          },
                          {
                            id: 5,
                            patient: "Robert Taylor",
                            doctor: "Dr. John Smith",
                            date: "2023-06-16",
                            time: "03:30 PM",
                            status: "cancelled",
                          },
                        ].map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="py-3 px-4">{appointment.patient}</td>
                            <td className="py-3 px-4">{appointment.doctor}</td>
                            <td className="py-3 px-4">
                              {appointment.date} at {appointment.time}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  appointment.status === "completed"
                                    ? "success"
                                    : appointment.status === "scheduled"
                                      ? "default"
                                      : "destructive"
                                }
                              >
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Departments</CardTitle>
                <CardDescription>Manage hospital departments and specialties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "Cardiology", doctors: 5, patients: 28 },
                    { name: "Neurology", doctors: 3, patients: 17 },
                    { name: "Orthopedics", doctors: 4, patients: 22 },
                    { name: "Pediatrics", doctors: 6, patients: 35 },
                    { name: "Psychiatry", doctors: 3, patients: 19 },
                    { name: "Radiology", doctors: 2, patients: 12 },
                  ].map((department, index) => (
                    <Card key={index} className="border shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold mb-2">{department.name}</h3>
                          <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <span>{department.doctors} Doctors</span>
                            <span>{department.patients} Patients</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

