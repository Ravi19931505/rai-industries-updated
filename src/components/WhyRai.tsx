import { whyRai } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

export default function WhyRai() {
  return (
    <section className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>Why R.A.I</Eyebrow>
            <SectionNumber n="09" />
          </div>
        </Reveal>
        <HeadlineReveal>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-16 max-w-3xl">
            The Difference Is
            <br />
            <span className="text-brass">In The Detail.</span>
          </h2>
        </HeadlineReveal>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {whyRai.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="border-t-2 border-brass pt-6">
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl text-paper mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-steel-light leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
