import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";
import PlaceholderPhoto from "./PlaceholderPhoto";
import { Eyebrow, SectionNumber } from "./Chrome";
import { photos } from "../data/content";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Photo drifts slower than the scroll — same depth technique as the Hero
  // background, reused here rather than inventing a new pattern.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <Reveal>
            <div className="flex items-center justify-between mb-6">
              <Eyebrow>The Company</Eyebrow>
              <SectionNumber n="03" />
            </div>
          </Reveal>
          <HeadlineReveal>
            <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-8">
              Four Decades of
              <br />
              <span className="text-brass">Unbroken Precision.</span>
            </h2>
          </HeadlineReveal>
          <Reveal delay={0.1}>
            <p className="text-steel-light text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Since 1979, R.A.I Industries has machined critical components for
              the tractor, automotive and general engineering sectors from its
              facility in Sahnewal, Ludhiana — building a reputation on
              tolerance held, not tolerance claimed.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10 max-w-md">
              <div className="border-t border-hairline pt-4">
                <p className="font-display font-extrabold text-3xl text-paper">1979</p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-steel mt-1">
                  Year Founded
                </p>
              </div>
              <div className="border-t border-hairline pt-4">
                <p className="font-display font-extrabold text-3xl text-paper">Ludhiana</p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-steel mt-1">
                  Sahnewal, Punjab
                </p>
              </div>
              <div className="border-t border-hairline pt-4">
                <p className="font-display font-extrabold text-2xl text-paper">MSME</p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-steel mt-1">
                  Registered
                </p>
              </div>
              <div className="border-t border-hairline pt-4">
                <p className="font-display font-extrabold text-2xl text-paper">ISO</p>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-steel mt-1">
                  Certified
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <motion.div
              className="absolute inset-x-0"
              style={reduceMotion ? undefined : { top: "-10%", height: "120%", y }}
            >
              <PlaceholderPhoto
                alt="Industrial photograph representing four decades of R.A.I Industries' precision manufacturing facility"
                variant="dark"
                src={photos.about}
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
