import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Turning", href: "#turning" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Machines", href: "#machines" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-hairline" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
        <a
          href="#top"
          className="font-display text-lg md:text-xl tracking-wide text-paper uppercase"
        >
          R.A.I <span className="text-brass">Industries</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-[0.15em] uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`transition-colors ${
                  activeHref === l.href ? "text-brass" : "text-steel-light hover:text-brass"
                }`}
                aria-current={activeHref === l.href ? "true" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <MagneticButton
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 border border-brass text-brass px-5 py-3 min-h-11 font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-brass hover:text-ink transition-colors"
        >
          Request Quote <span aria-hidden>→</span>
        </MagneticButton>

        <button
          className="lg:hidden text-paper w-11 h-11 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-px bg-paper" />
          <span className="block w-6 h-px bg-paper" />
          <span className="block w-4 h-px bg-paper self-start ml-[9px]" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "top" }}
            className="lg:hidden bg-ink border-t border-hairline px-6 py-6"
          >
            <ul className="flex flex-col gap-1 font-mono text-sm tracking-[0.15em] uppercase text-steel-light">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 min-h-11"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block py-3 min-h-11 text-brass"
                >
                  Request Quote →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
