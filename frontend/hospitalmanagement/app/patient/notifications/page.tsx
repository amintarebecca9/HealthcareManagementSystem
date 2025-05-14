"use client";
import { useEffect, useState } from "react";
import { getNotifications, markAllAsRead, Notification } from "@/lib/notification-service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PatientLayout from "@/components/layouts/patient-layout";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    loadNotifications();
  };

  return (
    <PatientLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button onClick={handleMarkAllRead}>Mark all as read</Button>
        </div>
        {notifications.map((n) => (
          <Card key={n.id} className={`p-4 ${n.read ? "opacity-50" : ""}`}>
            <h2 className="font-bold">{n.title}</h2>
            <p>{n.message}</p>
            <p className="text-xs text-gray-400">{n.timestamp}</p>
          </Card>
        ))}
      </div>
    </PatientLayout>
  );
}