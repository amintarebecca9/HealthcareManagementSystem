"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import PatientLayout from "@/components/layouts/patient-layout"
import { Download, FileText, Search, Pill, Calendar, Clock, AlertCircle } from "lucide-react"

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const activePrescriptions = [
    {
      id: 1,
      date: "Jun 10, 2023",
      medication: "Lisinopril 10mg",
      instructions: "Take once daily with or without food",
      doctor: "Dr. John Smith",
      refills: 2,
      expiryDate: "Dec 10, 2023",
    },
    {
      id: 2,
      date: "Jun 10, 2023",
      medication: "Atorvastatin 20mg",
      instructions: "Take once daily at bedtime",
      doctor: "Dr. John Smith",
      refills: 5,
      expiryDate: "Dec 10, 2023",
    },
    {
      id: 3,
      date: "May 15, 2023",
      medication: "Metformin 500mg",
      instructions: "Take twice daily with meals",
      doctor: "Dr. Emily Davis",
      refills: 3,
      expiryDate: "Nov 15, 2023",
    },
  ]

  const pastPrescriptions = [
    {
      id: 4,
      date: "Jan 20, 2023",
      medication: "Amoxicillin 500mg",
      instructions: "Take three times daily for 10 days",
      doctor: "Dr. Emily Davis",
      completed: true,
    },
    {
      id: 5,
      date: "Mar 05, 2023",
      medication: "Prednisone 10mg",
      instructions: "Take as directed on the tapering schedule",
      doctor: "Dr. Robert Williams",
      completed: true,
    },
    {
      id: 6,
      date: "Apr 12, 2023",
      medication: "Ibuprofen 600mg",
      instructions: "Take as needed for pain, not to exceed 3 tablets per day",
      doctor: "Dr. Robert Williams",
      completed: true,
    },
  ]

  const filteredActive = activePrescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPast = pastPrescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PatientLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">My Prescriptions</h1>
            <p className="text-gray-500">View and manage your medication prescriptions</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search prescriptions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger value="active" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Active Prescriptions
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Past Prescriptions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Current Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredActive.length > 0 ? (
                        filteredActive.map((prescription) => (
                          <div key={prescription.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Pill className="h-5 w-5 text-blue-500 mr-2" />
                                <p className="font-medium">{prescription.medication}</p>
                              </div>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{prescription.instructions}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Prescribed: {prescription.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Expires: {prescription.expiryDate}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500">Prescribed by: {prescription.doctor}</p>
                              <div className="flex gap-2">
                                <Badge variant="outline">{prescription.refills} refills left</Badge>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No active prescriptions found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Past Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPast.length > 0 ? (
                        filteredPast.map((prescription) => (
                          <div key={prescription.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Pill className="h-5 w-5 text-gray-400 mr-2" />
                                <p className="font-medium">{prescription.medication}</p>
                              </div>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{prescription.instructions}</p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Prescribed: {prescription.date}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <p className="text-sm text-gray-500">Prescribed by: {prescription.doctor}</p>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No past prescriptions found</p>
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
                <CardTitle>Medication Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Morning</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Lisinopril 10mg</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          8:00 AM
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Metformin 500mg</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          With breakfast
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Evening</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Metformin 500mg</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          With dinner
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Atorvastatin 20mg</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Bedtime
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-amber-50">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Refill Needed</p>
                        <p className="text-sm text-gray-600">Lisinopril 10mg - 7 days remaining</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Medication Tips</p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        <span>Take Lisinopril at the same time each day</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        <span>Atorvastatin works best when taken at bedtime</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        <span>Take Metformin with food to reduce stomach upset</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full">Set Medication Reminders</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  )
}
