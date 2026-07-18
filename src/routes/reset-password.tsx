import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { APP } from "@/lib/constants";
import { AUTH_ROUTES } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AuthCard,
  AuthErrorBanner,
  AuthSuccessBanner,
} from "@/components/auth/AuthCard";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/hooks";
import { buildPageMeta } from "@/lib/seo";

/**
 * Reset password. Public route (NOT under `_auth`) because Supabase drops the
 * user into a temporary recovery session — the guest-only guard would bounce
 * them straight back to the dashboard.
 */
export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: buildPageMeta({
      title: "Set a new password",
      description: "Choose a new password for your CreatorVault account.",
    }),
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [hasRecovery, setHasRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY once it has processed the URL fragment.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setHasRecovery(true);
      if (session) setHasRecovery(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setHasRecovery(true);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) return setError(error);
    setSuccess("Password updated. Redirecting…");
    setTimeout(() => navigate({ to: AUTH_ROUTES.afterSignIn, replace: true }), 900);
  }

  return (
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
          <AuthCard
            title="Set a new password"
            subtitle="Choose a strong password you haven't used before."
            footer={
              <>
                Changed your mind?{" "}
                <Link to="/sign-in" className="text-foreground underline-offset-4 hover:underline">
                  Back to sign in
                </Link>
              </>
            }
          >
            {!ready ? (
              <p className="text-center text-sm text-muted-foreground">Loading…</p>
            ) : !hasRecovery ? (
              <AuthErrorBanner message="This reset link is invalid or has expired. Please request a new one." />
            ) : (
              <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                <AuthErrorBanner message={error} />
                <AuthSuccessBanner message={success} />
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Updating…" : "Update password"}
                </Button>
              </form>
            )}
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
