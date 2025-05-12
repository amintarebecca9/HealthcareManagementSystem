"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import PatientLayout from "@/components/layouts/patient-layout"
import { Calendar, FileText, MessageSquare, MoreHorizontal, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [appointmentData, setAppointmentData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  })

  const handleBookAppointment = (e) => {
    e.preventDefault()
    // In a real app, you would make an API call to book the appointment
    console.log("Booking appointment:", appointmentData)
    setShowAppointmentDialog(false)
    // Reset form
    setAppointmentData({
      doctor: "",
      date: "",
      time: "",
      reason: "",
    })
  }

  return (
    <PatientLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Welcome, Michael Brown</h1>
            <p className="text-gray-500">Patient ID: P-12345</p>
          </div>
          <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
            <DialogTrigger asChild>
              <Link href="/patient/appointments">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </Link>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book an Appointment</DialogTitle>
                <DialogDescription>
                  Fill in the details below to schedule an appointment with a doctor.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBookAppointment}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="doctor">Select Doctor</Label>
                    <Select
                      value={appointmentData.doctor}
                      onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-smith">Dr. John Smith (Cardiology)</SelectItem>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson (Neurology)</SelectItem>
                        <SelectItem value="dr-williams">Dr. Robert Williams (Orthopedics)</SelectItem>
                        <SelectItem value="dr-davis">Dr. Emily Davis (Pediatrics)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Select
                        value={appointmentData.time}
                        onValueChange={(value) => setAppointmentData({ ...appointmentData, time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please describe your symptoms or reason for the appointment"
                      value={appointmentData.reason}
                      onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-black hover:bg-gray-800">
                    Book Appointment
                  </Button>
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
                  <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                  <p className="text-3xl font-bold">2</p>
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
                  <p className="text-sm font-medium text-gray-500">Prescriptions</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Medical Reports</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">New Messages</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger
                  value="appointments"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Appointments
                </TabsTrigger>
                <TabsTrigger
                  value="prescriptions"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Prescriptions
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Medical Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Your Appointments</CardTitle>
                    <CardDescription>Upcoming and past appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          date: "Jun 18, 2023",
                          time: "09:00 AM",
                          doctor: "Dr. John Smith",
                          department: "Cardiology",
                          status: "upcoming",
                        },
                        {
                          id: 2,
                          date: "Jun 25, 2023",
                          time: "02:30 PM",
                          doctor: "Dr. Sarah Johnson",
                          department: "Neurology",
                          status: "upcoming",
                        },
                        {
                          id: 3,
                          date: "Jun 10, 2023",
                          time: "11:30 AM",
                          doctor: "Dr. John Smith",
                          department: "Cardiology",
                          status: "completed",
                        },
                        {
                          id: 4,
                          date: "May 28, 2023",
                          time: "10:15 AM",
                          doctor: "Dr. Robert Williams",
                          department: "Orthopedics",
                          status: "completed",
                        },
                      ].map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-center w-28">
                              <p className="text-sm text-gray-500">{appointment.date}</p>
                              <p className="font-medium text-blue-600">{appointment.time}</p>
                            </div>
                            <div>
                              <p className="font-medium">{appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={appointment.status === "upcoming" ? "default" : "success"}>
                              {appointment.status === "upcoming" ? "Upcoming" : "Completed"}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Your Prescriptions</CardTitle>
                    <CardDescription>Current and past medications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          date: "Jun 10, 2023",
                          medication: "Lisinopril 10mg",
                          instructions: "Take once daily",
                          doctor: "Dr. John Smith",
                          status: "active",
                        },
                        {
                          id: 2,
                          date: "Jun 10, 2023",
                          medication: "Atorvastatin 20mg",
                          instructions: "Take once daily at bedtime",
                          doctor: "Dr. John Smith",
                          status: "active",
                        },
                        {
                          id: 3,
                          date: "May 28, 2023",
                          medication: "Ibuprofen 600mg",
                          instructions: "Take as needed for pain",
                          doctor: "Dr. Robert Williams",
                          status: "expired",
                        },
                      ].map((prescription) => (
                        <div key={prescription.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{prescription.medication}</p>
                            <Badge variant={prescription.status === "active" ? "success" : "outline"}>
                              {prescription.status === "active" ? "Active" : "Expired"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{prescription.instructions}</p>
                          <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Prescribed by: {prescription.doctor}</p>
                            <p className="text-gray-500">Date: {prescription.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Your Medical Reports</CardTitle>
                    <CardDescription>Test results and medical records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          date: "Jun 10, 2023",
                          type: "Blood Test",
                          doctor: "Dr. John Smith",
                          status: "completed",
                        },
                        { id: 2, date: "Jun 10, 2023", type: "ECG", doctor: "Dr. John Smith", status: "completed" },
                        {
                          id: 3,
                          date: "May 28, 2023",
                          type: "X-Ray (Right Knee)",
                          doctor: "Dr. Robert Williams",
                          status: "completed",
                        },
                        {
                          id: 4,
                          date: "May 15, 2023",
                          type: "Annual Physical",
                          doctor: "Dr. Emily Davis",
                          status: "completed",
                        },
                        {
                          id: 5,
                          date: "Apr 22, 2023",
                          type: "Cholesterol Panel",
                          doctor: "Dr. John Smith",
                          status: "completed",
                        },
                      ].map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{report.type}</p>
                            <p className="text-sm text-gray-500">
                              Date: {report.date} • Doctor: {report.doctor}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Report
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, name: "Dr. John Smith", department: "Cardiology", lastVisit: "Jun 10, 2023" },
                    { id: 2, name: "Dr. Robert Williams", department: "Orthopedics", lastVisit: "May 28, 2023" },
                    { id: 3, name: "Dr. Emily Davis", department: "Primary Care", lastVisit: "May 15, 2023" },
                  ].map((doctor) => (
                    <div key={doctor.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{doctor.name.charAt(3)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-500">
                          {doctor.department} • Last visit: {doctor.lastVisit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      from: "Dr. John Smith",
                      message: "Your test results look good. No need for concern.",
                      time: "Yesterday",
                      unread: true,
                    },
                    {
                      id: 2,
                      from: "Appointment Reminder",
                      message: "You have an appointment with Dr. Sarah Johnson on Jun 18, 2023 at 09:00 AM.",
                      time: "2 days ago",
                      unread: false,
                    },
                  ].map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${message.unread ? "bg-blue-50 border border-blue-100" : "border"}`}
                    >
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{message.from}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  ))}
                  <Link href="/patient/messages">
                    <Button variant="outline" className="w-full">
                      View All Messages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  )
}
