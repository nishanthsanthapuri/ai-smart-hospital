export default function ChatMessage({ from, text }) {
  const isUser = from === "user";

  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
