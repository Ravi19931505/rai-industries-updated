import { Eyebrow, SectionNumber } from "./Chrome";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";
import ProductOrbital from "./ProductOrbital";

export default function Products() {
  return (
    <section id="products" className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <Eyebrow>Part Catalogue</Eyebrow>
            <SectionNumber n="06" />
          </div>
        </Reveal>
        <HeadlineReveal>
          <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl mb-14 max-w-2xl">
            What We Make.
          </h2>
        </HeadlineReveal>

        <Reveal delay={0.1}>
          <ProductOrbital />
        </Reveal>
      </div>
    </section>
  );
}
