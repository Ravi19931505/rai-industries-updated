import type { ReactNode } from "react";

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {index && (
        <span className="font-mono text-[11px] tracking-[0.2em] text-brass">{index}</span>
      )}
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-steel">
        {children}
      </span>
      <span className="h-px flex-1 max-w-16 bg-hairline" />
    </div>
  );
}

export function Frame({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative border border-hairline ${className}`}>
      <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-brass" />
      <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-brass" />
      <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-brass" />
      <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-brass" />
      {label && (
        <span className="absolute top-2 left-3 font-mono text-[10px] tracking-[0.2em] text-steel uppercase">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function SectionNumber({ n }: { n: string }) {
  return (
    <span className="font-mono text-[11px] tracking-[0.2em] text-steel/60">
      SEC. {n}
    </span>
  );
}
