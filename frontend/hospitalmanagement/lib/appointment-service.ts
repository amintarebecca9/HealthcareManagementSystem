export type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  status: string;
};

let mockAppointments: Appointment[] = [
  { id: 1, patient: "John Doe", doctor: "Alice Smith", date: "2025-05-12 10:00 AM", status: "Upcoming" },
  { id: 2, patient: "Jane Parker", doctor: "Alice Smith", date: "2025-05-10 2:00 PM", status: "Completed" },
];

export async function getAppointments(): Promise<Appointment[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockAppointments]), 500));
}

export async function cancelAppointment(appointmentId: number): Promise<void> {
  mockAppointments = mockAppointments.map((a) => a.id === appointmentId ? { ...a, status: "Canceled" } : a);
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
}