import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { turningServices, jobWorkTerms } from "../data/content";

export default function TurningServices() {
  return (
    <section id="turning" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.12]" aria-hidden />
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-brass mb-6">CNC Turning &amp; Job Work</p>
        </Reveal>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-24">
          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold uppercase leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.75rem)" }}>
              Your Drawing.<br /><span className="text-brass">Our Lathes.</span><br />On Time.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-steel-light text-lg leading-relaxed max-w-xl">
              Ludhiana’s industrial base runs on reliable job work. We take your drawing or sample and deliver
              turned components in batches from prototype to production — on our own CNC machines, under one roof,
              with inspection reports on request.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {turningServices.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass group relative rounded-2xl p-7 md:p-8 overflow-hidden hover:border-brass/60 transition-colors"
              style={{ transformPerspective: 900 }}
            >
              <span className="absolute -right-2 -top-6 font-display font-extrabold text-[7rem] leading-none text-outline select-none" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="w-11 h-11 rounded-full border border-brass/40 flex items-center justify-center mb-8 shadow-[0_0_24px_rgba(176,141,87,.25)]">
                  <span className="w-2 h-2 rounded-full bg-brass" />
                </div>
                <h3 className="font-display font-bold uppercase text-2xl md:text-[1.7rem] mb-3">{s.title}</h3>
                <p className="text-steel-light leading-relaxed text-[15px]">{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-y border-hairline">
            {jobWorkTerms.map((t, i) => (
              <div key={t.label} className={`py-8 px-4 md:px-6 ${i > 0 ? "md:border-l" : ""} ${i % 2 ? "border-l md:border-l" : ""} border-hairline`}>
                <p className="font-display font-extrabold text-3xl md:text-4xl text-paper">{t.value}</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel mt-2">{t.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
