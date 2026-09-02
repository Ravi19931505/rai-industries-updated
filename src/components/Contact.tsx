import { useState } from "react";
import { company, partCategories, WEB3FORMS_ACCESS_KEY } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New enquiry — R.A.I Industries website");
    formData.append("from_name", "R.A.I Industries website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>Request A Quote</Eyebrow>
            <SectionNumber n="10" />
          </div>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl mb-10">
            Send Your Drawing.
          </h2>

          <dl className="space-y-6 font-mono text-sm">
            <div>
              <dt className="text-steel text-[11px] tracking-[0.2em] uppercase mb-1">Address</dt>
              <dd className="text-steel-light">
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass transition-colors">
                  {company.addressLine}
                </a>
                <br />
                <span className="text-steel">{company.addressLandmark}</span>
              </dd>
            </div>
            <div>
              <dt className="text-steel text-[11px] tracking-[0.2em] uppercase mb-1">Phone</dt>
              <dd className="text-steel-light">
                <a href={company.phoneHref} className="hover:text-brass transition-colors">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel text-[11px] tracking-[0.2em] uppercase mb-1">Email</dt>
              <dd className="text-steel-light">
                <a href={`mailto:${company.email}`} className="hover:text-brass transition-colors">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel text-[11px] tracking-[0.2em] uppercase mb-1">Hours</dt>
              <dd className="text-steel-light">{company.hours}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "sent" ? (
            <div className="border border-brass p-10 text-center" role="status" aria-live="polite">
              <p className="font-display font-bold uppercase text-2xl text-brass mb-2">
                Enquiry Received
              </p>
              <p className="text-steel-light">
                We'll review your drawing and respond with a quote shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div
                  className="border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200"
                  role="alert"
                >
                  Something went wrong sending your enquiry. Please try again,
                  or email us directly at{" "}
                  <a href={`mailto:${company.email}`} className="underline">
                    {company.email}
                  </a>
                  .
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your Name" name="name" autoComplete="name" restrict="alpha" required />
                <Field label="Company" name="company" autoComplete="organization" restrict="alpha" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email Address" name="email" type="email" autoComplete="email" required />
                <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" restrict="numeric" required />
              </div>

              <div>
                <label htmlFor="category" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-steel mb-2">
                  Part Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className="w-full bg-transparent border-b border-hairline py-3 pr-8 text-paper focus:border-brass outline-none appearance-none"
                  >
                    <option value="" disabled className="bg-ink">
                      Select category
                    </option>
                    {partCategories.map((c) => (
                      <option key={c} value={c} className="bg-ink">
                        {c}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-steel font-mono text-xs"
                  >
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block font-mono text-[11px] tracking-[0.2em] uppercase text-steel mb-2">
                  Notes / Drawing Reference
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full bg-transparent border-b border-hairline py-3 text-paper focus:border-brass outline-none resize-none"
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                aria-disabled={status === "sending"}
                onClick={(e: React.MouseEvent) => {
                  if (status === "sending") e.preventDefault();
                }}
                className={`inline-flex items-center gap-2 px-8 py-4 font-mono text-xs tracking-[0.15em] uppercase transition-colors ${
                  status === "sending"
                    ? "bg-hairline text-steel cursor-wait"
                    : "bg-brass text-ink hover:bg-brass-bright"
                }`}
              >
                {status === "sending" ? "Sending…" : "Send Enquiry"}
                {status !== "sending" && <span aria-hidden>→</span>}
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
  restrict,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  // "alpha": letters, spaces, hyphens and apostrophes only (names, company).
  // "numeric": digits, +, spaces and hyphens only (phone numbers, so a
  // country-code prefix and readable grouping still work — not digits-only,
  // just no letters).
  restrict?: "alpha" | "numeric";
}) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let next = e.target.value;
    if (restrict === "alpha") {
      next = next.replace(/[^a-zA-Z\s'-]/g, "");
    } else if (restrict === "numeric") {
      next = next.replace(/[^0-9+\s-]/g, "");
    }
    setValue(next);
  }

  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[11px] tracking-[0.2em] uppercase text-steel mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
        inputMode={restrict === "numeric" ? "tel" : undefined}
        pattern={
          restrict === "alpha" ? "[A-Za-z\\s'-]*" :
          restrict === "numeric" ? "[0-9+\\s-]*" :
          undefined
        }
        className="w-full bg-transparent border-b border-hairline py-3 text-paper focus:border-brass outline-none"
      />
    </div>
  );
}
