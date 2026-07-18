import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./layout-primitives";

/* ------------------------------ Stat Card ------------------------------ */

export function StatCard({
  label,
  value,
  hint,
  trend,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  trend?: { direction: "up" | "down" | "flat"; label: string };
  className?: string;
}) {
  const trendColor =
    trend?.direction === "up"
      ? "text-success"
      : trend?.direction === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <Card className={cn("flex flex-col gap-2", className)}>
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {value}
      </div>
      {(hint || trend) && (
        <div className="flex items-center justify-between text-xs">
          {hint ? <span className="text-muted-foreground">{hint}</span> : <span />}
          {trend ? <span className={cn("font-medium", trendColor)}>{trend.label}</span> : null}
        </div>
      )}
    </Card>
  );
}

/* ------------------------------ List ------------------------------ */

export function List({
  items,
  className,
  emptyLabel = "No items",
}: {
  items: Array<{ id: string; title: ReactNode; meta?: ReactNode; trailing?: ReactNode }>;
  className?: string;
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }
  return (
    <ul className={cn("divide-y divide-border/60 rounded-xl border border-border/60 bg-card/40", className)}>
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-foreground">{item.title}</span>
            {item.meta ? (
              <span className="text-xs text-muted-foreground">{item.meta}</span>
            ) : null}
          </div>
          {item.trailing}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Timeline (placeholder) ------------------------------ */

export function Timeline({
  items,
  className,
}: {
  items: Array<{ id: string; title: ReactNode; description?: ReactNode; timestamp?: ReactNode }>;
  className?: string;
}) {
  return (
    <ol className={cn("relative flex flex-col gap-6 pl-5", className)}>
      <span aria-hidden className="absolute left-1.5 top-1 h-full w-px bg-border/60" />
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-[18px] top-1.5 h-2 w-2 rounded-full bg-foreground/70"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-foreground">{item.title}</span>
              {item.timestamp ? (
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              ) : null}
            </div>
            {item.description ? (
              <p className="text-xs text-muted-foreground">{item.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------ Pagination (placeholder) ------------------------------ */

export function PaginationPlaceholder({
  page,
  total,
  className,
}: {
  page: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-xs text-muted-foreground",
        className,
      )}
    >
      <span>
        Page {page} of {total}
      </span>
      <span className="italic">Pagination controls arrive in a later phase.</span>
    </div>
  );
}
