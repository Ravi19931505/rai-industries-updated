import { useRef } from "react";
import { shopFloor } from "../data/content";
import { Eyebrow, SectionNumber } from "./Chrome";
import PlaceholderPhoto from "./PlaceholderPhoto";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";
import cncTurningBayPhoto from "../assets/photos/shopfloor/cnc-turning-bay.webp";
import precisionGrindingPhoto from "../assets/photos/shopfloor/precision-grinding.webp";
import productionFloorPhoto from "../assets/photos/shopfloor/production-floor.webp";
import finishedComponentsPhoto from "../assets/photos/shopfloor/finished-components.webp";
import qualityInspectionPhoto from "../assets/photos/shopfloor/quality-inspection.webp";
import dispatchPackingPhoto from "../assets/photos/shopfloor/dispatch-packing.webp";

const shopFloorPhotos: Record<string, string> = {
  "CNC Turning Bay": cncTurningBayPhoto,
  "Precision Grinding": precisionGrindingPhoto,
  "Production Floor": productionFloorPhoto,
  "Finished Components": finishedComponentsPhoto,
  "Quality Inspection": qualityInspectionPhoto,
  "Dispatch & Packing": dispatchPackingPhoto,
};

export default function ShopFloor() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section id="shop-floor" className="py-24 md:py-32 border-b border-hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <Eyebrow>Inside The Shop</Eyebrow>
                <SectionNumber n="08" />
              </div>
            </Reveal>
            <HeadlineReveal>
              <h2 className="font-display font-extrabold uppercase text-paper leading-[0.92] text-4xl md:text-5xl lg:text-6xl">
                Steel, Sweat
                <br />
                <span className="text-brass">&amp; Precision.</span>
              </h2>
            </HeadlineReveal>
          </div>

          <Reveal delay={0.1} className="flex gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll gallery left"
              className="w-11 h-11 border border-hairline flex items-center justify-center hover:border-brass hover:text-brass active:scale-95 transition-transform transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll gallery right"
              className="w-11 h-11 border border-hairline flex items-center justify-center hover:border-brass hover:text-brass active:scale-95 transition-transform transition-colors"
            >
              →
            </button>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        {/* Edge fade: signals there's more to scroll without a visible
            scrollbar. Pure CSS mask, no JS — cheapest tool that works. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--color-ink), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--color-ink), transparent)" }}
        />
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto px-6 md:px-10 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shopFloor.map((label, i) => (
            <div
              key={label}
              className="relative shrink-0 w-[75vw] sm:w-[420px] aspect-[4/5] snap-start"
            >
              <PlaceholderPhoto
                alt={`${label} at R.A.I Industries`}
                variant={i % 2 === 0 ? "dark" : "steel"}
                src={shopFloorPhotos[label]}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-steel/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display font-semibold uppercase text-2xl text-paper mt-1">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
