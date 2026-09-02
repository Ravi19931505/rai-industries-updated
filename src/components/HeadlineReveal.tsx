import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Signature headline entrance: a left-to-right clip-path wipe, like a
// measurement line sweeping across — tied to the site's blueprint/precision
// motif instead of the generic fade-up used for body copy. Marketing/
// explanatory context, so the longer duration is intentional (see animate
// skill duration table).
//
// clip-path isn't a transform, so MotionConfig's reducedMotion="user" won't
// auto-disable it — checked explicitly here and swapped for a plain
// opacity fade instead of removing the entrance entirely.
export default function HeadlineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.3, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
