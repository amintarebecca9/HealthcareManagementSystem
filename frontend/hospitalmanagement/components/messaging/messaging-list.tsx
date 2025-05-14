import { Message } from "@/lib/messaging-service";

interface MessagingListProps {
  messages: Message[];
}

export default function MessagingList({ messages }: MessagingListProps) {
  return (
    <div className="space-y-2">
      {messages.map((msg, index) => (
        <div key={index} className="p-2 bg-gray-100 rounded">
          <p className="font-medium">{msg.sender}</p>
          <p>{msg.text}</p>
          <p className="text-xs text-gray-400">{msg.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
