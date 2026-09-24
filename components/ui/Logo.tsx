import { Link } from "@/i18n/navigation";

const variants = {
  light: { bars: ["#EAF6F6", "#BFE9E6", "#17C9C4"], word: "#FFFFFF", sub: "#8FA3B8" },
  dark: { bars: ["#0B3D5C", "#127C9E", "#17C9C4"], word: "#0B2A3D", sub: "#17ABA6" },
} as const;

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  const c = variants[variant];
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 96 96" width="26" height="26" fill="none" aria-hidden>
        <rect x="14" y="58" width="14" height="24" rx="6" fill={c.bars[0]} />
        <rect x="41" y="40" width="14" height="42" rx="6" fill={c.bars[1]} />
        <rect x="68" y="18" width="14" height="64" rx="6" fill={c.bars[2]} />
      </svg>
      <span className="font-display text-lg font-bold" style={{ color: c.word }}>
        DSF <span className="font-sans font-semibold" style={{ color: c.sub }}>Media</span>
      </span>
    </Link>
  );
}
