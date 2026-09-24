import { type ReactNode } from "react";
import clsx from "clsx";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "telekom";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold tracking-wide",
        tone === "neutral" && "border-fg/16 text-fg/80",
        tone === "telekom" &&
          "border-magenta/40 bg-magenta/10 text-[#FF6FB4]",
        className
      )}
    >
      {tone === "telekom" && (
        <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
      )}
      {children}
    </span>
  );
}
