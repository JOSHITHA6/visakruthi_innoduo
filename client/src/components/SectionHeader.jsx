export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-terracotta/95">{eyebrow}</p>
      <h2 className="soft-title mt-3 font-display text-[2.4rem] font-bold leading-tight text-indigo md:text-[3.35rem]">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-[1.05rem] leading-8 text-ink/72">{description}</p> : null}
    </div>
  );
}
