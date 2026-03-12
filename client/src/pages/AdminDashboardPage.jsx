import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";
import { getAnalytics, getBookings, getVolunteers } from "../services/api";

const stats = [
  { key: "totalArtisans", label: "Total artisans" },
  { key: "totalVolunteers", label: "Total volunteers" },
  { key: "totalBookings", label: "Total bookings" },
  { key: "totalVisitors", label: "Total visitors" }
];

export default function AdminDashboardPage() {
  const { text } = useLanguage();
  const [analytics, setAnalytics] = useState({
    totalArtisans: 0,
    totalVolunteers: 0,
    totalBookings: 0,
    totalVisitors: 0
  });
  const [bookings, setBookings] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    getAnalytics().then(setAnalytics);
    getBookings().then(setBookings);
    getVolunteers().then(setVolunteers);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Admin Dashboard", "అడ్మిన్ డాష్‌బోర్డ్")}
        title={text("Analytics for artisan engagement.", "కళాకారుల భాగస్వామ్యానికి సంబంధించిన విశ్లేషణలు.")}
        description={text(
          "Review artisan engagement, bookings, volunteer participation, and visitor activity from one operational view.",
          "కళాకారుల భాగస్వామ్యం, బుకింగ్స్, వాలంటీర్ పాల్గొనడం, మరియు సందర్శకుల చురుకుదనాన్ని ఒకే నిర్వహణ దృశ్యంలో చూడండి."
        )}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.key} className="mesh-border card-surface rounded-[1.8rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">
              {text(
                item.label,
                {
                  "Total artisans": "మొత్తం కళాకారులు",
                  "Total volunteers": "మొత్తం వాలంటీర్లు",
                  "Total bookings": "మొత్తం బుకింగ్స్",
                  "Total visitors": "మొత్తం సందర్శకులు"
                }[item.label]
              )}
            </p>
            <p className="mt-4 font-display text-5xl font-bold text-indigo">{analytics[item.key]}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="mesh-border card-surface rounded-[1.8rem] p-6">
          <h3 className="font-display text-3xl font-bold text-indigo">{text("Recent Bookings", "ఇటీవలి బుకింగ్స్")}</h3>
          <div className="mt-6 space-y-4">
            {bookings.length ? (
              bookings.slice(0, 5).map((booking, index) => (
                <div key={`${booking.email}-${index}`} className="rounded-2xl bg-white/70 p-4">
                  <p className="font-semibold text-indigo">{booking.visitorName}</p>
                  <p className="text-sm text-ink/70">{booking.packageName}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/70">{text("No bookings yet. Submit one through the workshop page.", "ఇంకా బుకింగ్స్ లేవు. వర్క్‌షాప్ పేజీ ద్వారా ఒకటి పంపండి.")}</p>
            )}
          </div>
        </div>

        <div className="mesh-border card-surface rounded-[1.8rem] p-6">
          <h3 className="font-display text-3xl font-bold text-indigo">{text("Volunteer Leads", "వాలంటీర్ లీడ్స్")}</h3>
          <div className="mt-6 space-y-4">
            {volunteers.length ? (
              volunteers.slice(0, 5).map((volunteer, index) => (
                <div key={`${volunteer.email}-${index}`} className="rounded-2xl bg-white/70 p-4">
                  <p className="font-semibold text-indigo">{volunteer.name}</p>
                  <p className="text-sm text-ink/70">{volunteer.interestArea}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/70">{text("No volunteer registrations yet. Submit one through the volunteer page.", "ఇంకా వాలంటీర్ నమోదులు లేవు. వాలంటీర్ పేజీ ద్వారా ఒకటి పంపండి.")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
