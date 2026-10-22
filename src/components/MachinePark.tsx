import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { machines } from "../data/content";

/* Horizontal-scroll machine showcase: a tall wrapper pins a sticky track that
   translates on X with vertical scroll. Reduced motion → native swipe row. */
export default function MachinePark() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * dist);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const header = (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-brass mb-5">Machine Park</p>
        <h2 className="font-display font-extrabold uppercase leading-[0.9]" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)" }}>
          The Floor Behind<br /><span className="text-brass">Every Part.</span>
        </h2>
      </div>
      <p className="max-w-sm text-steel-light leading-relaxed">
        Multiple CNC lathes and supporting machines — turning, milling, grinding, honing and fabrication in one facility in Sahnewal, Ludhiana.
      </p>
    </div>
  );

  const cards = machines.map((m, i) => (
    <article key={m.name} className="group relative shrink-0 w-[78vw] sm:w-[46vw] lg:w-[32vw] xl:w-[28vw] snap-start">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline bg-surface">
        {m.photo ? (
          <img src={m.photo} alt={m.name} className="hover-zoom w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full blueprint-grid" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <span className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.2em] uppercase text-steel bg-ink/70 px-3 py-1.5 rounded-full border border-hairline">
          {String(i + 1).padStart(2, "0")} / {String(machines.length).padStart(2, "0")}
        </span>
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-7">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-brass mb-2">{m.type}</p>
          <h3 className="font-display font-bold uppercase text-3xl leading-none mb-3">{m.name}</h3>
          <p className="text-steel-light text-sm leading-relaxed">{m.spec}</p>
        </div>
      </div>
    </article>
  ));

  if (reduce) {
    return (
      <section id="machines" className="py-24">
        {header}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-4">{cards}</div>
      </section>
    );
  }

  return (
    <section ref={ref} id="machines" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="flex gap-5 px-6 md:px-10 will-change-transform">
          {cards}
        </motion.div>
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-10 mt-10">
          <div className="h-px bg-hairline relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 bg-brass" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
