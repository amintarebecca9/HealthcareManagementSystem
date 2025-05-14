"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PatientLayout from "@/components/layouts/patient-layout"
import { Download, FileText, Search, Calendar, BarChart, FileBarChart, FilePlus, Eye } from "lucide-react"

export default function MedicalReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const allReports = [
    {
      id: 1,
      date: "Jun 10, 2023",
      title: "Complete Blood Count (CBC)",
      doctor: "Dr. John Smith",
      department: "Cardiology",
      category: "blood",
      status: "normal",
      fileSize: "1.2 MB",
    },
    {
      id: 2,
      date: "Jun 10, 2023",
      title: "Electrocardiogram (ECG)",
      doctor: "Dr. John Smith",
      department: "Cardiology",
      category: "cardiac",
      status: "abnormal",
      fileSize: "3.5 MB",
    },
    {
      id: 3,
      date: "May 28, 2023",
      title: "X-Ray (Right Knee)",
      doctor: "Dr. Robert Williams",
      department: "Orthopedics",
      category: "imaging",
      status: "normal",
      fileSize: "5.8 MB",
    },
    {
      id: 4,
      date: "May 15, 2023",
      title: "Annual Physical Examination",
      doctor: "Dr. Emily Davis",
      department: "Primary Care",
      category: "general",
      status: "normal",
      fileSize: "2.1 MB",
    },
    {
      id: 5,
      date: "Apr 22, 2023",
      title: "Lipid Panel",
      doctor: "Dr. John Smith",
      department: "Cardiology",
      category: "blood",
      status: "abnormal",
      fileSize: "0.9 MB",
    },
    {
      id: 6,
      date: "Mar 10, 2023",
      title: "MRI (Lumbar Spine)",
      doctor: "Dr. Robert Williams",
      department: "Orthopedics",
      category: "imaging",
      status: "abnormal",
      fileSize: "12.4 MB",
    },
  ]

  const filteredReports = allReports.filter(
    (report) =>
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || report.category === categoryFilter),
  )

  return (
    <PatientLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Medical Reports</h1>
            <p className="text-gray-500">View and download your medical test results and reports</p>
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 bg-blue-50">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All Reports
                </TabsTrigger>
                <TabsTrigger value="abnormal" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Abnormal Results
                </TabsTrigger>
                <TabsTrigger value="recent" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Recent (30 Days)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>All Medical Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                          <div key={report.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                {report.category === "blood" ? (
                                  <FileText className="h-5 w-5 text-red-500 mr-2" />
                                ) : report.category === "imaging" ? (
                                  <FileBarChart className="h-5 w-5 text-purple-500 mr-2" />
                                ) : report.category === "cardiac" ? (
                                  <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                                ) : (
                                  <FilePlus className="h-5 w-5 text-green-500 mr-2" />
                                )}
                                <p className="font-medium">{report.title}</p>
                              </div>
                              <Badge variant={report.status === "normal" ? "success" : "destructive"}>
                                {report.status === "normal" ? "Normal" : "Abnormal"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Date: {report.date}</span>
                              </div>
                              <div>
                                <span>Doctor: {report.doctor}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500">Department: {report.department}</p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download ({report.fileSize})
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No reports found matching your criteria</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="abnormal">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Abnormal Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredReports.filter((r) => r.status === "abnormal").length > 0 ? (
                        filteredReports
                          .filter((r) => r.status === "abnormal")
                          .map((report) => (
                            <div key={report.id} className="p-4 border rounded-lg border-red-100 bg-red-50">
                              <div className="flex justify-between mb-2">
                                <div className="flex items-center">
                                  {report.category === "blood" ? (
                                    <FileText className="h-5 w-5 text-red-500 mr-2" />
                                  ) : report.category === "imaging" ? (
                                    <FileBarChart className="h-5 w-5 text-purple-500 mr-2" />
                                  ) : report.category === "cardiac" ? (
                                    <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                                  ) : (
                                    <FilePlus className="h-5 w-5 text-green-500 mr-2" />
                                  )}
                                  <p className="font-medium">{report.title}</p>
                                </div>
                                <Badge variant="destructive">Abnormal</Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Date: {report.date}</span>
                                </div>
                                <div>
                                  <span>Doctor: {report.doctor}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">Department: {report.department}</p>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download ({report.fileSize})
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No abnormal reports found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recent">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Reports (Last 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredReports.filter((r) => ["Jun 10, 2023", "May 28, 2023"].includes(r.date)).length > 0 ? (
                        filteredReports
                          .filter((r) => ["Jun 10, 2023", "May 28, 2023"].includes(r.date))
                          .map((report) => (
                            <div key={report.id} className="p-4 border rounded-lg">
                              <div className="flex justify-between mb-2">
                                <div className="flex items-center">
                                  {report.category === "blood" ? (
                                    <FileText className="h-5 w-5 text-red-500 mr-2" />
                                  ) : report.category === "imaging" ? (
                                    <FileBarChart className="h-5 w-5 text-purple-500 mr-2" />
                                  ) : report.category === "cardiac" ? (
                                    <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                                  ) : (
                                    <FilePlus className="h-5 w-5 text-green-500 mr-2" />
                                  )}
                                  <p className="font-medium">{report.title}</p>
                                </div>
                                <Badge variant={report.status === "normal" ? "success" : "destructive"}>
                                  {report.status === "normal" ? "Normal" : "Abnormal"}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Date: {report.date}</span>
                                </div>
                                <div>
                                  <span>Doctor: {report.doctor}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">Department: {report.department}</p>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download ({report.fileSize})
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No recent reports found</p>
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
                <CardTitle>Health Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Blood Pressure</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Jun 10, 2023</span>
                        <span className="text-sm font-medium">130/85 mmHg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">May 15, 2023</span>
                        <span className="text-sm font-medium">128/82 mmHg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Apr 22, 2023</span>
                        <span className="text-sm font-medium">135/88 mmHg</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Cholesterol</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Cholesterol</span>
                        <span className="text-sm font-medium">210 mg/dL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">HDL</span>
                        <span className="text-sm font-medium">45 mg/dL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">LDL</span>
                        <span className="text-sm font-medium">140 mg/dL</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <p className="font-medium">Blood Glucose</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fasting</span>
                        <span className="text-sm font-medium">110 mg/dL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">HbA1c</span>
                        <span className="text-sm font-medium">5.8%</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Detailed Health Trends
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-blue-50">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Annual Physical</p>
                        <p className="text-sm text-gray-600">Scheduled for Jul 15, 2023</p>
                        <p className="text-sm text-gray-600">Dr. Emily Davis</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Lipid Panel</p>
                        <p className="text-sm text-gray-600">Due in 3 months</p>
                        <p className="text-sm text-gray-600">Recommended by Dr. John Smith</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Schedule Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Request New Test</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  )
}




