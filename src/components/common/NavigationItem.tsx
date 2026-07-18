import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  to: string;
  children: ReactNode;
  variant?: "public" | "sidebar";
  onClick?: () => void;
  exact?: boolean;
};

/**
 * NavigationItem — accessible route link with active-route highlighting.
 * TanStack Router's activeProps handles the aria-current + styling.
 */
export function NavigationItem({
  to,
  children,
  variant = "public",
  onClick,
  exact,
}: Props) {
  const base =
    variant === "sidebar"
      ? "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      : "inline-flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const activeClass =
    variant === "sidebar"
      ? "bg-accent text-foreground"
      : "text-foreground";

  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: !!exact }}
      activeProps={{ className: activeClass, "aria-current": "page" }}
      className={cn(base)}
    >
      {children}
    </Link>
  );
}

export function SidebarSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
        {label}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
