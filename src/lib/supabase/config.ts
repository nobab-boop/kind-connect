/**
 * Central Supabase configuration.
 *
 * This is the ONLY file in the app allowed to hold Supabase connection
 * values. Every other module (browser client, server client, auth provider,
 * hooks, guards, pages) MUST import from here. Never read `import.meta.env`
 * or `process.env` for Supabase values elsewhere — that keeps the app
 * portable and free of Loveable-managed configuration.
 *
 * The publishable (anon) key is public by design; it ships with every
 * Supabase-powered browser bundle. The service-role key never belongs here.
 */

export const SUPABASE_PROJECT = {
  url: "https://znxejpnprwjwdixfjsjw.supabase.co",
  publishableKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpueGVqcG5wcndqd2RpeGZqc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTY4MzAsImV4cCI6MjA5OTk3MjgzMH0.03lG65OYTeIaAyznp8DUIdhPokSetwVR9Nom0EyITEo",
} as const;

/**
 * Auth-flow routing. Kept in config so pages, providers, and OAuth callbacks
 * never hardcode URLs and the app stays portable across environments.
 */
export const AUTH_ROUTES = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  afterSignIn: "/dashboard",
  afterSignOut: "/",
} as const;

/**
 * Resolves the absolute URL used as OAuth / password-recovery redirect.
 * Reads `window.location.origin` at call time so it works across preview,
 * production, and custom domains without hardcoding.
 */
export function getAuthRedirectUrl(path: string = AUTH_ROUTES.afterSignIn): string {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}
