import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import { WEB3FORMS_ACCESS_KEY } from "./data/content";

/* Client onboarding intake. One link the client fills in; answers are emailed
   via Web3Forms with a distinct subject so they're easy to filter. Files are
   shared as Google Drive / WhatsApp links (Web3Forms free tier has no file
   uploads). */

type Field = { name: string; label: string; type?: "text" | "textarea" | "select" | "email" | "tel"; placeholder?: string; options?: string[]; required?: boolean };
type Step = { id: string; title: string; intro: string; fields: Field[] };

const steps: Step[] = [
  {
    id: "contact", title: "Business & Contact", intro: "Who we work with and who handles enquiries.",
    fields: [
      { name: "company", label: "Company name", placeholder: "R.A.I Industries (Regd.)", required: true },
      { name: "contact_person", label: "Contact person", required: true },
      { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
      { name: "email", label: "Email for enquiries", type: "email", required: true },
      { name: "enquiry_owner", label: "Who replies to buyer enquiries?", placeholder: "Name, role, languages spoken" },
    ],
  },
  {
    id: "machines", title: "Machines & Capacity", intro: "This becomes the Machine Park section on the website.",
    fields: [
      { name: "cnc_machines", label: "CNC machines (make / model / quantity)", type: "textarea", placeholder: "e.g. 2 × LMW Smarturn, 1 × Ace Jobber XL…", required: true },
      { name: "other_machines", label: "Other machines", type: "textarea", placeholder: "Grinders, honing, VMC, laser, press brake, welding…" },
      { name: "turning_range", label: "Max turning diameter × length (mm)", placeholder: "e.g. Ø300 × 600" },
      { name: "monthly_capacity", label: "Approx. monthly capacity", placeholder: "Pieces or machine-hours per month" },
      { name: "job_work", label: "Do you accept job work?", type: "select", options: ["Yes — drawing or sample", "Yes — drawing only", "No"] },
    ],
  },
  {
    id: "products", title: "Products & Pricing", intro: "Helps us write listings and answer buyers faster.",
    fields: [
      { name: "top_products", label: "Top products / parts you want to sell more of", type: "textarea", required: true },
      { name: "materials", label: "Materials you work with", placeholder: "EN8, EN24, SG iron, brass…" },
      { name: "moq", label: "Minimum order quantity (MOQ)" },
      { name: "price_range", label: "Typical price range (optional)", placeholder: "Per piece / per kg" },
      { name: "lead_time", label: "Typical lead time", placeholder: "e.g. 2–3 weeks" },
    ],
  },
  {
    id: "trust", title: "Certifications & Clients", intro: "Proof that wins export and OEM buyers.",
    fields: [
      { name: "certifications", label: "Certifications", type: "textarea", placeholder: "ISO 9001, MSME/Udyam, IEC, GST…" },
      { name: "clients", label: "Current / past clients we may mention", type: "textarea", placeholder: "Only names you are happy to show publicly" },
      { name: "export_experience", label: "Export experience", type: "select", options: ["Already exporting", "Exported once or twice", "Not yet — want to start"] },
      { name: "target_countries", label: "Target countries / regions", placeholder: "e.g. UAE, Africa, UK, Australia" },
    ],
  },
  {
    id: "assets", title: "Photos, Budget & Goals", intro: "Real photos replace the placeholders on the new website.",
    fields: [
      { name: "media_link", label: "Google Drive / WhatsApp link to photos & videos", placeholder: "Factory, machines, finished parts, team", type: "text" },
      { name: "catalog_link", label: "Catalog / drawings link (optional)" },
      { name: "monthly_budget", label: "Monthly budget for ads & listings", type: "select", options: ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+", "Discuss on call"] },
      { name: "goals", label: "What does success look like in 6 months?", type: "textarea", required: true },
    ],
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const step = steps[i];
  const last = i === steps.length - 1;

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  async function submit() {
    setStatus("sending");
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append("subject", `Client Onboarding — ${data.company || "R.A.I Industries"}`);
    fd.append("from_name", "Loopwork Client Onboarding");
    for (const s of steps) for (const f of s.fields) fd.append(`${s.title} › ${f.label}`, data[f.name] || "—");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const j = await res.json();
      setStatus(j.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (last) submit();
    else { setI(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }

  const input = "w-full bg-transparent border-b border-hairline focus:border-brass outline-none py-3 text-paper placeholder:text-steel/60 transition-colors";

  return (
    <div className="min-h-screen bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.12]" aria-hidden />
      <div className="absolute -top-40 -left-40 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20" style={{ background: "radial-gradient(circle,#b08d57,transparent 65%)" }} aria-hidden />
      <div className="relative max-w-3xl mx-auto px-6 py-12 md:py-20">
        <header className="flex items-center justify-between mb-14">
          <span className="font-display font-extrabold tracking-wide text-xl">R.A.I <span className="text-brass">INDUSTRIES</span></span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">Client Onboarding</span>
        </header>

        {status === "sent" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-brass/50 rounded-2xl p-10 text-center glass">
            <p className="font-display font-extrabold uppercase text-4xl md:text-5xl text-brass mb-4">Thank You.</p>
            <p className="text-steel-light text-lg">Your details have reached the Loopwork team. We’ll start updating the website and listings right away and follow up on WhatsApp if anything is missing.</p>
          </motion.div>
        ) : (
          <>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-brass mb-4">Step {i + 1} of {steps.length}</p>
            <div className="flex gap-2 mb-10" aria-hidden>
              {steps.map((s, k) => (
                <div key={s.id} className="h-1 flex-1 rounded-full bg-hairline overflow-hidden">
                  <motion.div className="h-full bg-brass" initial={false} animate={{ width: k <= i ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={step.id}
                onSubmit={next}
                noValidate={false}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <h1 className="font-display font-extrabold uppercase leading-[0.95] text-4xl md:text-6xl mb-3">{step.title}</h1>
                <p className="text-steel-light mb-10">{step.intro}</p>

                <div className="grid gap-8">
                  {step.fields.map((f) => (
                    <label key={f.name} className="block">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel">{f.label}{f.required && <span className="text-brass"> *</span>}</span>
                      {f.type === "textarea" ? (
                        <textarea name={f.name} required={f.required} rows={3} placeholder={f.placeholder} value={data[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} className={`${input} resize-y`} />
                      ) : f.type === "select" ? (
                        <select name={f.name} required={f.required} value={data[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} className={`${input} [&>option]:bg-ink`}>
                          <option value="">Select…</option>
                          {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input name={f.name} type={f.type || "text"} required={f.required} placeholder={f.placeholder} value={data[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} className={input} />
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-12 flex items-center justify-between gap-4">
                  <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="font-mono text-xs tracking-[0.15em] uppercase text-steel hover:text-paper disabled:opacity-30">
                    ← Back
                  </button>
                  <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 px-7 py-4 bg-brass text-ink font-mono text-xs tracking-[0.15em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-60">
                    {last ? (status === "sending" ? "Sending…" : "Submit Details") : "Continue"} <span aria-hidden>→</span>
                  </button>
                </div>
                {status === "error" && <p className="mt-6 text-sm text-red-300">Something went wrong. Please try again, or send the details on WhatsApp.</p>}
              </motion.form>
            </AnimatePresence>
          </>
        )}
        <p className="mt-16 font-mono text-[10px] tracking-[0.2em] uppercase text-steel/70">Private link · Prepared by Loopwork Studio</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Onboarding />
  </StrictMode>,
);
