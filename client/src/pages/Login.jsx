import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";

export default function Login() {
  const { text } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem(
      "visakruthiAdmin",
      JSON.stringify({ email: form.email || "admin@visakruthi.demo", loggedInAt: new Date().toISOString() })
    );
    setMessage(text("Login successful. Redirecting to dashboard.", "లాగిన్ విజయవంతమైంది. డాష్‌బోర్డ్‌కు మారుతోంది."));
    setTimeout(() => navigate("/dashboard"), 400);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Login", "లాగిన్")}
        title={text("Access the VISAKRUTHI dashboard.", "VISAKRUTHI డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి.")}
        description={text(
          "Use this login to move from the public experience into the management dashboard.",
          "పబ్లిక్ అనుభవం నుండి నిర్వహణ డాష్‌బోర్డ్‌కు వెళ్లడానికి ఈ లాగిన్‌ను ఉపయోగించండి."
        )}
      />

      <form onSubmit={handleSubmit} className="mesh-border card-surface mt-12 rounded-[2rem] p-8">
        <div className="grid gap-5">
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder={text("Email", "ఈమెయిల్")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder={text("Password", "పాస్‌వర్డ్")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
        </div>
        <button type="submit" className="mt-6 rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white">
          {text("Login", "లాగిన్")}
        </button>
        {message ? <p className="mt-4 text-sm font-semibold text-terracotta">{message}</p> : null}
      </form>
    </div>
  );
}
