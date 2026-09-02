import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>How We Work</Eyebrow>
            <SectionNumber n="05" />
          </div>
        </Reveal>
        <HeadlineReveal>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-16 max-w-2xl">
            From Drawing
            <br />
            <span className="text-brass">To Dispatch.</span>
          </h2>
        </HeadlineReveal>

        <div ref={ref} className="relative">
          <div className="absolute top-[13px] left-0 right-0 h-px bg-hairline hidden md:block" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-[13px] left-0 h-px bg-brass hidden md:block"
          />

          <div className="grid md:grid-cols-6 gap-8 md:gap-4">
            {process.map((step, i) => (
              <Reveal key={step.id} delay={i * 0.06}>
                <div className="relative pt-8">
                  <span className="absolute top-0 left-0 w-2 h-2 rounded-full bg-brass hidden md:block" />
                  <span className="font-mono text-xs text-steel tracking-[0.2em]">
                    {step.id}
                  </span>
                  <p className="font-display font-bold uppercase text-xl md:text-2xl text-paper mt-2 leading-tight">
                    {step.name}
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-steel mt-2">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
