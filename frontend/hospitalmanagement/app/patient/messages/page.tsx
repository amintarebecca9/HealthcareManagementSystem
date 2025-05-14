"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import PatientLayout from "@/components/layouts/patient-layout"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info, ImageIcon, File } from "lucide-react"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat])

  const contacts = [
    {
      id: 1,
      name: "Dr. John Smith",
      department: "Cardiology",
      status: "online",
      lastMessage: "Your test results look good. No need for concern.",
      time: "10:30 AM",
      unread: 1,
      avatar: "JS",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      department: "Neurology",
      status: "offline",
      lastMessage: "Let me know if you have any questions about your medication.",
      time: "Yesterday",
      unread: 0,
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Dr. Robert Williams",
      department: "Orthopedics",
      status: "online",
      lastMessage: "Your knee is healing well based on the X-ray.",
      time: "Yesterday",
      unread: 0,
      avatar: "RW",
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      department: "Primary Care",
      status: "offline",
      lastMessage: "Don't forget your annual physical next month.",
      time: "Jun 10",
      unread: 0,
      avatar: "ED",
    },
    {
      id: 5,
      name: "Appointment Desk",
      department: "Administration",
      status: "online",
      lastMessage: "Your appointment has been confirmed for June 18.",
      time: "Jun 8",
      unread: 0,
      avatar: "AD",
    },
  ]

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const conversations = {
    1: [
      {
        id: 1,
        sender: "doctor",
        message: "Hello Michael, I've reviewed your recent test results.",
        time: "10:15 AM",
      },
      {
        id: 2,
        sender: "doctor",
        message: "Your blood pressure is slightly elevated, but nothing to be concerned about at this point.",
        time: "10:16 AM",
      },
      {
        id: 3,
        sender: "patient",
        message: "Thank you for checking, Dr. Smith. Should I continue with the same medication?",
        time: "10:20 AM",
      },
      {
        id: 4,
        sender: "doctor",
        message:
          "Yes, please continue with your current medication. Let's monitor your blood pressure for another month.",
        time: "10:22 AM",
      },
      {
        id: 5,
        sender: "doctor",
        message: "I'd like you to keep a log of your daily readings if possible.",
        time: "10:23 AM",
      },
      {
        id: 6,
        sender: "patient",
        message: "I can do that. I'll take readings in the morning and evening.",
        time: "10:25 AM",
      },
      {
        id: 7,
        sender: "doctor",
        message: "Perfect. Your test results look good overall. No need for concern.",
        time: "10:30 AM",
      },
    ],
    2: [
      {
        id: 1,
        sender: "doctor",
        message: "Hello Michael, how are you feeling with the new medication?",
        time: "Yesterday, 2:15 PM",
      },
      {
        id: 2,
        sender: "patient",
        message: "Hi Dr. Johnson, I'm doing well. The headaches have decreased significantly.",
        time: "Yesterday, 2:30 PM",
      },
      {
        id: 3,
        sender: "doctor",
        message: "That's excellent news! Any side effects that you've noticed?",
        time: "Yesterday, 2:32 PM",
      },
      {
        id: 4,
        sender: "patient",
        message: "Just a bit of drowsiness in the first hour after taking it, but it's manageable.",
        time: "Yesterday, 2:35 PM",
      },
      {
        id: 5,
        sender: "doctor",
        message:
          "That's a common side effect and should diminish over time. Let me know if you have any questions about your medication.",
        time: "Yesterday, 2:40 PM",
      },
    ],
    3: [
      {
        id: 1,
        sender: "doctor",
        message: "Hello Michael, I've reviewed your latest X-ray.",
        time: "Yesterday, 10:05 AM",
      },
      {
        id: 2,
        sender: "doctor",
        message: "Your knee is healing well based on the X-ray. The inflammation has reduced significantly.",
        time: "Yesterday, 10:06 AM",
      },
      {
        id: 3,
        sender: "patient",
        message: "That's great to hear! The pain has been much better this week.",
        time: "Yesterday, 10:15 AM",
      },
      {
        id: 4,
        sender: "doctor",
        message: "Excellent. Continue with the prescribed exercises and gradually increase activity as tolerated.",
        time: "Yesterday, 10:20 AM",
      },
      {
        id: 5,
        sender: "patient",
        message: "Will do. When should I schedule a follow-up appointment?",
        time: "Yesterday, 10:25 AM",
      },
      {
        id: 6,
        sender: "doctor",
        message: "Let's plan for a follow-up in 4 weeks. You can schedule it through the appointments section.",
        time: "Yesterday, 10:30 AM",
      },
    ],
    4: [
      {
        id: 1,
        sender: "doctor",
        message: "Hello Michael, just a reminder about your upcoming annual physical.",
        time: "Jun 10, 9:00 AM",
      },
      {
        id: 2,
        sender: "patient",
        message: "Thanks for the reminder, Dr. Davis. I have it on my calendar for July 15th.",
        time: "Jun 10, 9:15 AM",
      },
      {
        id: 3,
        sender: "doctor",
        message: "Perfect. Please remember to fast for 12 hours before your appointment for the blood work.",
        time: "Jun 10, 9:20 AM",
      },
      {
        id: 4,
        sender: "patient",
        message: "I'll make sure to do that. Is there anything else I should prepare?",
        time: "Jun 10, 9:25 AM",
      },
      {
        id: 5,
        sender: "doctor",
        message:
          "Just bring a list of any medications you're currently taking and any health concerns you'd like to discuss.",
        time: "Jun 10, 9:30 AM",
      },
      {
        id: 6,
        sender: "patient",
        message: "Will do. Thank you!",
        time: "Jun 10, 9:35 AM",
      },
      {
        id: 7,
        sender: "doctor",
        message: "Don't forget your annual physical next month. Looking forward to seeing you then!",
        time: "Jun 10, 9:40 AM",
      },
    ],
    5: [
      {
        id: 1,
        sender: "doctor",
        message: "Hello Michael, this is the appointment desk.",
        time: "Jun 8, 11:00 AM",
      },
      {
        id: 2,
        sender: "doctor",
        message: "We're confirming your appointment with Dr. John Smith on June 18, 2023 at 9:00 AM.",
        time: "Jun 8, 11:01 AM",
      },
      {
        id: 3,
        sender: "patient",
        message: "Thank you for confirming. I'll be there.",
        time: "Jun 8, 11:15 AM",
      },
      {
        id: 4,
        sender: "doctor",
        message: "Great! Please arrive 15 minutes early to complete any necessary paperwork.",
        time: "Jun 8, 11:20 AM",
      },
      {
        id: 5,
        sender: "doctor",
        message:
          "Your appointment has been confirmed for June 18. We'll send a reminder 24 hours before your appointment.",
        time: "Jun 8, 11:22 AM",
      },
      {
        id: 6,
        sender: "patient",
        message: "Perfect, thank you!",
        time: "Jun 8, 11:30 AM",
      },
    ],
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    // In a real app, you would send this to your backend
    console.log("Sending message:", message)

    // Clear the input
    setMessage("")
  }

  return (
    <PatientLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-full md:w-80 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  activeChat === contact.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{contact.avatar}</AvatarFallback>
                    </Avatar>
                    {contact.status === "online" && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.department}</p>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat header */}
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{contacts.find((c) => c.id === activeChat)?.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{contacts.find((c) => c.id === activeChat)?.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{contacts.find((c) => c.id === activeChat)?.department}</span>
                  {contacts.find((c) => c.id === activeChat)?.status === "online" ? (
                    <Badge variant="outline" className="text-green-500 border-green-200 text-xs">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 border-gray-200 text-xs">
                      Offline
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {conversations[activeChat]?.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === "patient" ? "bg-black text-white" : "bg-white border"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "patient" ? "text-gray-300" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <ImageIcon className="h-3 w-3 mr-1" />
                Send Image
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <File className="h-3 w-3 mr-1" />
                Send File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  )
}
