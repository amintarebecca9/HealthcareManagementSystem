import { useState } from "react";
interface MessagingFormProps {
  onSend: (content: string) => void;
}

export default function MessagingForm({ onSend }: MessagingFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow border p-2 rounded"
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}
