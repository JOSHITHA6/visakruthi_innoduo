import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { getAnalytics, getBookings, getVolunteers, getArtisans } from "../services/api";

const TABS = [
  { id: "overview", label: "Overview", te: "అవలోకనం" },
  { id: "volunteers", label: "Volunteers", te: "వాలంటీర్లు" },
  { id: "artisans", label: "Artisans", te: "కళాకారులు" },
  { id: "bookings", label: "Bookings", te: "బుకింగ్స్" }
];

export default function AdminDashboardPage({ user }) {
  const { text } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [analytics, setAnalytics] = useState({ totalArtisans: 0, totalVolunteers: 0, totalBookings: 0, totalVisitors: 0 });
  const [bookings, setBookings] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    getAnalytics().then(setAnalytics);
    getBookings().then(setBookings);
    getVolunteers().then(setVolunteers);
    getArtisans().then(setArtisans);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("visakruthiUser");
    window.localStorage.removeItem("visakruthiAdmin");
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-4xl bg-linear-to-r from-indigo to-[#0D4975] px-8 py-7 text-white shadow-xl shadow-indigo/20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">{text("Admin Dashboard", "అడ్మిన్ డాష్‌బోర్డ్")}</p>
          <h1 className="mt-1 font-display text-3xl font-bold">{text("Platform Overview", "ప్లాట్‌ఫారం సమీక్ష")}</h1>
          <p className="mt-1 text-sm text-white/65">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          {text("Logout", "లాగ్అవుట్")}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { key: "totalArtisans", label: "Artisans", te: "కళాకారులు", color: "text-terracotta", bg: "bg-terracotta/8" },
          { key: "totalVolunteers", label: "Volunteers", te: "వాలంటీర్లు", color: "text-[#16A366]", bg: "bg-[#16A366]/8" },
          { key: "totalBookings", label: "Bookings", te: "బుకింగ్స్", color: "text-gold", bg: "bg-gold/10" },
          { key: "totalVisitors", label: "Visitors", te: "సందర్శకులు", color: "text-indigo", bg: "bg-indigo/6" }
        ].map((item) => (
          <div key={item.key} className="mesh-border card-surface rounded-[1.6rem] p-6">
            <div className={`inline-flex rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-widest ${item.color} ${item.bg}`}>
              {text(item.label, item.te)}
            </div>
            <p className="mt-4 font-display text-5xl font-bold text-indigo">{analytics[item.key]}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 rounded-4xl bg-white/55 p-2 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-terracotta text-white shadow-md shadow-terracotta/25"
                : "bg-white/75 text-indigo hover:bg-sand"
            }`}
          >
            {text(tab.label, tab.te)}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === "overview" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-indigo">{text("Recent Bookings", "ఇటీవలి బుకింగ్స్")}</h3>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                {bookings.length} {text("total", "మొత్తం")}
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {bookings.length ? (
                bookings.slice(0, 5).map((b, i) => (
                  <div key={`${b.email}-${i}`} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
                    <div>
                      <p className="font-semibold text-indigo">{b.visitorName}</p>
                      <p className="text-sm text-ink/60">{b.packageName}</p>
                    </div>
                    <span className="text-sm font-bold text-terracotta">Rs. {b.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink/55">{text("No bookings yet.", "ఇంకా బుకింగ్స్ లేవు.")}</p>
              )}
            </div>
            <button onClick={() => setActiveTab("bookings")} className="mt-4 text-sm font-semibold text-terracotta hover:underline">
              {text("View all →", "అన్నీ చూడండి →")}
            </button>
          </div>

          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-indigo">{text("Recent Volunteers", "ఇటీవలి వాలంటీర్లు")}</h3>
              <span className="rounded-full bg-[#16A366]/12 px-3 py-1 text-xs font-bold text-[#16A366]">
                {volunteers.length} {text("total", "మొత్తం")}
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {volunteers.length ? (
                volunteers.slice(0, 5).map((v, i) => (
                  <div key={`${v.email}-${i}`} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
                    <div>
                      <p className="font-semibold text-indigo">{v.name}</p>
                      <p className="text-sm text-ink/60">{v.interestArea}</p>
                    </div>
                    <span className="rounded-full bg-[#16A366]/12 px-3 py-1 text-xs font-bold text-[#16A366]">
                      {text("Active", "చురుకు")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink/55">{text("No volunteers yet.", "ఇంకా వాలంటీర్లు లేరు.")}</p>
              )}
            </div>
            <button onClick={() => setActiveTab("volunteers")} className="mt-4 text-sm font-semibold text-terracotta hover:underline">
              {text("View all →", "అన్నీ చూడండి →")}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Volunteers */}
      {activeTab === "volunteers" && (
        <div className="mt-6 mesh-border card-surface rounded-[1.8rem] p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-indigo">{text("All Volunteers", "అన్ని వాలంటీర్లు")}</h3>
            <span className="rounded-full bg-[#16A366]/12 px-3 py-1 text-xs font-bold text-[#16A366]">
              {volunteers.length} {text("registered", "నమోదైన")}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {volunteers.length ? (
              volunteers.map((v, i) => (
                <div
                  key={`${v.email}-${i}`}
                  className="grid gap-3 rounded-2xl bg-white/70 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                  <div>
                    <p className="font-semibold text-indigo">{v.name}</p>
                    <p className="text-sm text-ink/60">{v.college}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink/75">{v.email}</p>
                    <p className="text-sm text-ink/55">{v.phone}</p>
                  </div>
                  <span className="self-center rounded-full bg-[#16A366]/12 px-3 py-1 text-xs font-bold text-[#16A366] whitespace-nowrap">
                    {v.interestArea || text("Volunteer", "వాలంటీర్")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/55">
                {text(
                  "No volunteer registrations yet. They appear here once submitted through the volunteer page.",
                  "ఇంకా నమోదులు లేవు. వాలంటీర్ పేజీ ద్వారా పంపిన తర్వాత ఇక్కడ కనిపిస్తాయి."
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab: Artisans */}
      {activeTab === "artisans" && (
        <div className="mt-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-indigo">{text("All Artisans", "అన్ని కళాకారులు")}</h3>
            <span className="rounded-full bg-terracotta/10 px-3 py-1 text-xs font-bold text-terracotta">
              {artisans.length} {text("registered", "నమోదైన")}
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="mesh-border card-surface flex gap-4 rounded-[1.8rem] p-5">
                <img
                  src={artisan.gallery?.[0]}
                  alt={artisan.name}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-terracotta">{artisan.craftType}</p>
                  <h4 className="mt-1 truncate font-display text-xl font-bold text-indigo">{artisan.name}</h4>
                  <p className="text-sm text-ink/60">{artisan.location}</p>
                  <p className="mt-1 text-sm text-ink/50">{artisan.contact?.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Bookings */}
      {activeTab === "bookings" && (
        <div className="mt-6 mesh-border card-surface rounded-[1.8rem] p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-indigo">{text("All Bookings", "అన్ని బుకింగ్స్")}</h3>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
              {bookings.length} {text("total", "మొత్తం")}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {bookings.length ? (
              bookings.map((b, i) => (
                <div
                  key={`${b.email}-${i}`}
                  className="grid gap-3 rounded-2xl bg-white/70 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                  <div>
                    <p className="font-semibold text-indigo">{b.visitorName}</p>
                    <p className="text-sm text-ink/60">{b.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indigo">{b.packageName}</p>
                    <p className="text-sm text-ink/55">
                      {b.date} · {b.groupSize} {text("people", "మంది")}
                    </p>
                  </div>
                  <span className="self-center rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold whitespace-nowrap">
                    Rs. {b.price}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/55">
                {text(
                  "No bookings yet. They appear here once submitted through the workshop page.",
                  "ఇంకా బుకింగ్స్ లేవు. వర్క్‌షాప్ పేజీ ద్వారా పంపిన తర్వాత ఇక్కడ కనిపిస్తాయి."
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
