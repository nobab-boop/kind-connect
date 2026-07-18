/**
 * Public Supabase project configuration.
 *
 * The URL and publishable/anon key are public by design — they ship in the
 * browser bundle of every Supabase-powered app. Do NOT put the service-role
 * key here; that belongs in server-only code and reads from `process.env`.
 */

export const SUPABASE_PROJECT = {
  url: "https://znxejpnprwjwdixfjsjw.supabase.co",
  publishableKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpueGVqcG5wcndqd2RpeGZqc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTY4MzAsImV4cCI6MjA5OTk3MjgzMH0.03lG65OYTeIaAyznp8DUIdhPokSetwVR9Nom0EyITEo",
} as const;
