import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import MapPanel from "../components/MapPanel";
import { useLanguage } from "../components/LanguageContext";
import { demoArtisans, getArtisanCopy } from "../data/demoData";
import { getArtisans } from "../services/api";
import YouTubeShowcase from "../components/YouTubeShowcase";
import AuthenticityPanel from "../components/AuthenticityPanel";

export default function ArtisanProfilePage() {
  const { language, text } = useLanguage();
  const { artisanId } = useParams();
  const [artisan, setArtisan] = useState(demoArtisans.find((item) => item.id === artisanId));

  useEffect(() => {
    getArtisans().then((items) => {
      const match = items.find((item) => item.id === artisanId);
      if (match) setArtisan(match);
    });
  }, [artisanId]);

  if (!artisan) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-indigo">{text("Artisan not found", "కళాకారుడు కనబడలేదు")}</h1>
      </div>
    );
  }

  const localizedArtisan = getArtisanCopy(artisan, language);
  const isJagannadha = localizedArtisan.id === "bamboo-jagannadha";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader eyebrow={localizedArtisan.craftType} title={localizedArtisan.name} description={localizedArtisan.shortBio} />
      <AuthenticityPanel artisan={localizedArtisan} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <img
            src={localizedArtisan.gallery?.[0]}
            alt={localizedArtisan.name}
            className={`h-112 w-full rounded-4xl shadow-xl ${isJagannadha ? "object-contain bg-sand" : "object-cover"}`}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="mesh-border card-surface rounded-[1.8rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Bio", "జీవిత వివరణ")}</p>
              <p className="mt-4 text-base leading-8 text-ink/75">{localizedArtisan.bio}</p>
            </div>
            <div className="mesh-border card-surface rounded-[1.8rem] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Craft Story", "కళా కథ")}</p>
              <p className="mt-4 text-base leading-8 text-ink/75">{localizedArtisan.story}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {localizedArtisan.gallery?.map((image) => (
              <img key={image} src={image} alt={localizedArtisan.name} className="h-52 w-full rounded-[1.4rem] object-cover" />
            ))}
          </div>
          <YouTubeShowcase artisan={localizedArtisan} />
        </div>

        <div className="space-y-8">
          <div className="mesh-border card-surface rounded-[1.8rem] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Contact Details", "సంప్రదింపు వివరాలు")}</p>
            <p className="mt-4 text-base font-semibold text-indigo">{localizedArtisan.contact?.phone}</p>
            <p className="mt-2 text-base text-ink/75">{localizedArtisan.contact?.email}</p>
            <p className="mt-5 rounded-2xl bg-sand px-4 py-3 text-sm font-semibold text-indigo">{localizedArtisan.experienceTag}</p>
            <Link to="/workshops" className="mt-6 inline-flex rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-white">
              {text("Book Workshop", "వర్క్‌షాప్ బుక్ చేయండి")}
            </Link>
          </div>
          <MapPanel artisan={localizedArtisan} />
        </div>
      </div>
    </div>
  );
}
