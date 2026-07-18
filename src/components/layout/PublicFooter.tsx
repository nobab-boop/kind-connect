import { Link } from "@tanstack/react-router";
import { ResponsiveContainer } from "@/components/common";
import { PUBLIC_NAV } from "@/lib/navigation";
import { APP } from "@/lib/constants";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <ResponsiveContainer className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {APP.name}
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP.name}. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </ResponsiveContainer>
    </footer>
  );
}
