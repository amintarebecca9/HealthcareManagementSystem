"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
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
import { CalendarIcon, Clock, FileText, PlusCircle } from "lucide-react"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [appointmentData, setAppointmentData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  })

  const handleBookAppointment = (e: React.FormEvent) => {
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
            <h1 className="text-2xl font-bold text-black">My Appointments</h1>
            <p className="text-gray-500">Manage your upcoming and past appointments</p>
          </div>
          <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Past
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Cancelled
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Appointments</CardTitle>
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
                          status: "confirmed",
                          notes: "Regular checkup",
                        },
                        {
                          id: 2,
                          date: "Jun 25, 2023",
                          time: "02:30 PM",
                          doctor: "Dr. Sarah Johnson",
                          department: "Neurology",
                          status: "pending",
                          notes: "Follow-up on medication",
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
                              <p className="text-sm text-gray-500">{appointment.notes}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={appointment.status === "confirmed" ? "success" : "default"}>
                              {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-200 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Past Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          date: "Jun 10, 2023",
                          time: "11:30 AM",
                          doctor: "Dr. John Smith",
                          department: "Cardiology",
                          status: "completed",
                          notes: "Blood pressure check",
                        },
                        {
                          id: 2,
                          date: "May 28, 2023",
                          time: "10:15 AM",
                          doctor: "Dr. Robert Williams",
                          department: "Orthopedics",
                          status: "completed",
                          notes: "Knee pain assessment",
                        },
                        {
                          id: 3,
                          date: "May 15, 2023",
                          time: "09:30 AM",
                          doctor: "Dr. Emily Davis",
                          department: "Primary Care",
                          status: "completed",
                          notes: "Annual physical",
                        },
                      ].map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-center w-28">
                              <p className="text-sm text-gray-500">{appointment.date}</p>
                              <p className="font-medium text-gray-600">{appointment.time}</p>
                            </div>
                            <div>
                              <p className="font-medium">{appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.department}</p>
                              <p className="text-sm text-gray-500">{appointment.notes}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View Summary
                            </Button>
                            <Button variant="outline" size="sm">
                              Book Follow-up
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cancelled">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Cancelled Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          date: "Jun 05, 2023",
                          time: "02:00 PM",
                          doctor: "Dr. Sarah Johnson",
                          department: "Neurology",
                          reason: "Scheduling conflict",
                        },
                      ].map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-center w-28">
                              <p className="text-sm text-gray-500">{appointment.date}</p>
                              <p className="font-medium text-gray-600">{appointment.time}</p>
                            </div>
                            <div>
                              <p className="font-medium">{appointment.doctor}</p>
                              <p className="text-sm text-gray-500">{appointment.department}</p>
                              <p className="text-sm text-gray-500">Reason: {appointment.reason}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Reschedule
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
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

                <div className="mt-4">
                  <h3 className="font-medium mb-2">
                    Appointments on{" "}
                    {date?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </h3>
                  {date?.getDate() === 18 && date?.getMonth() === 5 ? (
                    <div className="p-3 border rounded-md bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dr. John Smith</p>
                          <p className="text-sm text-gray-500">09:00 AM - Cardiology</p>
                        </div>
                        <Badge>Confirmed</Badge>
                      </div>
                    </div>
                  ) : date?.getDate() === 25 && date?.getMonth() === 5 ? (
                    <div className="p-3 border rounded-md bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-gray-500">02:30 PM - Neurology</p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No appointments scheduled for this day.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Book New Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    View Doctor Schedules
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Medical Certificate
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Set Appointment Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  )
}
