import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AuthCard,
  AuthErrorBanner,
  AuthSuccessBanner,
  GoogleGlyph,
} from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth/hooks";
import { AUTH_ROUTES } from "@/lib/supabase/config";
import { buildPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_auth/sign-up")({
  head: () => ({
    meta: buildPageMeta({
      title: "Create account",
      description: "Create your CreatorVault account.",
    }),
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { signUpWithPassword, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords don't match.");
    }

    setSubmitting(true);
    const { error, needsConfirmation } = await signUpWithPassword(email.trim(), password);
    setSubmitting(false);
    if (error) return setError(error);
    if (needsConfirmation) {
      setSuccess("Check your inbox to confirm your email address, then sign in.");
      return;
    }
    navigate({ to: AUTH_ROUTES.afterSignIn, replace: true });
  }

  async function onGoogle() {
    setError(null);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error);
      setGoogleLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join CreatorVault to start generating with Prompt Experts."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-foreground underline-offset-4 hover:underline">
            Sign in
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
        <AuthSuccessBanner message={success} />
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">At least 8 characters.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting || googleLoading}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}
