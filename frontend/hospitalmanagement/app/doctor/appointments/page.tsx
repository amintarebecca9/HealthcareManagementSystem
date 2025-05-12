"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import DoctorLayout from "@/components/layouts/doctor-layout"
import { CalendarIcon, Clock, Search, PlusCircle, CheckCircle, XCircle } from "lucide-react"

export default function DoctorAppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [appointmentNotes, setAppointmentNotes] = useState("")

  const handleOpenNotesDialog = (appointment) => {
    setSelectedAppointment(appointment)
    setAppointmentNotes(appointment.notes || "")
    setShowNotesDialog(true)
  }

  const handleSaveNotes = () => {
    // In a real app, you would save these notes to your backend
    console.log("Saving notes for appointment:", selectedAppointment?.id, appointmentNotes)
    setShowNotesDialog(false)
  }

  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Michael Brown",
      age: 45,
      reason: "Chest pain",
      status: "checked-in",
      notes: "Patient has history of hypertension",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Emily Davis",
      age: 38,
      reason: "Follow-up",
      status: "scheduled",
      notes: "",
    },
    {
      id: 3,
      time: "11:45 AM",
      patient: "David Wilson",
      age: 52,
      reason: "ECG results",
      status: "scheduled",
      notes: "Review recent ECG findings",
    },
    {
      id: 4,
      time: "02:00 PM",
      patient: "Jennifer Lee",
      age: 29,
      reason: "Consultation",
      status: "scheduled",
      notes: "",
    },
    {
      id: 5,
      time: "03:30 PM",
      patient: "Robert Taylor",
      age: 61,
      reason: "Medication review",
      status: "scheduled",
      notes: "Discuss side effects of current medication",
    },
  ]

  const upcomingAppointments = [
    {
      id: 6,
      date: "Tomorrow",
      time: "10:00 AM",
      patient: "Sarah Johnson",
      age: 42,
      reason: "Blood pressure check",
      status: "confirmed",
      notes: "",
    },
    {
      id: 7,
      date: "Tomorrow",
      time: "02:30 PM",
      patient: "James Wilson",
      age: 55,
      reason: "Post-surgery follow-up",
      status: "confirmed",
      notes: "Check incision healing",
    },
    {
      id: 8,
      date: "Jun 18, 2023",
      time: "09:15 AM",
      patient: "Patricia Moore",
      age: 67,
      reason: "Chest pain",
      status: "confirmed",
      notes: "",
    },
    {
      id: 9,
      date: "Jun 19, 2023",
      time: "11:00 AM",
      patient: "Richard Miller",
      age: 48,
      reason: "ECG results",
      status: "pending",
      notes: "",
    },
  ]

  const pastAppointments = [
    {
      id: 10,
      date: "Yesterday",
      time: "11:30 AM",
      patient: "Thomas Anderson",
      age: 39,
      reason: "Chest pain",
      status: "completed",
      notes: "Prescribed nitroglycerin for angina",
    },
    {
      id: 11,
      date: "Jun 12, 2023",
      time: "09:45 AM",
      patient: "Lisa Roberts",
      age: 51,
      reason: "Follow-up",
      status: "completed",
      notes: "Blood pressure improved, continue current medication",
    },
    {
      id: 12,
      date: "Jun 10, 2023",
      time: "02:15 PM",
      patient: "William Clark",
      age: 63,
      reason: "Medication review",
      status: "completed",
      notes: "Adjusted dosage of lisinopril",
    },
  ]

  const filteredToday = todayAppointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUpcoming = upcomingAppointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPast = pastAppointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DoctorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Appointments</h1>
            <p className="text-gray-500">Manage your patient appointments</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>Create a new appointment for a patient.</DialogDescription>
                </DialogHeader>
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patient">Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="michael-brown">Michael Brown</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                          <SelectItem value="david-wilson">David Wilson</SelectItem>
                          <SelectItem value="jennifer-lee">Jennifer Lee</SelectItem>
                          <SelectItem value="robert-taylor">Robert Taylor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00 AM</SelectItem>
                            <SelectItem value="09:30">09:30 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="10:30">10:30 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="11:30">11:30 AM</SelectItem>
                            <SelectItem value="13:00">01:00 PM</SelectItem>
                            <SelectItem value="13:30">01:30 PM</SelectItem>
                            <SelectItem value="14:00">02:00 PM</SelectItem>
                            <SelectItem value="14:30">02:30 PM</SelectItem>
                            <SelectItem value="15:00">03:00 PM</SelectItem>
                            <SelectItem value="15:30">03:30 PM</SelectItem>
                            <SelectItem value="16:00">04:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input id="reason" placeholder="Reason for appointment" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes or instructions" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-black hover:bg-gray-800">
                      Schedule Appointment
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger value="today" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Today
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Past
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Today's Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredToday.length > 0 ? (
                        filteredToday.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="text-center w-16">
                                <p className="font-medium text-blue-600">{appointment.time}</p>
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-sm text-gray-500">
                                  Age: {appointment.age} • {appointment.reason}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={appointment.status === "checked-in" ? "success" : "default"}>
                                {appointment.status === "checked-in" ? "Checked In" : "Scheduled"}
                              </Badge>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleOpenNotesDialog(appointment)}>
                                  Add Notes
                                </Button>
                                <Button variant="outline" size="sm">
                                  Start Session
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No appointments found for today</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredUpcoming.length > 0 ? (
                        filteredUpcoming.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="text-center w-28">
                                <p className="text-sm text-gray-500">{appointment.date}</p>
                                <p className="font-medium text-blue-600">{appointment.time}</p>
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-sm text-gray-500">
                                  Age: {appointment.age} • {appointment.reason}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={appointment.status === "confirmed" ? "success" : "default"}>
                                {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleOpenNotesDialog(appointment)}>
                                  Add Notes
                                </Button>
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No upcoming appointments found</p>
                        </div>
                      )}
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
                      {filteredPast.length > 0 ? (
                        filteredPast.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="text-center w-28">
                                <p className="text-sm text-gray-500">{appointment.date}</p>
                                <p className="font-medium text-gray-600">{appointment.time}</p>
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <p className="text-sm text-gray-500">
                                  Age: {appointment.age} • {appointment.reason}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                View Notes
                              </Button>
                              <Button variant="outline" size="sm">
                                Schedule Follow-up
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No past appointments found</p>
                        </div>
                      )}
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
                  {date?.getDate() === new Date().getDate() && date?.getMonth() === new Date().getMonth() ? (
                    <div className="space-y-2">
                      {todayAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="p-3 border rounded-md bg-blue-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-sm text-gray-500">
                                {appointment.time} • {appointment.reason}
                              </p>
                            </div>
                            <Badge variant={appointment.status === "checked-in" ? "success" : "default"}>
                              {appointment.status === "checked-in" ? "Checked In" : "Scheduled"}
                            </Badge>
                          </div>
                        </div>
                      ))}
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
                    Schedule New Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Update Office Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Notes</DialogTitle>
            <DialogDescription>
              {selectedAppointment && (
                <span>
                  Patient: {selectedAppointment.patient} • {selectedAppointment.time}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notes">Medical Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter medical notes for this appointment"
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DoctorLayout>
  )
}
