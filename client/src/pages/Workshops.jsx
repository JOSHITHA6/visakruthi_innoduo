import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";
import {
  craftCategories,
  getCraftCategory,
  getWorkshopCategoryCopy,
  getWorkshopCopy,
  workshopCategoriesData,
  workshopPackages
} from "../data/demoData";
import { createBooking } from "../services/api";

const initialForm = {
  visitorName: "",
  email: "",
  phone: "",
  date: "",
  groupSize: 2,
  packageName: workshopPackages[0].label,
  price: workshopPackages[0].price,
  notes: ""
};

export default function Workshops() {
  const { language, text } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(workshopCategoriesData[0]);

  useEffect(() => {
    const categoryName = searchParams.get("category");
    if (!categoryName) return;

    const match = workshopCategoriesData.find((item) => item.title.toLowerCase() === categoryName.toLowerCase());
    if (match) setSelectedCategory(match);
  }, [searchParams]);

  const handlePackageSelect = (workshop) => {
    setForm((current) => ({
      ...current,
      packageName: workshop.label,
      price: workshop.price
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBooking(form);
    setMessage(text("Workshop booking submitted successfully.", "వర్క్‌షాప్ బుకింగ్ విజయవంతంగా నమోదైంది."));
    setForm(initialForm);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category: category.title });
  };

  const localizedCategory = getWorkshopCategoryCopy(selectedCategory, language);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Workshops", "వర్క్‌షాప్స్")}
        title={text("Explore categories and discover focused craft experiences.", "విభాగాలను అన్వేషించి ప్రత్యేక కళా అనుభవాలను తెలుసుకోండి.")}
        description={text(
          "Each category brings together people, processes, and visual references so visitors can understand the experience before they book.",
          "ప్రతి విభాగం ప్రజలు, ప్రక్రియలు, మరియు దృశ్య సూచనలను ఒకచోట చేర్చి బుకింగ్‌కు ముందు అనుభవాన్ని స్పష్టంగా చూపిస్తుంది."
        )}
      />

      <div className="mt-12 flex flex-wrap gap-3 rounded-[2rem] bg-white/55 p-3 shadow-sm shadow-indigo/5">
        {craftCategories.map((category) => {
          const match = workshopCategoriesData.find((item) => item.title === category);
          const active = selectedCategory.id === match?.id;

          return (
            <button
              key={category}
              type="button"
              onClick={() => match && selectCategory(match)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                active ? "bg-terracotta text-white shadow-md shadow-terracotta/20" : "bg-white/75 text-indigo hover:bg-sand"
              }`}
            >
              {getCraftCategory(category, language)}
            </button>
          );
        })}
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="mesh-border card-surface overflow-hidden rounded-[2rem]">
            <img src={localizedCategory.image} alt={localizedCategory.title} className="h-72 w-full object-cover" />
            <div className="p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Selected Category", "ఎంచుకున్న విభాగం")}</p>
              <h3 className="mt-4 font-display text-4xl font-bold text-indigo">{localizedCategory.title}</h3>
              <p className="mt-4 text-lg leading-8 text-ink/75">{localizedCategory.summary}</p>
              <p className="mt-6 text-base leading-8 text-ink/72">{localizedCategory.details}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="mesh-border card-surface rounded-[2rem] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("People Involved", "సంబంధిత వ్యక్తులు")}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {localizedCategory.people.map((person) => (
                  <span key={person} className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-indigo">
                    {person}
                  </span>
                ))}
              </div>
            </div>

            <div className="mesh-border card-surface rounded-[2rem] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Availability", "అందుబాటు")}</p>
              <div className="mt-4 space-y-3">
                {localizedCategory.availability.map((item) => (
                  <div key={item} className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold text-indigo">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mesh-border card-surface rounded-[2rem] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{text("Relevant Video", "సంబంధిత వీడియో")}</p>
          <iframe
            title={localizedCategory.title}
            src={localizedCategory.video}
            className="mt-4 h-80 w-full rounded-[1.4rem]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader
          eyebrow={text("Booking Options", "బుకింగ్ ఎంపికలు")}
          title={text("Choose a visitor format after selecting a category.", "విభాగాన్ని ఎంచుకున్న తరువాత సందర్శకుల రూపాన్ని ఎంచుకోండి.")}
          description={text(
            "Packages remain available for individuals, families, and student groups.",
            "వ్యక్తులు, కుటుంబాలు, మరియు విద్యార్థి బృందాల కోసం ప్యాకేజీలు అందుబాటులో ఉన్నాయి."
          )}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {workshopPackages.map((workshop) => {
            const localizedWorkshop = getWorkshopCopy(workshop, language);
            return (
              <button
                key={workshop.label}
                type="button"
                onClick={() => handlePackageSelect(workshop)}
                className={`mesh-border card-surface rounded-[1.8rem] p-6 text-left transition hover:-translate-y-1 ${
                  form.packageName === workshop.label ? "ring-2 ring-terracotta" : ""
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-terracotta">{localizedWorkshop.label}</p>
                <p className="mt-4 font-display text-5xl font-bold text-indigo">Rs. {workshop.price}</p>
                <p className="mt-4 text-sm leading-7 text-ink/75">{localizedWorkshop.blurb}</p>
              </button>
            );
          })}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mesh-border card-surface mt-12 rounded-[2rem] p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <input
            required
            value={form.visitorName}
            onChange={(event) => setForm({ ...form, visitorName: event.target.value })}
            placeholder={text("Name", "పేరు")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder={text("Email", "ఈమెయిల్")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder={text("Phone", "ఫోన్")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            type="number"
            min="1"
            value={form.groupSize}
            onChange={(event) => setForm({ ...form, groupSize: Number(event.target.value) })}
            placeholder={text("Group Size", "గుంపు పరిమాణం")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            value={`${form.packageName} - Rs. ${form.price}`}
            readOnly
            className="rounded-2xl border border-indigo/10 bg-sand px-4 py-4 outline-none"
          />
        </div>
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          rows="4"
          placeholder={text("Special requests", "ప్రత్యేక అభ్యర్థనలు")}
          className="mt-5 w-full rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
        />
        <button type="submit" className="mt-6 rounded-full bg-indigo px-6 py-3 text-sm font-bold text-sand transition hover:bg-terracotta">
          {text("Submit Booking", "బుకింగ్ పంపండి")}
        </button>
        {message ? <p className="mt-4 text-sm font-semibold text-terracotta">{message}</p> : null}
      </form>
    </div>
  );
}
