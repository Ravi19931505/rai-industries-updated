import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import MagneticButton from "./MagneticButton";
import { photos } from "../data/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-end overflow-hidden pt-24">
      <motion.div className="absolute inset-0" style={{ y }}>
        <PlaceholderPhoto
          alt="Cinematic view of CNC turning in progress on a precision shaft, R.A.I Industries shop floor"
          variant="steel"
          src={photos.hero}
          kenBurns
          className="w-full h-[130%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </motion.div>

      {/* coordinate ticks */}
      <div className="absolute top-24 left-6 md:left-10 font-mono text-[10px] tracking-[0.2em] text-steel/70 hidden md:block">
        X 00.000 &nbsp; Y 00.000
      </div>
      <div className="absolute top-24 right-6 md:right-10 font-mono text-[10px] tracking-[0.2em] text-steel/70 hidden md:block">
        FIG. 00 — HERO
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-10 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-brass mb-6"
        >
          Est. 1979 · Ludhiana, India · MSME Registered
        </motion.p>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
          transition={
            reduceMotion
              ? { duration: 0.3, delay: 0.1 }
              : { duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }
          }
        >
          <h1
            className="font-display font-extrabold uppercase text-paper leading-[0.88]"
            style={{ fontSize: "clamp(2.75rem, 11vw, 8.5rem)" }}
          >
            Precision Held
            <br />
            <span className="text-brass">To The Micron.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-hairline pt-8"
        >
          <p className="max-w-md text-steel-light text-base md:text-lg leading-relaxed">
            45 years of CNC machining excellence. Tractor, automotive and
            industrial components manufactured to exceptionally tight
            tolerances.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton
              href="#capabilities"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-hairline text-paper font-mono text-xs tracking-[0.15em] uppercase hover:border-brass hover:text-brass transition-colors"
            >
              Our Capabilities <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brass text-ink font-mono text-xs tracking-[0.15em] uppercase hover:bg-brass-bright transition-colors"
            >
              Request Quote <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
