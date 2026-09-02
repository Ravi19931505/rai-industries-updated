import { motion, useScroll } from "framer-motion";

// A thin brass line across the very top of the viewport that fills with
// scroll position — framed as a measurement gauge, not a generic progress
// bar, to match the site's precision/blueprint visual language.
// Directly scroll-linked (no easing/lag added): scaleX should track the
// scrollbar 1:1, so smoothing it would only make it feel laggy.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-brass z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
