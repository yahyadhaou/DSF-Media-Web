import { type ReactNode } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1280px] px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}
