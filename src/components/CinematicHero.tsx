import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import { photos } from "../data/content";

/* Pinned scroll-scrub hero. A 320vh wrapper holds a sticky 100vh stage; scroll
   progress drives an SVG lathe that turns raw bar stock into a finished,
   stepped shaft, while headline stages crossfade one at a time. The primary
   CTA is persistent (never gated behind the end of the scrub). */

const stages = [
  { eyebrow: "Stage 01 — Raw Stock", title: ["From Raw Bar", "To Precision."], body: "EN8, EN24T, 42CrMo4 and SG iron — certified material, traced from the first cut." },
  { eyebrow: "Stage 02 — CNC Turning", title: ["Turned On", "Our Own Floor."], body: "Multiple CNC lathes running shafts, hubs and pins in-house. No outsourcing, no middlemen." },
  { eyebrow: "Stage 03 — Finishing", title: ["Ground, Honed,", "Finished."], body: "Grinding and honing for the surface and roundness your drawing calls for." },
  { eyebrow: "Stage 04 — Inspection", title: ["Held To", "±5 Microns."], body: "Every critical dimension verified before dispatch. Since 1979." },
];

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [stage, setStage] = useState(reduce ? stages.length - 1 : 0);

  useMotionValueEvent(p, "change", (v) => {
    if (reduce) return;
    setStage(Math.min(stages.length - 1, Math.floor(v * stages.length * 0.999)));
  });

  const photoScale = useTransform(p, [0, 1], [1.15, 1]);
  const photoOpacity = useTransform(p, [0, 0.5, 1], [0.35, 0.22, 0.3]);

  return (
    <section ref={ref} id="top" className={reduce ? "relative" : "relative h-[320vh]"}>
      <div className={reduce ? "relative min-h-screen overflow-hidden" : "sticky top-0 h-screen overflow-hidden"}>
        <motion.img
          src={photos.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: photoScale, opacity: photoOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 blueprint-grid opacity-[0.18]" />

        <div className="absolute top-24 left-6 md:left-10 font-mono text-[10px] tracking-[0.2em] text-steel/70 hidden md:block">
          OP. 10 — TURNING
        </div>
        <Readout p={p} />

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-center lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center gap-4 lg:gap-6 pt-24 pb-44 md:pb-48">
          {/* Staged headline */}
          <div className="relative min-h-[300px] md:min-h-[330px] lg:min-h-[380px]">
            {stages.map((s, i) => (
              <motion.div
                key={s.eyebrow}
                className="absolute inset-0"
                initial={false}
                animate={
                  i === stage
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: i < stage ? -24 : 24, filter: "blur(8px)" }
                }
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden={i !== stage}
              >
                <p className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-brass mb-6">{s.eyebrow}</p>
                {i === 0 ? (
                  <h1 className="font-display font-extrabold uppercase leading-[0.88]" style={{ fontSize: "clamp(2.5rem, min(8.5vw, 10vh), 7.5rem)" }}>
                    {s.title[0]}<br /><span className="text-brass">{s.title[1]}</span>
                  </h1>
                ) : (
                  <p className="font-display font-extrabold uppercase leading-[0.88]" style={{ fontSize: "clamp(2.5rem, min(8.5vw, 10vh), 7.5rem)" }}>
                    {s.title[0]}<br /><span className="text-brass">{s.title[1]}</span>
                  </p>
                )}
                <p className="mt-6 max-w-md text-steel-light text-base md:text-lg leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Lathe */}
          <div className="relative hidden sm:block w-full max-w-[520px] lg:max-w-none self-center lg:self-auto">
            <Lathe p={p} />
          </div>
        </div>

        {/* Persistent CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-0 inset-x-0 z-20"
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-8 md:pb-10">
            <div className="border-t border-hairline pt-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-steel">
                Est. 1979 · Ludhiana · MSME · ISO Certified
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="#turning" className="hidden sm:inline-flex items-center gap-2 px-6 py-3.5 border border-hairline text-paper font-mono text-xs tracking-[0.15em] uppercase hover:border-brass hover:text-brass transition-colors">
                  Turning &amp; Job Work <span aria-hidden>→</span>
                </MagneticButton>
                <MagneticButton href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-brass text-ink font-mono text-xs tracking-[0.15em] uppercase hover:bg-brass-bright transition-colors">
                  Request Quote <span aria-hidden>→</span>
                </MagneticButton>
              </div>
            </div>
            {!reduce && <ProgressTicks p={p} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Readout({ p }: { p: MotionValue<number> }) {
  const [txt, setTxt] = useState("Ø 60.000");
  useMotionValueEvent(p, "change", (v) => {
    const d = 60 - Math.min(1, v * 1.4) * 18;
    setTxt(`Ø ${d.toFixed(3)}`);
  });
  return (
    <div className="absolute top-24 right-6 md:right-10 font-mono text-[10px] tracking-[0.2em] text-brass/80 hidden md:block tabular-nums">
      {txt} mm · TOL ±0.005
    </div>
  );
}

function ProgressTicks({ p }: { p: MotionValue<number> }) {
  const w = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="mt-5 h-px bg-hairline relative overflow-hidden" aria-hidden>
      <motion.div className="absolute inset-y-0 left-0 bg-brass" style={{ width: w }} />
    </div>
  );
}

/* SVG lathe. Bar spins (stripe offset), tool post travels along Z and steps
   in on X, cut segments reveal the stepped profile, chips fly, then the
   inspection caliper sweeps in. All values are pure functions of progress,
   so scrolling up reverses the cut. */
function Lathe({ p }: { p: MotionValue<number> }) {
  const stripe = useTransform(p, (v) => -v * 2400);
  const toolX = useTransform(p, [0.08, 0.3, 0.32, 0.48, 0.5, 0.62], [580, 410, 410, 290, 580, 500]);
  const toolY = useTransform(p, [0, 0.08, 0.3, 0.32, 0.48, 0.5, 0.62, 0.7], [290, 261, 241, 249, 249, 233, 233, 300]);
  const cut1 = useTransform(p, [0.08, 0.3], [0, 1]);
  const cut2 = useTransform(p, [0.3, 0.48], [0, 1]);
  const cut3 = useTransform(p, [0.48, 0.62], [0, 1]);
  const chipsOpacity = useTransform(p, [0.05, 0.1, 0.6, 0.65], [0, 1, 1, 0]);
  const shine = useTransform(p, [0.62, 0.78], [0, 1]);
  const caliper = useTransform(p, [0.78, 0.92], [0, 1]);
  const caliperY = useTransform(caliper, [0, 1], [-60, 0]);
  const glow = useTransform(p, [0.05, 0.6, 0.7], [0.2, 0.8, 0.3]);

  // stepped profile (y half-heights from axis y=200)
  const seg = (x: number, w: number, h: number) => `M${x},${200 - h} h${w} v${h * 2} h${-w} Z`;

  return (
    <svg viewBox="0 0 680 400" className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" role="img" aria-label="Animated CNC lathe turning a steel bar into a stepped precision shaft">
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d6066" />
          <stop offset="0.35" stopColor="#d9dbe0" />
          <stop offset="0.55" stopColor="#9a9da3" />
          <stop offset="1" stopColor="#3a3c40" />
        </linearGradient>
        <linearGradient id="brassG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b08d57" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f0d29d" stopOpacity="0.9" />
          <stop offset="1" stopColor="#b08d57" stopOpacity="0" />
        </linearGradient>
        <pattern id="spin" width="24" height="200" patternUnits="userSpaceOnUse">
          <rect width="24" height="200" fill="transparent" />
          <rect width="3" height="200" fill="#000" opacity="0.12" />
        </pattern>
        <radialGradient id="spark" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset="1" stopColor="#b08d57" stopOpacity="0" />
        </radialGradient>
        <clipPath id="barClip"><rect x="120" y="140" width="460" height="120" /></clipPath>
      </defs>

      {/* bed + headstock + tailstock */}
      <rect x="20" y="300" width="640" height="18" fill="#1b1b1e" stroke="#2a2b2f" />
      <rect x="20" y="110" width="100" height="190" rx="4" fill="#131315" stroke="#2a2b2f" />
      <rect x="96" y="150" width="30" height="100" fill="#26272b" stroke="#3a3b40" />
      <text x="34" y="135" fill="#8b8d92" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2">SPINDLE</text>
      <rect x="590" y="170" width="70" height="130" rx="4" fill="#131315" stroke="#2a2b2f" />
      <path d="M590,200 l-14,-8 v16 Z" fill="#8b8d92" />

      {/* bar stock: full raw diameter, then step reliefs drawn as darker "removed" zones */}
      <g clipPath="url(#barClip)">
        <rect x="120" y="140" width="460" height="120" fill="url(#steel)" />
        <motion.rect x="120" y="140" width="2800" height="120" fill="url(#spin)" style={{ x: stripe }} />
        {/* removed material reveals ink background → stepped profile */}
        <motion.path d={`M580,140 H410 V160 H580 Z M580,240 H410 V260 H580 Z`} fill="#0a0a0b" style={{ opacity: cut1 }} />
        <motion.path d={`M410,140 H290 V152 H410 Z M410,248 H290 V260 H410 Z`} fill="#0a0a0b" style={{ opacity: cut2 }} />
        <motion.path d={`M580,160 H500 V168 H580 Z M580,232 H500 V240 H580 Z`} fill="#0a0a0b" style={{ opacity: cut3 }} />
        <motion.path d={seg(120, 460, 60)} fill="url(#brassG)" style={{ opacity: shine, mixBlendMode: "screen" }} />
      </g>

      {/* axis line */}
      <line x1="110" y1="200" x2="600" y2="200" stroke="#b08d57" strokeOpacity="0.35" strokeDasharray="6 6" />

      {/* tool post */}
      <motion.g style={{ x: toolX, y: toolY }}>
        <circle cx="0" cy="0" r="22" fill="url(#spark)" opacity="0.8" />
        <path d="M0,0 L-10,20 L16,20 Z" fill="#e6e7ea" stroke="#3a3b40" />
        <rect x="-14" y="20" width="44" height="46" fill="#1b1b1e" stroke="#2a2b2f" />
        <motion.g style={{ opacity: chipsOpacity }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} className="chip" cx={-4 - i * 3} cy={-2 + (i % 3) * 3} r={1.6} fill="#f0d29d" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </motion.g>
      </motion.g>

      {/* coolant glow on bar */}
      <motion.ellipse cx="350" cy="200" rx="240" ry="70" fill="#b08d57" style={{ opacity: glow }} filter="blur(30px)" opacity="0.15" />

      {/* inspection caliper */}
      <motion.g style={{ opacity: caliper, y: caliperY }}>
        <line x1="290" y1="120" x2="290" y2="290" stroke="#d3ac74" strokeWidth="1.5" />
        <line x1="410" y1="120" x2="410" y2="290" stroke="#d3ac74" strokeWidth="1.5" />
        <line x1="290" y1="112" x2="410" y2="112" stroke="#d3ac74" strokeWidth="1.5" markerEnd="" />
        <rect x="300" y="78" width="100" height="24" fill="#0a0a0b" stroke="#d3ac74" />
        <text x="350" y="95" textAnchor="middle" fill="#d3ac74" fontFamily="IBM Plex Mono" fontSize="12">Ø42.000 ✓</text>
        <text x="350" y="330" textAnchor="middle" fill="#8b8d92" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2">PASS · ±0.005</text>
      </motion.g>
    </svg>
  );
}
