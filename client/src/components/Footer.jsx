import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { text } = useLanguage();

  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-[#0D3B66] text-sand">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">VISAKRUTHI</h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-sand/85">
            {text(
              "A cultural technology platform preserving traditional craft practices while opening direct pathways to tourism, learning, and livelihoods.",
              "సాంప్రదాయ కళలను సంరక్షిస్తూ పర్యాటకం, అభ్యాసం, మరియు జీవనోపాధి అవకాశాలకు నేరుగా దారితీసే సాంస్కృతిక సాంకేతిక వేదిక."
            )}
          </p>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-6 shadow-sm shadow-black/10">
          <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-gold">{text("Focus Areas", "ప్రధాన అంశాలు")}</h4>
          <p className="mt-3 text-sm leading-7 text-sand/85">
            {text(
              "Artisan visibility, cultural tourism, workshops, volunteer engagement, and heritage storytelling.",
              "కళాకారుల గుర్తింపు, సాంస్కృతిక పర్యాటకం, వర్క్‌షాప్స్, వాలంటీర్ భాగస్వామ్యం, మరియు వారసత్వ కథనం."
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-sand/78 lg:px-8">
          {text("© 2026 VISAKRUTHI. All rights reserved.", "© 2026 VISAKRUTHI. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.")}
        </div>
      </div>
    </footer>
  );
}
