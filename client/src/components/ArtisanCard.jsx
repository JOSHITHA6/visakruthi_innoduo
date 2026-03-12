import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function ArtisanCard({ artisan }) {
  const { text } = useLanguage();

  return (
    <article className="mesh-border card-surface overflow-hidden rounded-[1.8rem]">
      <img src={artisan.gallery?.[0]} alt={artisan.name} className="h-64 w-full object-cover" />
      <div className="p-6">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-terracotta">{artisan.craftType}</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-indigo">{artisan.name}</h3>
        <p className="mt-2 text-sm text-indigo/65">{artisan.location}</p>
        <p className="mt-4 text-sm leading-7 text-ink/75">{artisan.shortBio}</p>
        <Link
          to={`/artisans/${artisan.id}`}
          className="mt-6 inline-flex rounded-full bg-indigo px-5 py-3 text-sm font-bold text-sand transition hover:bg-terracotta"
        >
          {text("View Profile", "ప్రొఫైల్ చూడండి")}
        </Link>
      </div>
    </article>
  );
}
