import { materials } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

export default function Materials() {
  return (
    <section className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>Material Expertise</Eyebrow>
            <SectionNumber n="07" />
          </div>
        </Reveal>
        <HeadlineReveal>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-14 max-w-2xl">
            Metals We Master.
          </h2>
        </HeadlineReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="border-r border-b border-hairline p-8 h-full min-h-[220px] flex flex-col justify-between hover:bg-surface/50 transition-colors">
                <span className="font-mono text-[10px] tracking-[0.2em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display font-bold uppercase text-2xl text-paper mb-4">
                    {m.name}
                  </h3>
                  <p className="font-mono text-xs tracking-[0.05em] text-brass leading-relaxed">
                    {m.grades.join(" · ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
