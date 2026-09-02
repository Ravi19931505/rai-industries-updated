import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";
import { Eyebrow } from "./Chrome";
import { company } from "../data/content";
import MagneticButton from "./MagneticButton";

export default function FinalCTA() {
  return (
    <section className="py-28 md:py-40 border-b border-hairline relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
        </Reveal>
        <HeadlineReveal>
          <h2
            className="font-display font-extrabold uppercase text-paper leading-[0.9] mb-10"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            Let's Make
            <br />
            <span className="text-brass">Something Precise.</span>
          </h2>
        </HeadlineReveal>
        <Reveal delay={0.1}>
          <blockquote className="max-w-xl text-steel-light text-lg md:text-xl italic border-l-2 border-brass pl-6 mb-10">
            "Send us your drawing. We'll send you a quote in 24 hours — and a
            perfect part shortly after."
          </blockquote>

          <div className="flex flex-wrap gap-4">
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brass text-ink font-mono text-xs tracking-[0.15em] uppercase hover:bg-brass-bright transition-colors"
            >
              Send Enquiry <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-hairline text-paper font-mono text-xs tracking-[0.15em] uppercase hover:border-brass hover:text-brass transition-colors"
            >
              WhatsApp Us
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
