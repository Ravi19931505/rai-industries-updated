import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data/content";

function CountUp({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!inView) return;
    const numMatch = value.match(/\d+/);
    if (!numMatch) {
      setDisplay(value);
      return;
    }
    const target = parseInt(numMatch[0], 10);
    const prefix = value.slice(0, numMatch.index);
    const suffix = value.slice((numMatch.index ?? 0) + numMatch[0].length);
    const duration = 900;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display font-extrabold text-5xl md:text-7xl text-paper">
      {display}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-hairline">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`px-6 md:px-10 py-12 md:py-16 ${
              i !== 0 ? "border-l border-hairline" : ""
            } ${i < 2 ? "border-b md:border-b-0 border-hairline" : ""}`}
          >
            <CountUp value={s.value} />
            <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-steel">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
