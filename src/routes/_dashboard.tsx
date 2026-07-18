import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { RequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-background">
        <div className="hidden w-64 shrink-0 lg:block">
          <DashboardSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
