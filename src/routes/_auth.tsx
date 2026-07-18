import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { APP } from "@/lib/constants";
import { RequireGuest } from "@/lib/auth/guards";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <RequireGuest>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="border-b border-border/60">
          <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
              {APP.name}
            </Link>
          </div>
        </header>
        <main
          id="main-content"
          className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6"
        >
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </RequireGuest>
  );
}
