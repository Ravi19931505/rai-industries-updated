// Client has not yet supplied factory/product photography.
// This component renders a premium abstract stand-in (metallic gradient +
// blueprint grid + turned-metal rings) so layout & art direction can be
// judged now, and is designed to be swapped 1:1 for a real <img> later —
// just replace the returned markup with <img src=... alt=... />.

export default function PlaceholderPhoto({
  alt,
  variant = "steel",
  className = "",
  src,
  kenBurns = false,
}: {
  alt: string;
  variant?: "steel" | "brass" | "dark";
  className?: string;
  src?: string;
  kenBurns?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover ${kenBurns ? "animate-ken-burns" : ""}`}
        />
      </div>
    );
  }

  const gradients: Record<string, string> = {
    steel: "radial-gradient(circle at 30% 20%, #3a3c40 0%, #17181a 60%, #0a0a0b 100%)",
    brass: "radial-gradient(circle at 70% 30%, #4a3c26 0%, #1a1712 55%, #0a0a0b 100%)",
    dark: "radial-gradient(circle at 50% 50%, #1e1f22 0%, #0a0a0b 70%)",
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradients[variant] }}
    >
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="140" fill="none" stroke="#b08d57" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#8b8d92" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#8b8d92" strokeWidth="0.5" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#2a2b2f" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="#2a2b2f" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 grain" />
      <span className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.15em] text-steel/50 uppercase">
        Photography pending
      </span>
    </div>
  );
}
