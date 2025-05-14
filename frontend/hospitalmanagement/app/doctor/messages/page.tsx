"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for patients
const patients = [
  {
    id: 1,
    name: "Michael Brown",
    avatar: "/avatars/01.png",
    lastMessage: "Dr, when should I take the medication?",
    time: "10:42 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/avatars/02.png",
    lastMessage: "Thank you for the prescription",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "David Wilson",
    avatar: "/avatars/03.png",
    lastMessage: "I'm feeling much better now",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/avatars/04.png",
    lastMessage: "When is my next appointment?",
    time: "Monday",
    unread: 1,
  },
  {
    id: 5,
    name: "Robert Miller",
    avatar: "/avatars/05.png",
    lastMessage: "I have a question about my test results",
    time: "Sunday",
    unread: 0,
  },
]

// Mock conversation data
const mockConversation = [
  {
    id: 1,
    sender: "patient",
    message: "Hello Dr. Smith, I've been experiencing some side effects from the medication.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "doctor",
    message: "Hello Michael. What kind of side effects are you experiencing?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "patient",
    message: "I've been feeling dizzy and nauseous after taking the morning dose.",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "doctor",
    message:
      "I see. Try taking the medication after a meal instead of on an empty stomach. This should help reduce the nausea.",
    time: "10:38 AM",
  },
  { id: 5, sender: "patient", message: "Dr, when should I take the medication?", time: "10:42 AM" },
]

export default function DoctorMessagesPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [newMessage, setNewMessage] = useState("")
  const [conversation, setConversation] = useState(mockConversation)

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: conversation.length + 1,
      sender: "doctor",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversation([...conversation, newMsg])
    setNewMessage("")
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Patient List */}
        <Card className="md:col-span-1 h-full">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Your recent conversations</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1 p-2">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                      selectedPatient.id === patient.id
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <Avatar>
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{patient.name}</p>
                        <span className="text-xs text-gray-500">{patient.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{patient.lastMessage}</p>
                    </div>
                    {patient.unread > 0 && (
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{patient.unread}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 h-full flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} alt={selectedPatient.name} />
                <AvatarFallback>
                  {selectedPatient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedPatient.name}</CardTitle>
                <CardDescription>Patient</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-[calc(100vh-380px)] p-4">
              <div className="space-y-4">
                {conversation.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.sender === "doctor" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
