import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";

const ROLES = [
  {
    role: "admin",
    label: "Admin",
    teLabel: "అడ్మిన్",
    email: "admin@visakruthi.demo",
    description: "Full platform access — manage artisans, volunteers, bookings and analytics.",
    teDescription: "పూర్తి యాక్సెస్ — కళాకారులు, వాలంటీర్లు, బుకింగ్స్ మరియు విశ్లేషణలు.",
    icon: "⚙️",
    accent: "text-indigo",
    activeBg: "bg-gradient-to-br from-indigo to-[#0D4975] text-white"
  },
  {
    role: "volunteer",
    label: "Volunteer",
    teLabel: "వాలంటీర్",
    email: "volunteer@visakruthi.demo",
    description: "View your tasks, workshop schedule, and community assignments.",
    teDescription: "మీ పనులు, వర్క్‌షాప్ షెడ్యూల్ మరియు కేటాయింపులు చూడండి.",
    icon: "🤝",
    accent: "text-[#16A366]",
    activeBg: "bg-gradient-to-br from-[#16A366] to-[#0D8A55] text-white"
  },
  {
    role: "artisan",
    label: "Artisan",
    teLabel: "కళాకారుడు",
    email: "artisan@visakruthi.demo",
    description: "Track your bookings, manage your craft profile and visibility.",
    teDescription: "మీ బుకింగ్స్, ప్రొఫైల్ మరియు కళా గుర్తింపు నిర్వహించండి.",
    icon: "🎨",
    accent: "text-terracotta",
    activeBg: "bg-gradient-to-br from-terracotta to-[#F07828] text-white"
  }
];

const detectRole = (email) => {
  if (email.startsWith("admin")) return "admin";
  if (email.startsWith("volunteer")) return "volunteer";
  return "artisan";
};

export default function Login() {
  const { text } = useLanguage();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleRoleSelect = (roleInfo) => {
    setSelectedRole(roleInfo);
    setForm((prev) => ({ ...prev, email: roleInfo.email }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const role = selectedRole?.role || detectRole(form.email);
    window.localStorage.setItem(
      "visakruthiUser",
      JSON.stringify({ email: form.email, role, loggedInAt: new Date().toISOString() })
    );
    setMessage(text("Login successful. Redirecting…", "లాగిన్ విజయవంతమైంది. మారుతోంది…"));
    setTimeout(() => navigate("/dashboard"), 400);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Login", "లాగిన్")}
        title={text("Access your VISAKRUTHI dashboard.", "మీ VISAKRUTHI డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి.")}
        description={text(
          "Select your role to log into the right dashboard.",
          "తగిన డాష్‌బోర్డ్‌లోకి లాగిన్ అవ్వడానికి మీ పాత్రను ఎంచుకోండి."
        )}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {ROLES.map((roleInfo) => {
          const isActive = selectedRole?.role === roleInfo.role;
          return (
            <button
              key={roleInfo.role}
              type="button"
              onClick={() => handleRoleSelect(roleInfo)}
              className={`rounded-[1.6rem] p-6 text-left transition hover:-translate-y-0.5 ${
                isActive ? roleInfo.activeBg + " shadow-xl" : "mesh-border card-surface hover:shadow-lg"
              }`}
            >
              <span className="text-3xl">{roleInfo.icon}</span>
              <p className={`mt-3 font-display text-xl font-bold ${isActive ? "text-white" : roleInfo.accent}`}>
                {text(roleInfo.label, roleInfo.teLabel)}
              </p>
              <p className={`mt-2 text-sm leading-6 ${isActive ? "text-white/85" : "text-ink/65"}`}>
                {text(roleInfo.description, roleInfo.teDescription)}
              </p>
              <p className={`mt-3 font-mono text-xs ${isActive ? "text-white/65" : "text-ink/40"}`}>{roleInfo.email}</p>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="mesh-border card-surface mt-8 rounded-4xl p-8">
        <div className="grid gap-5">
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder={text("Email", "ఈమెయిల్")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none transition focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10"
          />
          <input
            required
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder={text("Password (any value for demo)", "పాస్‌వర్డ్ (డెమోకు ఏదైనా)")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none transition focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10"
          />
        </div>
        <button
          type="submit"
          className="mt-6 rounded-full bg-linear-to-r from-terracotta to-[#F07828] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-terracotta/30 transition hover:-translate-y-0.5"
        >
          {text("Login", "లాగిన్")}
        </button>
        {message ? <p className="mt-4 text-sm font-semibold text-terracotta">{message}</p> : null}
      </form>
    </div>
  );
}
