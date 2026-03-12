import { useLanguage } from "./LanguageContext";

export default function WorkshopCard({ workshop, active = false, onSelect }) {
  const { text } = useLanguage();
  const Tag = onSelect ? "button" : "article";

  return (
    <Tag
      type={onSelect ? "button" : undefined}
      onClick={onSelect ? () => onSelect(workshop) : undefined}
      className={`mesh-border card-surface rounded-[1.8rem] p-6 text-left transition ${
        onSelect ? "cursor-pointer hover:-translate-y-1" : ""
      } ${active ? "ring-2 ring-terracotta" : ""}`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{workshop.label}</p>
      <p className="mt-4 font-display text-5xl font-bold text-indigo">Rs. {workshop.price}</p>
      <p className="mt-2 text-sm font-semibold text-indigo/70">
        {workshop.people} {text("people", "మంది")}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink/75">{workshop.blurb}</p>
    </Tag>
  );
}
