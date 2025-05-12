import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  UserRound,
  Calendar,
  CreditCard,
  FileText,
  Briefcase,
  Pill,
  Megaphone,
  Settings,
} from "lucide-react"

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Patients", href: "/patients", active: true },
    { icon: UserRound, label: "Receptions", href: "/receptions" },
    { icon: UserRound, label: "Doctors", href: "/doctors" },
    { icon: Calendar, label: "Appointments", href: "/appointments" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: FileText, label: "Invoices", href: "/invoices" },
    { icon: Briefcase, label: "Services", href: "/services" },
    { icon: Pill, label: "Medicine", href: "/medicine" },
    { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-green-500 flex items-center justify-center text-white font-bold">HMS</div>
          <span className="text-xl font-bold text-green-700"></span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  item.active ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

