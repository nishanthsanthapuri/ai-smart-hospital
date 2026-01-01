import { useState } from "react";
import api from "../../api/axios";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await api.post("/ai/chat", {
        message: userMsg.text,
      });

      const aiMsg = {
        role: "ai",
        text: res.data.reply || res.data.answer,
        data: res.data.data || null,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI service unavailable." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 h-[500px] flex flex-col">
      <h2 className="text-lg font-bold mb-2">Hospital AI Assistant</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">AI is thinking...</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={askAI} className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Ask hospital AI..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded">Ask</button>
      </form>
    </div>
  );
}
