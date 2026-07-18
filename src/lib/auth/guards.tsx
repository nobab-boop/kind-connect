/**
 * Reusable route guards.
 *
 *   <RequireAuth>  — redirects unauthenticated users to /sign-in and remembers
 *                    where they were headed via the `?redirect=` query param.
 *   <RequireGuest> — redirects already-authenticated users to the dashboard.
 *                    Used by /sign-in, /sign-up, /forgot-password.
 *
 * Both render a lightweight loading state while the initial session restore
 * is in flight, so we never flash the wrong UI.
 */

import { Navigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AUTH_ROUTES } from "@/lib/supabase/config";
import { useAuth } from "./hooks";

function AuthLoading() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
      <span className="ml-3">Checking your session…</span>
    </div>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <AuthLoading />;
  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.href);
    return <Navigate to={`${AUTH_ROUTES.signIn}?redirect=${redirect}`} replace />;
  }
  return <>{children}</>;
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <AuthLoading />;
  if (isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.afterSignIn} replace />;
  }
  return <>{children}</>;
}
