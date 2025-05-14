export type Report = {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  type: string;
  result: string;
};

let mockReports: Report[] = [
  { id: 1, patient: "John Doe", doctor: "Alice Smith", date: "2025-05-08", type: "Blood Test", result: "Normal" },
  { id: 2, patient: "Jane Parker", doctor: "Alice Smith", date: "2025-05-07", type: "X-Ray", result: "No issues" },
];

export async function getReports(): Promise<Report[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockReports]), 500));
}

export async function uploadReport(newReport: Omit<Report, "id">): Promise<Report> {
  const report: Report = {
    ...newReport,
    id: Date.now(),
  };
  mockReports.push(report);
  return new Promise((resolve) => setTimeout(() => resolve(report), 500));
}