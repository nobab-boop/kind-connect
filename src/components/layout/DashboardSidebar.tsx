import { Link } from "@tanstack/react-router";
import { DASHBOARD_NAV, ADMIN_NAV } from "@/lib/navigation";
import { APP } from "@/lib/constants";
import {
  NavigationItem,
  SidebarSection,
} from "@/components/common/NavigationItem";

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside
      aria-label="Dashboard navigation"
      className="flex h-full w-full flex-col gap-6 border-r border-border/60 bg-background/40 px-3 py-4"
    >
      <Link
        to="/"
        className="flex items-center gap-2 px-2 text-sm font-semibold tracking-tight text-foreground"
        onClick={onNavigate}
      >
        <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
        {APP.name}
      </Link>
      <nav aria-label="Dashboard" className="flex flex-col gap-4">
        {DASHBOARD_NAV.map((section) => (
          <SidebarSection key={section.label} label={section.label}>
            {section.items.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                variant="sidebar"
                onClick={onNavigate}
              >
                {item.label}
              </NavigationItem>
            ))}
          </SidebarSection>
        ))}
        <SidebarSection label="Admin">
          {ADMIN_NAV.map((item) => (
            <NavigationItem
              key={item.to}
              to={item.to}
              variant="sidebar"
              onClick={onNavigate}
            >
              {item.label}
            </NavigationItem>
          ))}
        </SidebarSection>
      </nav>
    </aside>
  );
}
