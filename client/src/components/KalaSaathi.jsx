import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { getReply, replySets } from "../services/assistantReplies";

export default function KalaSaathi() {
  const { language, text } = useLanguage();
  const isTelugu = language === "te";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: replySets.en.greeting }]);

  useEffect(() => {
    setMessages((current) =>
      current.length === 1 && current[0]?.role === "assistant"
        ? [{ role: "assistant", text: replySets[isTelugu ? "te" : "en"].greeting }]
        : current
    );
  }, [isTelugu]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();

    setMessages((current) => [
      ...current,
      { role: "user", text: userText },
      { role: "assistant", text: getReply(userText) }
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mesh-border card-surface w-[22rem] rounded-[1.8rem] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-bold text-indigo">{text("KalaSaathi", "కళాసాథి")}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-terracotta">{text("AI Craft Guide", "ఏఐ కళా మార్గదర్శి")}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-xl text-indigo/55">
              x
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl bg-[#fffaf5] p-3 shadow-inner">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "assistant" ? "bg-sand text-indigo shadow-sm" : "bg-indigo text-sand shadow-sm"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && send()}
              placeholder={text("Ask about VISAKRUTHI, crafts, or booking", "VISAKRUTHI, కళలు, లేదా బుకింగ్ గురించి అడగండి")}
              className="flex-1 rounded-full border border-indigo/15 bg-white px-4 py-3 text-sm text-ink outline-none"
            />
            <button type="button" onClick={send} className="rounded-full bg-terracotta px-4 py-3 text-sm font-bold text-white">
              {text("Send", "పంపు")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-indigo px-5 py-4 text-sm font-bold text-sand shadow-lg shadow-indigo/25"
        >
          {text("KalaSaathi", "కళాసాథి")}
        </button>
      )}
    </div>
  );
}
