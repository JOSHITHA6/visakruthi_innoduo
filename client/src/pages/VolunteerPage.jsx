import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { useLanguage } from "../components/LanguageContext";
import { createVolunteer } from "../services/api";

const initialForm = {
  name: "",
  college: "",
  email: "",
  phone: "",
  interestArea: "",
  idProof: null
};

export default function VolunteerPage() {
  const { text } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("college", form.college);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("interestArea", form.interestArea);
    if (form.idProof) payload.append("idProof", form.idProof);

    await createVolunteer(payload);
    setMessage(text("Volunteer registration submitted successfully.", "వాలంటీర్ నమోదు విజయవంతంగా పంపబడింది."));
    setForm(initialForm);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <SectionHeader
        eyebrow={text("Volunteer Program", "వాలంటీర్ కార్యక్రమం")}
        title={text("Register as a student volunteer.", "విద్యార్థి వాలంటీర్‌గా నమోదు చేసుకోండి.")}
        description={text(
          "Students can support documentation, outreach, workshop coordination, and community storytelling.",
          "విద్యార్థులు డాక్యుమెంటేషన్, ప్రచారం, వర్క్‌షాప్ సమన్వయం, మరియు సమాజ కథనానికి సహకరించవచ్చు."
        )}
      />

      <form onSubmit={handleSubmit} className="mesh-border card-surface mt-12 rounded-[2rem] p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder={text("Name", "పేరు")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none"
          />
          <input
            required
            value={form.college}
            onChange={(event) => setForm({ ...form, college: event.target.value })}
            placeholder={text("College", "కాలేజ్")}
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
            value={form.interestArea}
            onChange={(event) => setForm({ ...form, interestArea: event.target.value })}
            placeholder={text("Interest area", "ఆసక్తి రంగం")}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none md:col-span-2"
          />
          <input
            type="file"
            onChange={(event) => setForm({ ...form, idProof: event.target.files?.[0] || null })}
            className="rounded-2xl border border-indigo/10 bg-white px-4 py-4 outline-none md:col-span-2"
          />
        </div>
        <button type="submit" className="mt-6 rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white">
          {text("Submit Registration", "నమోదు పంపండి")}
        </button>
        {message ? <p className="mt-4 text-sm font-semibold text-terracotta">{message}</p> : null}
      </form>
    </div>
  );
}
