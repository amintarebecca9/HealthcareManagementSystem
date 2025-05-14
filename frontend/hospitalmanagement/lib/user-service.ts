export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
};

let mockUsers: User[] = [
  { id: 1, name: "John Doe", role: "Patient", email: "john@example.com" },
  { id: 2, name: "Alice Smith", role: "Doctor", email: "alice@example.com" },
  { id: 3, name: "Bob Johnson", role: "Nurse", email: "bob@example.com" },
];

export async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 500));
}

export async function removeUser(userId: number): Promise<void> {
  mockUsers = mockUsers.filter((u) => u.id !== userId);
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
}