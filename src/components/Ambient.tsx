import { useEffect, useRef } from "react";

/* Fixed brass light ribbons (screen-blended) that drift with scroll + mouse,
   plus a dot/ring cursor on fine pointers. Both skip under reduced motion. */
export function AmbientLight() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("pointermove", onMove);
    const tick = (t: number) => {
      cx += (mx - cx) * 0.05; cy += (my - cy) * 0.05;
      const s = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      const drift = Math.sin(t / 4000) * 30;
      if (a.current) a.current.style.transform = `translate(${cx * 80 + drift}px, ${s * -400 + cy * 60}px) rotate(${s * 40}deg)`;
      if (b.current) b.current.style.transform = `translate(${-cx * 60 - drift}px, ${s * 300 - cy * 40}px) rotate(${-s * 30}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);
  return (
    <div className="ambient-bg" aria-hidden>
      <div ref={a} className="absolute -top-[20vh] -left-[10vw] w-[60vw] h-[60vw] rounded-full opacity-[0.16] blur-[120px]" style={{ background: "radial-gradient(circle, #b08d57 0%, transparent 65%)" }} />
      <div ref={b} className="absolute top-[40vh] -right-[15vw] w-[55vw] h-[55vw] rounded-full opacity-[0.12] blur-[140px]" style={{ background: "radial-gradient(circle, #d3ac74 0%, transparent 65%)" }} />
    </div>
  );
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const hot = (e.target as HTMLElement)?.closest?.("a, button, input, select, textarea, [role=button]");
      ring.current?.classList.toggle("is-hover", !!hot);
    };
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) { dot.current.style.left = `${x}px`; dot.current.style.top = `${y}px`; }
      if (ring.current) { ring.current.style.left = `${rx}px`; ring.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <>
      <div ref={ring} className="cursor-ring hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden />
      <div ref={dot} className="cursor-dot hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden />
    </>
  );
}

export function IndustryMarquee() {
  const items = ["Tractor", "Automotive", "Agricultural Machinery", "Industrial Equipment", "Hydraulics", "Pumps & Valves", "OEM Supply", "Export"];
  const row = [...items, ...items];
  return (
    <section aria-label="Industries served" className="relative py-10 md:py-14 border-y border-hairline overflow-hidden">
      <div className="flex w-max marquee-track gap-12 md:gap-16">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 md:gap-16 font-display font-extrabold uppercase text-4xl md:text-6xl whitespace-nowrap">
            <span className={i % 2 ? "text-outline" : "text-paper"}>{t}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-brass" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
