import { Link } from "@/i18n/navigation";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 96 96" width="26" height="26" fill="none" aria-hidden>
        <rect x="14" y="58" width="14" height="24" rx="6" fill="var(--logo-bar-1)" />
        <rect x="41" y="40" width="14" height="42" rx="6" fill="var(--logo-bar-2)" />
        <rect x="68" y="18" width="14" height="64" rx="6" fill="var(--logo-bar-3)" />
      </svg>
      <span className="font-display text-lg font-bold text-fg">
        DSF <span className="font-sans font-semibold text-teal-light">Media</span>
      </span>
    </Link>
  );
}
