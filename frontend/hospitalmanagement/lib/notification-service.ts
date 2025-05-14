export type Notification = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

let mockNotifications: Notification[] = [
  { id: 1, title: "Appointment Reminder", message: "You have an appointment tomorrow at 10 AM.", timestamp: "2025-05-11 10:00", read: false },
  { id: 2, title: "Prescription Ready", message: "Your prescription is ready to be collected.", timestamp: "2025-05-10 15:00", read: false },
  { id: 3, title: "Lab Result Available", message: "Your lab results are available.", timestamp: "2025-05-09 12:00", read: true },
];

export async function getNotifications(): Promise<Notification[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockNotifications]), 500));
}

export async function markAllAsRead(): Promise<void> {
  mockNotifications = mockNotifications.map((n) => ({ ...n, read: true }));
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
}