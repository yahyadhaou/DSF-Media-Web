export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
        {eyebrow}
      </span>
      <h2 className="font-display max-w-2xl text-3xl font-bold text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base leading-relaxed text-fg/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
