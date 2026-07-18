import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb placeholder — derives labels from the current path segments.
 */
export function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        to="/"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Home
      </Link>
      {crumbs.map((c, i) => (
        <Fragment key={c.href}>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          {i === crumbs.length - 1 ? (
            <span aria-current="page" className="text-foreground">
              {c.label}
            </span>
          ) : (
            <span className="text-muted-foreground">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
