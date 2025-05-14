"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, PlusCircle, Upload } from "lucide-react"

export default function DoctorReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportData, setReportData] = useState({
    patient: "",
    reportType: "",
    date: "",
    notes: "",
    status: "normal",
  })

  const handleCreateReport = (e) => {
    e.preventDefault()
    // In a real app, you would make an API call to create the report
    console.log("Creating report:", reportData)
    setShowReportDialog(false)
    // Reset form
    setReportData({
      patient: "",
      reportType: "",
      date: "",
      notes: "",
      status: "normal",
    })
  }

  const allReports = [
    {
      id: 1,
      date: "Jun 10, 2023",
      title: "Complete Blood Count (CBC)",
      patient: "Michael Brown",
      age: 45,
      department: "Cardiology",
      category: "blood",
      status: "normal",
      fileSize: "1.2 MB",
    },
    {
      id: 2,
      date: "Jun 10, 2023",
      title: "Electrocardiogram (ECG)",
      patient: "Michael Brown",
      age: 45,
      department: "Cardiology",
      category: "cardiac",
      status: "abnormal",
      fileSize: "3.5 MB",
    },
    {
      id: 3,
      date: "May 28, 2023",
      title: "X-Ray (Right Knee)",
      patient: "David Wilson",
      age: 52,
      department: "Orthopedics",
      category: "imaging",
      status: "normal",
      fileSize: "5.8 MB",
    },
    {
      id: 4,
      date: "May 15, 2023",
      title: "Annual Physical Examination",
      patient: "Emily Davis",
      age: 38,
      department: "Primary Care",
      category: "general",
      status: "normal",
      fileSize: "2.1 MB",
    },
    {
      id: 5,
      date: "Apr 22, 2023",
      title: "Lipid Panel",
      patient: "Michael Brown",
      age: 45,
      department: "Cardiology",
      category: "blood",
      status: "abnormal",
      fileSize: "0.9 MB",
    },
    {
      id: 6,
      date: "Mar 10, 2023",
      title: "MRI (Lumbar Spine)",
      patient: "Robert Taylor",
      age: 61,
      department: "Orthopedics",
      category: "imaging",
      status: "abnormal",
      fileSize: "12.4 MB",
    },
  ]

  const filteredReports = allReports.filter(
    (report) =>
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.patient.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || report.category === categoryFilter)
  )

  return (
    <DoctorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Medical Reports</h1>
            <p className="text-gray-500">Manage and review patient medical reports</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="blood">Blood Tests</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="cardiac">Cardiac</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Medical Report</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new medical report for a patient.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateReport}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patient">Patient</Label>
                      <Select
                        value={reportData.patient}
                        onValueChange={(value) => setReportData({ ...reportData, patient: value })}
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
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select
                        value={reportData.reportType}
                        onValueChange={(value) => setReportData({ ...reportData, reportType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blood-test">Blood Test</SelectItem>
                          <SelectItem value="ecg">Electrocardiogram (ECG)</SelectItem>
                          <SelectItem value="x-ray">X-Ray</SelectItem>
                          <SelectItem value="mri">MRI</SelectItem>
                          <SelectItem value="ct-scan">CT Scan</SelectItem>
                          <SelectItem value="physical">Physical Examination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={reportData.date}
                          onChange={(e) => setReportData({ ...reportData, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={reportData.status}
                          onValueChange={(value) => setReportData({ ...reportData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="abnormal">Abnormal</SelectItem>
                            <SelectItem value="pending">Pending Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Enter report findings and notes"
                        value={reportData.notes}
                        onChange={(e) => setReportData({ ...reportData, notes: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="file">Upload Report File</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Supports PDF, JPEG, PNG (Max 10MB)
                        </p>
                        <Input id="file" type="file" className="hidden" />
                        <Button variant="outline" size="sm" className="mt-4">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-black hover:bg-gray-800">
                      Create Report
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  All Reports
                </TabsTrigger>
                <TabsTrigger
                  value="abnormal"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Abnormal Results
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Recent (30 Days)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle

\

