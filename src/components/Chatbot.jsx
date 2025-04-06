import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChat = () => {
    if (isOpen) {
      // Reset chat state when closing
      setMessages([{ text: "Hi! How can I help you today?", sender: "bot" }]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setUserMessage("");

      // Generate bot response
      setTimeout(() => {
        let botResponse = "Sorry, I didn't understand that.";
        if (userMessage.toLowerCase().includes("help")) {
          botResponse = "Sure! How can I assist you?";
        } else if (userMessage.toLowerCase().includes("timings")) {
          botResponse = "Our working hours are 9 AM to 6 PM, Monday to Friday.";
        } else if (userMessage.toLowerCase().includes("contact")) {
          botResponse = "You can reach us at support@example.com.";
        } else if (userMessage.toLowerCase().includes("thanks")) {
          botResponse = "You're welcome! Let me know if there's anything else I can do for you.";
        }  else if (userMessage.toLowerCase().includes("hi")){
          botResponse = "hey good morning kiddo";
        }

        setMessages((prev) => [
          ...prev,
          { text: botResponse, sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-700 text-white p-4 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        {isOpen ? "Close Chat" : "Chat Support"}
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Support Chat</h2>
          </div>
          <div className="p-4 overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded ${
                    msg.sender === "bot" ? "bg-gray-200" : "bg-blue-700 text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="ml-2 bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
