import { useEffect, useState } from "react";
import ArtisanCard from "../components/ArtisanCard";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";
import { getArtisans } from "../services/api";
import { demoArtisans } from "../data/demoData";

export default function ExploreCraftsPage() {
  const { text } = useLanguage();
  const [artisans, setArtisans] = useState(demoArtisans);

  useEffect(() => {
    getArtisans().then(setArtisans);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Explore Crafts", "కళలను అన్వేషించండి")}
        title={text("Discover artisans across the Visakhapatnam region.", "విశాఖపట్నం ప్రాంతమంతటా ఉన్న కళాకారులను తెలుసుకోండి.")}
        description={text(
          "Browse artisan profiles, workshop formats, and location-based experiences designed for visitors and learners.",
          "పర్యాటకులు మరియు అభ్యాసకుల కోసం రూపొందించిన కళాకారుల ప్రొఫైళ్లు, వర్క్‌షాప్ రూపాలు, ప్రదేశాధారిత అనుభవాలను చూడండి."
        )}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
}
