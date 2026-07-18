import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard, AuthErrorBanner, GoogleGlyph } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth/hooks";
import { AUTH_ROUTES } from "@/lib/supabase/config";
import { buildPageMeta } from "@/lib/seo";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: buildPageMeta({
      title: "Sign in",
      description: "Sign in to your CreatorVault account.",
    }),
  }),
  component: SignInPage,
});

function SignInPage() {
  const { signInWithPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/_auth/sign-in" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithPassword(email.trim(), password);
    setSubmitting(false);
    if (error) return setError(error);
    const target = redirect ? decodeURIComponent(redirect) : AUTH_ROUTES.afterSignIn;
    navigate({ to: target, replace: true });
  }

  async function onGoogle() {
    setError(null);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle(
      redirect ? decodeURIComponent(redirect) : AUTH_ROUTES.afterSignIn,
    );
    if (error) {
      setError(error);
      setGoogleLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to CreatorVault."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-foreground underline-offset-4 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogle}
        disabled={googleLoading || submitting}
      >
        <GoogleGlyph className="mr-2 h-4 w-4" />
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </Button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="h-px flex-1 bg-border/60" />
        or
        <span className="h-px flex-1 bg-border/60" />
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <AuthErrorBanner message={error} />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting || googleLoading}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthCard>
  );
}
