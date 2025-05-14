"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import DoctorLayout from "@/components/layouts/doctor-layout"
import { Users, CalendarIcon, FileText, MessageSquare, Clock, MoreHorizontal } from "lucide-react"
import { appointmentService } from "@/lib/api/appointmentService"
import { documentService } from "@/lib/api/documentService"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function DoctorDashboard() {
  const [date, setDate] = useState(new Date())
  const [todayAppointments, setTodayAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [pastAppointments, setPastAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [pendingReports, setPendingReports] = useState(0)
  const [newMessages, setNewMessages] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  // Fetch data on component mount
  useEffect(() => {
    async function loadDashboardData() {
      try {
        // For now, we'll keep using mock data but structure the component
        // to easily switch to real data once the backend integration is complete
        
        // Simulate API calls with setTimeout
        setTimeout(() => {
          // Mock data for now
          setTodayAppointments([
            {
              id: 1,
              time: "09:00 AM",
              patient: "Michael Brown",
              age: 45,
              reason: "Chest pain",
              status: "checked-in",
            },
            {
              id: 2,
              time: "10:30 AM",
              patient: "Emily Davis",
              age: 38,
              reason: "Follow-up",
              status: "scheduled",
            },
            {
              id: 3,
              time: "11:45 AM",
              patient: "David Wilson",
              age: 52,
              reason: "ECG results",
              status: "scheduled",
            },
            {
              id: 4,
              time: "02:00 PM",
              patient: "Jennifer Lee",
              age: 29,
              reason: "Consultation",
              status: "scheduled",
            },
            {
              id: 5,
              time: "03:30 PM",
              patient: "Robert Taylor",
              age: 61,
              reason: "Medication review",
              status: "scheduled",
            },
          ]);
          
          setUpcomingAppointments([
            {
              id: 1,
              date: "Tomorrow",
              time: "10:00 AM",
              patient: "Sarah Johnson",
              age: 42,
              reason: "Blood pressure check",
            },
            {
              id: 2,
              date: "Tomorrow",
              time: "02:30 PM",
              patient: "James Wilson",
              age: 55,
              reason: "Post-surgery follow-up",
            },
            {
              id: 3,
              date: "Jun 18, 2023",
              time: "09:15 AM",
              patient: "Patricia Moore",
              age: 67,
              reason: "Chest pain",
            },
            {
              id: 4,
              date: "Jun 19, 2023",
              time: "11:00 AM",
              patient: "Richard Miller",
              age: 48,
              reason: "ECG results",
            },
          ]);
          
          setPastAppointments([
            {
              id: 1,
              date: "Yesterday",
              time: "11:30 AM",
              patient: "Thomas Anderson",
              age: 39,
              reason: "Chest pain",
            },
            {
              id: 2,
              date: "Jun 12, 2023",
              time: "09:45 AM",
              patient: "Lisa Roberts",
              age: 51,
              reason: "Follow-up",
            },
            {
              id: 3,
              date: "Jun 10, 2023",
              time: "02:15 PM",
              patient: "William Clark",
              age: 63,
              reason: "Medication review",
            },
          ]);
          
          setPatients([
            { id: 1, name: "Michael Brown", age: 45, lastVisit: "Today" },
            { id: 2, name: "Emily Davis", age: 38, lastVisit: "Yesterday" },
            { id: 3, name: "David Wilson", age: 52, lastVisit: "Jun 10, 2023" },
          ]);
          
          setPendingReports(5);
          setNewMessages(3);
          setLoading(false);
        }, 1000);
        
        // This is how we would fetch real data once the backend is ready
        // const todayStart = new Date();
        // todayStart.setHours(0, 0, 0, 0);
        // const todayEnd = new Date();
        // todayEnd.setHours(23, 59, 59, 999);
        
        // const [todayAppts, upcomingAppts, pastAppts, docs] = await Promise.all([
        //   appointmentService.getAppointmentsByDateRange(todayStart.toISOString(), todayEnd.toISOString()),
        //   appointmentService.getAppointmentsByDateRange(todayEnd.toISOString(), null), // future appointments
        //   appointmentService.getAppointmentsByDateRange(null, todayStart.toISOString()), // past appointments
        //   documentService.getUserDocuments()
        // ]);
        
        // setTodayAppointments(todayAppts);
        // setUpcomingAppointments(upcomingAppts);
        // setPastAppointments(pastAppts);
        // setPendingReports(docs.filter(doc => doc.status === 'PENDING').length);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleMessageClick = () => {
    router.push('/doctor/messages');
  };

  if (loading) {
    return (
      <DoctorLayout>
        <div className="p-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Welcome, {user?.name || 'Dr. Jyothirmai Puram'}</h1>
            <p className="text-gray-500">Cardiology Department</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-50">
              <Clock className="mr-2 h-4 w-4" />
              Office Hours
            </Button>
            <Button 
              className="bg-black hover:bg-gray-800 text-white" 
              onClick={handleMessageClick}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                  <p className="text-3xl font-bold">{todayAppointments.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <p className="text-3xl font-bold">{patients.length}</p>
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
                  <p className="text-sm font-medium text-gray-500">Pending Reports</p>
                  <p className="text-3xl font-bold">{pendingReports}</p>
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
                  <p className="text-3xl font-bold">{newMessages}</p>
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
                    <CardDescription>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayAppointments.map((appointment) => (
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

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
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
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
                    <CardDescription>Last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
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
                          <Button variant="outline" size="sm">
                            View Notes
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">Age: {patient.age} • Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}
