import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StaffOverview() {
  const staffStats = [
    { title: "Doctors", count: 25 },
    { title: "Nurses", count: 50 },
    { title: "Admin Staff", count: 15 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {staffStats.map((stat) => (
            <div key={stat.title} className="text-center">
              <h3 className="text-2xl font-bold">{stat.count}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
