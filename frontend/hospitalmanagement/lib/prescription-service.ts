export type Prescription = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  medication: string;
  status: string;
};

let mockPrescriptions: Prescription[] = [
  { id: 1, patient: "John Doe", doctor: "Alice Smith", date: "2025-05-10", medication: "Amoxicillin 500mg", status: "Issued" },
  { id: 2, patient: "Jane Parker", doctor: "Alice Smith", date: "2025-05-09", medication: "Ibuprofen 200mg", status: "Issued" },
];

export async function getPrescriptions(): Promise<Prescription[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockPrescriptions]), 500));
}

export async function issuePrescription(newPrescription: Omit<Prescription, "id" | "status">): Promise<Prescription> {
  const prescription: Prescription = {
    ...newPrescription,
    id: Date.now(),
    status: "Issued",
  };
  mockPrescriptions.push(prescription);
  return new Promise((resolve) => setTimeout(() => resolve(prescription), 500));
}