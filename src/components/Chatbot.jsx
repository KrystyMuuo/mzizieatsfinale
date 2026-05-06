import React, { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const quickQuestions = [
    "How do I add items to cart?",
    "How do I pay with M-Pesa?",
    "Do you deliver?",
    "How do I search products?"
  ];
  const [messages, setMessages] = useState([
    { text: "Hi, I am Mzizi Eats assistant. Ask me about products, cart, delivery or payment.", bot: true }
  ]);

  const reply = (text) => {
    const msg = text.toLowerCase();
    if (msg.includes("delivery")) return "We deliver around Nairobi in 1-3 days.";
    if (msg.includes("pay") || msg.includes("mpesa")) return "Use checkout and pay with M-Pesa.";
    if (msg.includes("cart")) return "Click 🛒 My Cart to review items and proceed to checkout.";
    if (msg.includes("product") || msg.includes("search")) return "Use search, categories and sorting above products.";
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help?";
    return "I can help with products, payment, delivery and cart questions.";
  };

  const send = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { text: userText, bot: false }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: reply(userText), bot: true }]);
    }, 300);
  };

  const askQuickQuestion = (question) => {
    setMessages((prev) => [...prev, { text: question, bot: false }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: reply(question), bot: true }]);
    }, 250);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <strong>Mzizi Assistant</strong>
              <div className="chatbot-subtitle">Usually replies instantly</div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>x</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message-row ${m.bot ? "bot" : "user"}`}>
                {m.bot && <span className="message-avatar">🥬</span>}
                <div className={`message-box ${m.bot ? "bot-box" : "user-box"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="quick-questions">
            {quickQuestions.map((q) => (
              <button key={q} type="button" className="quick-chip" onClick={() => askQuickQuestion(q)}>
                {q}
              </button>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type message..."
            />
            <button onClick={send}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
