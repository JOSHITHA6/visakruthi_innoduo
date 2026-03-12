export default function ReelsStrip({ artisans }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {artisans.slice(0, 3).map((artisan) => (
        <div key={artisan.id} className="mesh-border card-surface overflow-hidden rounded-[1.8rem]">
          <iframe
            className="h-60 w-full"
            src={artisan.reels?.[0]?.url}
            title={artisan.reels?.[0]?.title || artisan.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="p-5">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-terracotta">{artisan.craftType}</p>
            <h3 className="mt-2 text-xl font-bold text-indigo">{artisan.reels?.[0]?.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{artisan.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
