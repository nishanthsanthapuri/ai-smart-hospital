import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border rounded px-3 py-2 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
