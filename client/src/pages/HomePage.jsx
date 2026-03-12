import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SectionHeader from "../components/SectionHeader";
import ArtisanCard from "../components/ArtisanCard";
import ReelsStrip from "../components/ReelsStrip";
import { demoArtisans, getArtisanCopy } from "../data/demoData";
import MapPanel from "../components/MapPanel";
import { useLanguage } from "../components/LanguageContext";

export default function HomePage() {
  const { language, text } = useLanguage();
  const featured = demoArtisans.filter((artisan) => artisan.featured).map((artisan) => getArtisanCopy(artisan, language));

  return (
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          eyebrow={text("Featured Artisans", "ప్రత్యేక కళాకారులు")}
          title={text("Meet the makers behind Vizag's living craft heritage.", "వైజాగ్ జీవంతమైన కళా వారసత్వాన్ని నిలబెట్టే కళాకారులను కలవండి.")}
          description={text(
            "Each profile combines local stories, workshop access, and direct cultural visibility.",
            "ప్రతి ప్రొఫైల్‌లో స్థానిక కథలు, వర్క్‌షాప్ వివరాలు, మరియు కళాకారునికి ప్రత్యక్ష గుర్తింపు ఉంటుంది."
          )}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          eyebrow={text("Craft Reels", "కళా రీల్స్")}
          title={text("Short-form glimpses into making, material, and memory.", "తయారీ, పదార్థం, మరియు జ్ఞాపకాలను చూపించే చిన్న కథనాలు.")}
          description={text(
            "A visual storytelling layer that highlights process, material, and cultural memory.",
            "ప్రక్రియ, పదార్థం, మరియు సాంస్కృతిక జ్ఞాపకాలను చూపించే దృశ్య కథన విభాగం."
          )}
        />
        <div className="mt-10">
          <ReelsStrip artisans={demoArtisans.map((artisan) => getArtisanCopy(artisan, language))} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          eyebrow={text("Artisan Map", "కళాకారుల మ్యాప్")}
          title={text(
            "Regional discovery through Google Maps-linked craft locations.",
            "Google Maps తో అనుసంధానించిన కళా కేంద్రాల ద్వారా ప్రాంతీయ అన్వేషణ."
          )}
          description={text(
            "Embedded maps help visitors move from discovery to real visit planning.",
            "ఎంబెడెడ్ మ్యాప్స్ సందర్శకులు అన్వేషణ నుంచి ప్రత్యక్ష సందర్శన ప్రణాళిక వరకు సులభంగా వెళ్లేందుకు సహాయపడతాయి."
          )}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {demoArtisans.slice(0, 2).map((artisan) => (
            <MapPanel key={artisan.id} artisan={getArtisanCopy(artisan, language)} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mesh-border card-surface rounded-[2rem] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Volunteer", "వాలంటీర్")}</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-indigo">
            {text("Join as a student cultural volunteer.", "విద్యార్థి సాంస్కృతిక వాలంటీర్‌గా చేరండి.")}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/75">
            {text(
              "Support workshops, document oral histories, help with media content, and build tourism bridges between artisans and young audiences.",
              "వర్క్‌షాప్స్‌కు సహాయం చేయండి, మౌఖిక చరిత్రలను లిఖితపరచండి, మీడియా కంటెంట్‌లో భాగస్వామ్యం అవండి, కళాకారులు మరియు యువత మధ్య పర్యాటక వంతెనలను నిర్మించండి."
            )}
          </p>
          <Link to="/volunteer" className="mt-8 inline-flex rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white">
            {text("Register now", "ఇప్పుడే నమోదు చేసుకోండి")}
          </Link>
        </div>
      </section>
    </div>
  );
}
