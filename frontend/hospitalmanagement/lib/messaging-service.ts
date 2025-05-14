export type Message = {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
};

let mockMessages: Message[] = [
  { id: 1, sender: 'Patient', text: 'Hello doctor, can I schedule a checkup?', timestamp: '2024-05-01 09:00' },
  { id: 2, sender: 'Doctor', text: 'Sure, let’s discuss your availability.', timestamp: '2024-05-01 09:05' },
];

export async function getMessages(): Promise<Message[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...mockMessages]), 500));
}

export async function sendMessage(newMessage: string, sender: string): Promise<Message> {
  const message: Message = {
    id: Date.now(),
    sender,
    text: newMessage,
    timestamp: new Date().toISOString(),
  };
  mockMessages.push(message);
  return new Promise((resolve) => setTimeout(() => resolve(message), 300));
}