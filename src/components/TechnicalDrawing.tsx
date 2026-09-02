import { motion } from "framer-motion";
import { Eyebrow, SectionNumber } from "./Chrome";

export default function TechnicalDrawing() {
  return (
    <section className="relative py-24 md:py-32 border-b border-hairline overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-10">
          <Eyebrow index="FIG. 01">Engineering Reference</Eyebrow>
          <SectionNumber n="02" />
        </div>

        <div className="relative border border-hairline bg-surface/40 overflow-x-auto">
          <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

          {/* min-width keeps the SVG's dimension text and labels legible on
              phones — scaling the whole viewBox down to fit a narrow screen
              would shrink 12–16px label text to a few pixels. Horizontal
              scroll on mobile trades full-width fit for readability. */}
          <svg
            viewBox="0 0 1200 480"
            className="h-auto relative min-w-[720px] w-full"
            role="img"
            aria-label="Technical drawing of a machined pinion shaft with dimension callouts and a critical tolerance of plus or minus five microns"
          >
            {/* centerline */}
            <line x1="60" y1="240" x2="1140" y2="240" stroke="#8b8d92" strokeWidth="1" strokeDasharray="10 6" />

            {/* shaft body — drawn on scroll */}
            <motion.g
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <motion.path
                d="M120,200 H340 V180 H520 V150 H760 V180 H940 V200 H1080 V280 H940 V300 H760 V330 H520 V300 H340 V280 H120 Z"
                fill="#1b1b1e"
                stroke="#d3ac74"
                strokeWidth="2"
              />
            </motion.g>

            {/* keyway detail */}
            <rect x="600" y="150" width="60" height="16" fill="#0a0a0b" stroke="#8b8d92" strokeWidth="1" />

            {/* dimension lines */}
            <g stroke="#8b8d92" strokeWidth="1" fontFamily="IBM Plex Mono, monospace">
              <line x1="120" y1="360" x2="1080" y2="360" />
              <line x1="120" y1="352" x2="120" y2="368" />
              <line x1="1080" y1="352" x2="1080" y2="368" />
              <text x="580" y="385" fill="#c9cace" fontSize="14" textAnchor="middle">
                248.00 mm
              </text>

              <line x1="1120" y1="150" x2="1120" y2="330" />
              <line x1="1112" y1="150" x2="1128" y2="150" />
              <line x1="1112" y1="330" x2="1128" y2="330" />
              <text x="1140" y="245" fill="#c9cace" fontSize="14" transform="rotate(90 1140 245)">
                Ø42.00 mm
              </text>
            </g>

            {/* callout: tolerance */}
            <g>
              <line x1="630" y1="150" x2="630" y2="70" stroke="#b08d57" strokeWidth="1" />
              <circle cx="630" cy="70" r="3" fill="#b08d57" />
              <text x="645" y="65" fill="#d3ac74" fontSize="16" fontFamily="IBM Plex Mono, monospace">
                CRITICAL TOLERANCE ±5µm
              </text>
              <text x="645" y="85" fill="#8b8d92" fontSize="12" fontFamily="IBM Plex Mono, monospace">
                SURFACE FINISH Ra 0.4 · MATERIAL EN24T
              </text>
            </g>

            {/* title block */}
            <g fontFamily="IBM Plex Mono, monospace">
              <line x1="60" y1="420" x2="1140" y2="420" stroke="#2a2b2f" />
              <text x="60" y="445" fill="#8b8d92" fontSize="12">PART: PINION SHAFT — 3A / REV C</text>
              <text x="500" y="445" fill="#8b8d92" fontSize="12">SCALE 1:1</text>
              <text x="700" y="445" fill="#8b8d92" fontSize="12">UNITS: MM</text>
              <text x="900" y="445" fill="#8b8d92" fontSize="12">R.A.I INDUSTRIES</text>
            </g>
          </svg>
        </div>

        <p className="mt-6 max-w-xl text-steel text-sm leading-relaxed font-mono">
          Representative drawing for illustration. Actual specification is
          confirmed against the customer's drawing at quotation stage.
        </p>
      </div>
    </section>
  );
}
