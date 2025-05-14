"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
import { Search, Pill, PlusCircle, FileText, Calendar, Clock, Download } from "lucide-react"

export default function DoctorPrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false)
  const [prescriptionData, setPrescriptionData] = useState({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    refills: "0",
  })

  const handleCreatePrescription = (e) => {
    e.preventDefault()
    // In a real app, you would make an API call to create the prescription
    console.log("Creating prescription:", prescriptionData)
    setShowPrescriptionDialog(false)
    // Reset form
    setPrescriptionData({
      patient: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      refills: "0",
    })
  }

  const activePrescriptions = [
    {
      id: 1,
      date: "Jun 10, 2023",
      patient: "Michael Brown",
      age: 45,
      medication: "Lisinopril 10mg",
      instructions: "Take once daily with or without food",
      refills: 2,
      expiryDate: "Dec 10, 2023",
    },
    {
      id: 2,
      date: "Jun 10, 2023",
      patient: "Michael Brown",
      age: 45,
      medication: "Atorvastatin 20mg",
      instructions: "Take once daily at bedtime",
      refills: 5,
      expiryDate: "Dec 10, 2023",
    },
    {
      id: 3,
      date: "May 15, 2023",
      patient: "Emily Davis",
      age: 38,
      medication: "Metformin 500mg",
      instructions: "Take twice daily with meals",
      refills: 3,
      expiryDate: "Nov 15, 2023",
    },
    {
      id: 4,
      date: "Jun 12, 2023",
      patient: "David Wilson",
      age: 52,
      medication: "Amlodipine 5mg",
      instructions: "Take once daily",
      refills: 2,
      expiryDate: "Dec 12, 2023",
    },
  ]

  const pastPrescriptions = [
    {
      id: 5,
      date: "Jan 20, 2023",
      patient: "Jennifer Lee",
      age: 29,
      medication: "Amoxicillin 500mg",
      instructions: "Take three times daily for 10 days",
      completed: true,
    },
    {
      id: 6,
      date: "Mar 05, 2023",
      patient: "Robert Taylor",
      age: 61,
      medication: "Prednisone 10mg",
      instructions: "Take as directed on the tapering schedule",
      completed: true,
    },
    {
      id: 7,
      date: "Apr 12, 2023",
      patient: "Thomas Anderson",
      age: 39,
      medication: "Ibuprofen 600mg",
      instructions: "Take as needed for pain, not to exceed 3 tablets per day",
      completed: true,
    },
  ]

  const filteredActive = activePrescriptions.filter(
    (prescription) =>
      prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPast = pastPrescriptions.filter(
    (prescription) =>
      prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DoctorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Prescriptions</h1>
            <p className="text-gray-500">Manage patient prescriptions</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                  <DialogDescription>Fill in the details to create a new prescription for a patient.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreatePrescription}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patient">Patient</Label>
                      <Select
                        value={prescriptionData.patient}
                        onValueChange={(value) => setPrescriptionData({ ...prescriptionData, patient: value })}
                      >
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
                    <div className="grid gap-2">
                      <Label htmlFor="medication">Medication</Label>
                      <Input
                        id="medication"
                        placeholder="Medication name and strength"
                        value={prescriptionData.medication}
                        onChange={(e) => setPrescriptionData({ ...prescriptionData, medication: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          placeholder="e.g., 1 tablet"
                          value={prescriptionData.dosage}
                          onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input
                          id="frequency"
                          placeholder="e.g., twice daily"
                          value={prescriptionData.frequency}
                          onChange={(e) => setPrescriptionData({ ...prescriptionData, frequency: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 30 days"
                          value={prescriptionData.duration}
                          onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="refills">Refills</Label>
                        <Select
                          value={prescriptionData.refills}
                          onValueChange={(value) => setPrescriptionData({ ...prescriptionData, refills: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select refills" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instructions">Special Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Additional instructions for the patient"
                        value={prescriptionData.instructions}
                        onChange={(e) => setPrescriptionData({ ...prescriptionData, instructions: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-black hover:bg-gray-800">
                      Create Prescription
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                              <p className="text-sm font-medium">
                                Patient: {prescription.patient} (Age: {prescription.age})
                              </p>
                              <div className="flex gap-2">
                                <Badge variant="outline">{prescription.refills} refills left</Badge>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Print
                                </Button>
                                <Button variant="outline" size="sm">
                                  Edit
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
                                <p className="text-sm font-medium">
                                  Patient: {prescription.patient} (Age: {prescription.age})
                                </p>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Print
                                </Button>
                                <Button variant="outline" size="sm">
                                  Renew
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
                <CardTitle>Common Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Cardiovascular</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Lisinopril 10mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Atorvastatin 20mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Metoprolol 25mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Pain Management</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Ibuprofen 600mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Acetaminophen 500mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Antibiotics</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Amoxicillin 500mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Azithromycin 250mg</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prescription Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Hypertension Protocol</p>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Standard protocol for hypertension treatment</p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Cholesterol Management</p>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Protocol for managing high cholesterol</p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Antibiotic Course</p>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Standard 10-day antibiotic course</p>
                  </div>

                  <Button className="w-full">Manage Templates</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}


