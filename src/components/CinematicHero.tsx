import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import { photos } from "../data/content";

/* Full-bleed cinematic video hero.
   - Drop a real clip at public/video/hero.mp4 (+ public/video/hero-poster.jpg).
   - Desktop: pinned 260vh scroll-scrub — the clip advances with scroll and
     reverses on scroll-up (lerped currentTime, no stutter).
   - Mobile / reduced motion / no clip yet: the clip autoplays muted on loop,
     or the hero photo runs a slow cinematic push-in.
   Headline stages crossfade over the footage; the CTA is always visible. */

const VIDEO_SRC = "/video/hero.mp4";
const POSTER_SRC = "/video/hero-poster.jpg";

const stages = [
  { eyebrow: "Est. 1979 · Ludhiana, India", a: "Precision Held", b: "To The Micron." },
  { eyebrow: "CNC Turning & Job Work", a: "Your Drawing.", b: "Our Lathes." },
  { eyebrow: "Turned · Ground · Honed", a: "One Roof.", b: "Every Process." },
  { eyebrow: "Inspected Before Dispatch", a: "Held To", b: "±5 Microns." },
];

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [hasVideo, setHasVideo] = useState(false);
  const [scrub, setScrub] = useState(false);
  const [stage, setStage] = useState(0);

  // Scrub on fine-pointer desktops; phones loop the clip instead.
  useEffect(() => {
    setScrub(!reduce && window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setStage(Math.min(stages.length - 1, Math.floor(v * stages.length * 0.999)));
  });

  // Mobile/looping: still rotate the headline on a timer.
  useEffect(() => {
    if (scrub || reduce) return;
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 3200);
    return () => clearInterval(id);
  }, [scrub, reduce]);

  // Lerp the clip's currentTime toward scroll progress.
  useEffect(() => {
    const v = video.current;
    if (!v || !hasVideo) return;
    if (!scrub) { v.loop = true; v.play().catch(() => {}); return; }
    v.pause();
    let current = 0, raf = 0;
    const tick = () => {
      if (v.duration) {
        const target = scrollYProgress.get() * (v.duration - 0.05);
        const diff = target - current;
        if (Math.abs(diff) > 0.004) { current += diff * 0.16; v.currentTime = current; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasVideo, scrub, scrollYProgress]);

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const veil = useTransform(scrollYProgress, [0, 0.85, 1], [0.35, 0.45, 0.75]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pinned = scrub;

  return (
    <section ref={ref} id="top" className={pinned ? "relative h-[260vh]" : "relative"}>
      <div className={pinned ? "sticky top-0 h-screen overflow-hidden" : "relative h-[100svh] min-h-[620px] overflow-hidden"}>
        {/* Footage */}
        <motion.div className="absolute inset-0" style={{ scale: pinned ? scale : 1 }}>
          <img
            src={photos.hero}
            alt="CNC turning in progress on the R.A.I Industries shop floor"
            className={`absolute inset-0 w-full h-full object-cover ${hasVideo ? "opacity-0" : "animate-ken-burns"}`}
          />
          <video
            ref={video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hasVideo ? "opacity-100" : "opacity-0"}`}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setHasVideo(true)}
            onError={() => setHasVideo(false)}
            aria-hidden
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="absolute top-24 left-6 md:left-10 font-mono text-[10px] tracking-[0.2em] text-steel/70 hidden md:block">X 00.000 · Y 00.000</div>
        <div className="absolute top-24 right-6 md:right-10 font-mono text-[10px] tracking-[0.2em] text-brass/80 hidden md:block">● REC — SHOP FLOOR</div>

        {/* Headline stages */}
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-44 md:pb-52">
          <div className="relative min-h-[220px] md:min-h-[300px]">
            {stages.map((s, i) => (
              <motion.div
                key={s.a}
                className="absolute inset-x-0 bottom-0"
                initial={false}
                animate={i === stage ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: i < stage ? -30 : 30, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden={i !== stage}
              >
                <p className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase text-brass mb-5">{s.eyebrow}</p>
                {i === 0 ? (
                  <h1 className="font-display font-extrabold uppercase leading-[0.88]" style={{ fontSize: "clamp(2.75rem, min(10vw, 13vh), 9rem)" }}>
                    {s.a}<br /><span className="text-brass">{s.b}</span>
                  </h1>
                ) : (
                  <p className="font-display font-extrabold uppercase leading-[0.88]" style={{ fontSize: "clamp(2.75rem, min(10vw, 13vh), 9rem)" }}>
                    {s.a}<br /><span className="text-brass">{s.b}</span>
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Persistent CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="absolute bottom-0 inset-x-0 z-20">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-8 md:pb-10">
            <div className="border-t border-hairline pt-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <p className="max-w-md text-steel-light text-sm md:text-base leading-relaxed">
                45 years of CNC machining for tractor, automotive and industrial components — turned, finished and inspected in-house.
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
            {pinned && (
              <div className="mt-5 h-px bg-hairline relative overflow-hidden" aria-hidden>
                <motion.div className="absolute inset-y-0 left-0 bg-brass" style={{ width: bar }} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
