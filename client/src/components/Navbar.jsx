import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 transition ${
    isActive ? "bg-[#f3d2bb] text-[#7b3f24]" : "text-white hover:bg-white/14 hover:text-white"
  }`;

export default function Navbar() {
  const { language, toggleLanguage, text } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-[#8c4f30] bg-[#8a4f32] shadow-md shadow-[#8a4f32]/20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3 rounded-full pr-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8efe5] text-lg font-extrabold text-[#7b3f24] shadow-md shadow-black/10">
            V
          </div>
          <div>
            <p className="font-display text-[1.55rem] font-bold leading-none text-white">VISAKRUTHI</p>
            <p className="pt-1 text-[11px] uppercase tracking-[0.3em] text-[#f4cfaa]">{text("Crafts of Vizag", "వైజాగ్ కళలు")}</p>
          </div>
        </Link>

        <nav className="order-3 flex w-full items-center gap-2 overflow-x-auto rounded-full border border-white/14 bg-white/10 p-2 text-sm font-semibold md:order-2 md:w-auto">
          <NavLink to="/" className={linkClass}>
            {text("Home", "హోమ్")}
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            {text("About", "గురించి")}
          </NavLink>
          <NavLink to="/explore" className={linkClass}>
            {text("Explore Crafts", "కళలు")}
          </NavLink>
          <NavLink to="/workshops" className={linkClass}>
            {text("Workshops", "వర్క్‌షాప్స్")}
          </NavLink>
          <NavLink to="/volunteer" className={linkClass}>
            {text("Volunteer", "వాలంటీర్")}
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            {text("Login", "లాగిన్")}
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            {text("Dashboard", "డాష్‌బోర్డ్")}
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={toggleLanguage}
          className="order-2 rounded-full border border-white/18 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:border-[#f4cfaa] hover:bg-white/16 hover:text-[#f4cfaa] md:order-3"
        >
          {language === "en" ? "English / తెలుగు" : "తెలుగు / English"}
        </button>
      </div>
    </header>
  );
}
