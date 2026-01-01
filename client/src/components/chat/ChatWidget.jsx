import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import api from "../../api/axios";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { message: text });

      if (res.data.intent === "CONFIRM_APPOINTMENT") {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: res.data.message,
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { from: "bot", text: res.data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="p-3 font-semibold border-b bg-blue-600 text-white">
        AI Assistant
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((m, i) => (
          <ChatMessage key={i} from={m.from} text={m.text} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}
