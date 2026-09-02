import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

// Magnetic hover: the element pulls slightly toward the cursor within its
// bounds, then springs back. Respects prefers-reduced-motion automatically
// via MotionConfig(reducedMotion="user") set at the app root. The pull only
// engages on devices with real hover + a fine pointer — on touch, a tapped
// button would otherwise visibly drift from a synthetic mousemove before
// the page navigates.
export default function MagneticButton({
  children,
  className = "",
  as: Tag = "a",
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function canMagnet() {
    return typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function handleMove(e: React.MouseEvent) {
    if (!canMagnet()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.25, y: relY * 0.35 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  const MotionTag = motion[Tag as "a"];

  return (
    <MotionTag
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
