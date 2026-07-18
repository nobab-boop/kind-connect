import type { ReactNode, HTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives — composable building blocks used across every page.
 * Prefer these over ad-hoc flex/grid classes in feature code.
 */

export function Container({
  size = "xl",
  className,
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: ReactNode;
}) {
  const max =
    size === "sm"
      ? "max-w-3xl"
      : size === "md"
        ? "max-w-5xl"
        : size === "lg"
          ? "max-w-6xl"
          : size === "full"
            ? "max-w-none"
            : "max-w-7xl";
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", max, className)}>{children}</div>
  );
}

export function ResponsiveWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <section className={cn("flex w-full flex-col gap-6 py-8 sm:py-10", className)} {...rest}>
      {children}
    </section>
  );
}

export function Stack({
  gap = 4,
  className,
  children,
  as: Tag = "div",
}: {
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article" | "ul" | "ol";
}) {
  const gapClass: Record<number, string> = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
  };
  return (
    <Tag className={cn("flex flex-col", gapClass[gap], className)}>{children}</Tag>
  );
}

export function FlexLayout({
  className,
  children,
  align,
  justify,
  wrap,
  direction = "row",
  gap = 3,
}: {
  className?: string;
  children: ReactNode;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  direction?: "row" | "col";
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
}) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        wrap && "flex-wrap",
        align && `items-${align}`,
        justify && `justify-${justify}`,
        `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Grid({
  cols = 3,
  gap = 4,
  className,
  children,
}: {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
  children: ReactNode;
}) {
  const colsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-12",
  };
  return (
    <div className={cn("grid", colsMap[cols], `gap-${gap}`, className)}>{children}</div>
  );
}

export function Spacer({ size = 4, axis = "y" }: { size?: 2 | 3 | 4 | 6 | 8 | 12; axis?: "x" | "y" }) {
  const style: CSSProperties =
    axis === "y" ? { height: `${size * 4}px` } : { width: `${size * 4}px`, display: "inline-block" };
  return <span aria-hidden style={style} />;
}

export function Divider({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return orientation === "vertical" ? (
    <span aria-hidden className={cn("inline-block h-full w-px bg-border/60", className)} />
  ) : (
    <hr className={cn("border-border/60", className)} />
  );
}

export function Surface({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-xl border border-border/60 bg-surface", className)}>{children}</div>
  );
}

export function Panel({
  title,
  actions,
  className,
  children,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-xl border border-border/60 bg-card/60 shadow-sm",
        className,
      )}
    >
      {title || actions ? (
        <header className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="text-sm font-medium text-foreground">{title}</div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ScrollableArea({
  className,
  children,
  maxHeight = "24rem",
}: {
  className?: string;
  children: ReactNode;
  maxHeight?: string;
}) {
  return (
    <div
      className={cn("overflow-y-auto pr-1", className)}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}

export function PageWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-h-full w-full flex-col gap-8 py-8 sm:py-10", className)}>
      {children}
    </div>
  );
}

export function DashboardWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-h-full w-full flex-col gap-6 p-4 sm:p-6 lg:p-8", className)}>
      {children}
    </div>
  );
}
