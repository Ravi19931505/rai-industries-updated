import { company } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-14">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-extrabold uppercase text-xl text-paper mb-3">
            {company.legalName}
          </p>
          <p className="font-mono text-xs text-steel leading-relaxed">
            Est. {company.founded} · {company.registration} · {company.certification}
          </p>
        </div>

        <div className="font-mono text-xs text-steel-light space-y-2">
          <p className="text-steel tracking-[0.2em] uppercase text-[10px] mb-2">Address</p>
          <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-brass transition-colors">
            {company.addressLine}
          </a>
          <p>{company.addressLandmark}</p>
        </div>

        <div className="font-mono text-xs text-steel-light space-y-2">
          <p className="text-steel tracking-[0.2em] uppercase text-[10px] mb-2">Contact</p>
          <a href={company.phoneHref} className="block hover:text-brass transition-colors">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="block hover:text-brass transition-colors">{company.email}</a>
        </div>

        <div className="font-mono text-xs text-steel-light space-y-2">
          <p className="text-steel tracking-[0.2em] uppercase text-[10px] mb-2">Hours</p>
          <p>{company.hours}</p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10 pt-6 border-t border-hairline flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] text-steel/60">
        <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
        <p>Precision held to the micron.</p>
      </div>
    </footer>
  );
}
