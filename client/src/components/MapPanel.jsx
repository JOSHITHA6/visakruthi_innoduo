export default function MapPanel({ artisan }) {
  const src = `https://www.google.com/maps?q=${artisan.coords.lat},${artisan.coords.lng}&z=11&output=embed`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${artisan.coords.lat},${artisan.coords.lng}`;

  return (
    <div className="mesh-border card-surface overflow-hidden rounded-[1.8rem]">
      <iframe title={`${artisan.name} map`} src={src} className="h-72 w-full border-0" loading="lazy" />
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">Google Maps</p>
          <p className="mt-1 text-sm text-ink/70">{artisan.location}</p>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-indigo px-5 py-3 text-sm font-bold text-sand transition hover:bg-terracotta"
        >
          Open Maps
        </a>
      </div>
    </div>
  );
}
