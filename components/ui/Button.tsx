import { type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";

type Variant = "primary" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal text-[#06302E] hover:bg-teal-bright shadow-[0_0_0_1px_rgba(23,201,196,0.4)]",
  outline:
    "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  ghost: "text-white/80 hover:text-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  [key: string]: unknown;
}) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-colors",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}
