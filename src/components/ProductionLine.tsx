import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

/* Top-down blueprint of the R.A.I production line. Three conveyor lanes run
   continuously (SVG + CSS keyframes, GPU transforms only): raw bar stock →
   CNC turning, turned shafts → grinding, finished hubs → inspection gate →
   dispatch. A scanner beam sweeps the inspection station and a diverter flap
   kicks rejected parts to a side chute. Line-art in brass on ink. */

const W = 1600;
const lanes = [
  { y: 110, label: "LANE A — RAW STOCK → CNC TURNING" },
  { y: 280, label: "LANE B — TURNED SHAFTS → GRINDING" },
  { y: 450, label: "LANE C — FINISHED PARTS → INSPECTION → DISPATCH" },
];
const stations = [
  { x: 470, lane: 0, name: "CNC TURNING", code: "OP-10" },
  { x: 900, lane: 1, name: "CYL. GRINDING", code: "OP-20" },
  { x: 1180, lane: 2, name: "INSPECTION ±5µm", code: "QC-01" },
];

function Belt({ y }: { y: number }) {
  return (
    <g>
      <rect x="0" y={y - 46} width={W} height="92" fill="#111113" stroke="#2a2b2f" />
      <svg x="0" y={y - 46} width={W} height="92" overflow="hidden"><rect x="-28" y="0" width={W + 56} height="92" fill="url(#chev)" className="belt-run" /></svg>
      <line x1="0" y1={y - 46} x2={W} y2={y - 46} stroke="#3a3b40" />
      <line x1="0" y1={y + 46} x2={W} y2={y + 46} stroke="#3a3b40" />
      {Array.from({ length: 17 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 100 + 40} y={y - 56} width="20" height="8" fill="#1b1b1e" stroke="#2a2b2f" />
          <rect x={i * 100 + 40} y={y + 48} width="20" height="8" fill="#1b1b1e" stroke="#2a2b2f" />
        </g>
      ))}
    </g>
  );
}

/* Part glyphs, drawn around (0,0). */
const RawBar = () => (
  <g>
    <rect x="-44" y="-9" width="88" height="18" rx="2" fill="none" stroke="#8b8d92" strokeWidth="1.5" />
    <line x1="-44" y1="0" x2="44" y2="0" stroke="#8b8d92" strokeOpacity=".35" strokeDasharray="3 3" />
  </g>
);
const Shaft = () => (
  <path d="M-46,-6 h18 v-5 h30 v-3 h20 v3 h14 v5 h10 v12 h-10 v5 h-14 v3 h-20 v-3 h-30 v-5 h-18 Z" fill="none" stroke="#d3ac74" strokeWidth="1.5" />
);
const Hub = () => (
  <g fill="none" stroke="#d3ac74" strokeWidth="1.5">
    <circle r="22" />
    <circle r="8" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx={15 * Math.cos((a * Math.PI) / 180)} cy={15 * Math.sin((a * Math.PI) / 180)} r="2.4" />
    ))}
  </g>
);
const Tray = ({ children }: { children: React.ReactNode }) => (
  <g>
    <rect x="-34" y="-34" width="68" height="68" fill="#0a0a0b" stroke="#3a3b40" />
    <path d="M-34,-28 h6 M28,-34 v6 M34,28 h-6 M-28,34 v-6" stroke="#b08d57" />
    {children}
  </g>
);

export default function ProductionLine() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.02]);

  const partsA = Array.from({ length: 7 });
  const partsB = Array.from({ length: 6 });
  const partsC = Array.from({ length: 6 });

  return (
    <section ref={ref} id="line" className="relative py-24 md:py-32 overflow-hidden border-y border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-end mb-12 md:mb-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-brass mb-5">Live Production Line</p>
            <h2 className="font-display font-extrabold uppercase leading-[0.9]" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)" }}>
              Bar Stock In.<br /><span className="text-brass">Precision Out.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-steel-light text-lg leading-relaxed max-w-xl lg:ml-auto">
              Every part moves through the same disciplined flow — turned, finished and inspected under one roof
              before it is cleared for dispatch.
            </p>
          </Reveal>
        </div>
      </div>

      <motion.div style={{ rotateX: tilt, scale, transformPerspective: 1600 }} className="relative">
        <div className="overflow-x-auto md:overflow-visible [scrollbar-width:none]">
          <svg viewBox={`0 0 ${W} 560`} className="block min-w-[1100px] w-full h-auto" role="img" aria-label="Animated top-down view of the R.A.I Industries production line: raw bars enter CNC turning, shafts move to grinding, finished parts pass inspection and go to dispatch">
            <defs>
              <pattern id="chev" width="28" height="92" patternUnits="userSpaceOnUse">
                <path d="M4,10 l10,8 l-10,8 M4,40 l10,8 l-10,8 M4,70 l10,8 l-10,8" fill="none" stroke="#26272b" strokeWidth="2" />
              </pattern>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20,16 v8 M16,20 h8" stroke="#1f2023" />
              </pattern>
              <linearGradient id="beam" x1="0" x2="1">
                <stop offset="0" stopColor="#d3ac74" stopOpacity="0" />
                <stop offset=".5" stopColor="#d3ac74" stopOpacity=".55" />
                <stop offset="1" stopColor="#d3ac74" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect width={W} height="560" fill="url(#dots)" />

            {lanes.map((l) => (
              <g key={l.y}>
                <Belt y={l.y} />
                <text x="24" y={l.y - 64} fill="#8b8d92" fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="2">{l.label}</text>
              </g>
            ))}

            {/* Lane A: raw bars */}
            <g>
              {partsA.map((_, i) => (
                <g key={i} className="flow" style={{ animationDelay: `${-i * 2.6}s`, ["--y" as string]: `${lanes[0].y}px`, ["--dur" as string]: "18s" }}>
                  <RawBar />
                </g>
              ))}
            </g>

            {/* Lane B: turned shafts in trays */}
            <g>
              {partsB.map((_, i) => (
                <g key={i} className="flow" style={{ animationDelay: `${-i * 3.4}s`, ["--y" as string]: `${lanes[1].y}px`, ["--dur" as string]: "20s" }}>
                  <Tray><g transform="rotate(-18)"><Shaft /></g></Tray>
                </g>
              ))}
            </g>

            {/* Lane C: hubs → diverted rejects occasionally */}
            <g>
              {partsC.map((_, i) => (
                <g key={i} className={i === 2 ? "flow flow-reject" : "flow"} style={{ animationDelay: `${-i * 3.6}s`, ["--y" as string]: `${lanes[2].y}px`, ["--dur" as string]: "21.6s" }}>
                  <Tray><Hub /></Tray>
                </g>
              ))}
            </g>

            {/* Side chute for rejects */}
            <g>
              <path d={`M1300,${lanes[2].y + 46} L1360,540 L1440,540 L1380,${lanes[2].y + 46}`} fill="#0e0e10" stroke="#3a3b40" />
              <text x="1370" y="556" fill="#8b8d92" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2" textAnchor="middle">REWORK</text>
              <g className="diverter" style={{ transformOrigin: `1300px ${lanes[2].y + 40}px` }}>
                <line x1="1300" y1={lanes[2].y + 40} x2="1380" y2={lanes[2].y - 30} stroke="#d3ac74" strokeWidth="3" />
                <circle cx="1300" cy={lanes[2].y + 40} r="5" fill="#d3ac74" />
              </g>
            </g>

            {/* Stations */}
            {stations.map((s) => {
              const y = lanes[s.lane].y;
              return (
                <g key={s.name}>
                  <rect x={s.x - 70} y={y - 70} width="140" height="140" fill="#0a0a0b" fillOpacity=".86" stroke="#b08d57" />
                  <rect x={s.x - 70} y={y - 70} width="140" height="22" fill="#b08d57" />
                  <text x={s.x} y={y - 55} textAnchor="middle" fill="#0a0a0b" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" letterSpacing="1.5">{s.name}</text>
                  <text x={s.x} y={y + 60} textAnchor="middle" fill="#8b8d92" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2">{s.code}</text>
                  {s.lane === 0 && (
                    <g className="spin-slow" style={{ transformOrigin: `${s.x}px ${y + 4}px` }}>
                      <circle cx={s.x} cy={y + 4} r="30" fill="none" stroke="#d3ac74" strokeDasharray="4 6" />
                      <circle cx={s.x} cy={y + 4} r="14" fill="none" stroke="#d3ac74" />
                      <line x1={s.x - 30} y1={y + 4} x2={s.x + 30} y2={y + 4} stroke="#d3ac74" strokeOpacity=".5" />
                    </g>
                  )}
                  {s.lane === 1 && (
                    <g className="spin-fast" style={{ transformOrigin: `${s.x}px ${y + 4}px` }}>
                      <circle cx={s.x} cy={y + 4} r="28" fill="none" stroke="#d3ac74" strokeWidth="6" strokeDasharray="2 4" />
                      <circle cx={s.x} cy={y + 4} r="6" fill="#d3ac74" />
                    </g>
                  )}
                  {s.lane === 2 && (
                    <g>
                      <rect x={s.x - 60} y={y - 40} width="120" height="90" fill="none" stroke="#3a3b40" strokeDasharray="3 4" />
                      <rect className="scan" x={s.x - 60} y={y - 40} width="26" height="90" fill="url(#beam)" />
                      <text x={s.x} y={y + 10} textAnchor="middle" fill="#d3ac74" fontFamily="IBM Plex Mono" fontSize="13">PASS ✓</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Dispatch dock */}
            <g>
              <rect x="1500" y={lanes[2].y - 60} width="100" height="120" fill="#131315" stroke="#b08d57" />
              <text x="1550" y={lanes[2].y + 4} textAnchor="middle" fill="#d3ac74" fontFamily="IBM Plex Mono" fontSize="11" letterSpacing="2">DISPATCH</text>
            </g>
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </motion.div>
    </section>
  );
}
