import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import PlaceholderPhoto from "./PlaceholderPhoto";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";
import cncTurningPhoto from "../assets/photos/capabilities/cnc-turning.webp";
import cncMillingPhoto from "../assets/photos/capabilities/cnc-milling.webp";
import surfaceGrindingPhoto from "../assets/photos/capabilities/surface-grinding.webp";
import qualityInspectionPhoto from "../assets/photos/capabilities/quality-inspection.webp";
import honingPhoto from "../assets/photos/capabilities/honing.webp";
import laserCuttingPhoto from "../assets/photos/capabilities/laser-cutting.webp";
import sheetBendingPhoto from "../assets/photos/capabilities/sheet-bending.webp";
import weldingFabricationPhoto from "../assets/photos/capabilities/welding-fabrication.webp";
import cylindricalGrindingPhoto from "../assets/photos/capabilities/cylindrical-grinding.webp";
import subAssemblyPhoto from "../assets/photos/capabilities/sub-assembly.webp";

const capabilityPhotos: Record<string, string> = {
  "CNC Turning": cncTurningPhoto,
  "CNC Milling": cncMillingPhoto,
  "Surface Grinding": surfaceGrindingPhoto,
  "Cylindrical Grinding": cylindricalGrindingPhoto,
  "Quality Inspection": qualityInspectionPhoto,
  "Honing": honingPhoto,
  "Laser Cutting": laserCuttingPhoto,
  "Sheet Bending": sheetBendingPhoto,
  "Welding & Fabrication": weldingFabricationPhoto,
  "Sub-Assembly": subAssemblyPhoto,
};

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];

  return (
    <section id="capabilities" className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>What We Do</Eyebrow>
            <SectionNumber n="04" />
          </div>
        </Reveal>
        <HeadlineReveal>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-14 max-w-2xl">
            Full-Spectrum Machining.
          </h2>
        </HeadlineReveal>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div className="border-t border-hairline">
            {capabilities.map((c, i) => (
              <button
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative w-full text-left flex items-baseline gap-4 md:gap-8 py-4 md:py-5 border-b border-hairline group transition-colors active:scale-[0.99] ${
                  active === i ? "text-brass" : "text-paper hover:text-brass"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="capability-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-brass"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="font-mono text-xs tracking-[0.2em] text-steel shrink-0">
                  {c.id}
                </span>
                <span className="font-display font-semibold uppercase text-2xl md:text-4xl tracking-tight flex-1">
                  {c.name}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel hidden md:block shrink-0">
                  {c.spec}
                </span>
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] lg:sticky lg:top-28 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <PlaceholderPhoto
                  alt={`${current.name} operation at R.A.I Industries`}
                  variant="brass"
                  src={capabilityPhotos[current.name]}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-ink to-transparent">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-brass mb-2">
                    {current.spec}
                  </p>
                  <p className="text-steel-light text-sm leading-relaxed">{current.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
