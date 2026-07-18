import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { APP } from "@/lib/constants";
import { UserMenu } from "@/components/layout/UserMenu";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <RequireAuth>
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            {APP.name}
          </Link>
          <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Admin
          </span>
          <div className="hidden sm:block">
            <Breadcrumbs />
          </div>
        </div>
        <UserMenu />
      </header>
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
