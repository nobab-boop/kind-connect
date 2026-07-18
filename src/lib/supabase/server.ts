/**
 * Server-only Supabase client factories.
 *
 * This file is imported exclusively from server code (createServerFn handlers,
 * server routes, other `*.server.ts` modules). It reads credentials from
 * `process.env` and must never be bundled into the browser.
 *
 * - `getServerPublishableClient()` — anon-role client for public reads during SSR.
 * - `getServerAdminClient()` — service-role client, BYPASSES RLS. Phase 7 does
 *   not use a service key yet; the factory is prepared for future phases.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export function getServerPublishableClient(): SupabaseClient<Database> {
  return createClient<Database>(
    requireEnv("APP_SUPABASE_URL"),
    requireEnv("APP_SUPABASE_PUBLISHABLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export function getServerAdminClient(): SupabaseClient<Database> {
  return createClient<Database>(
    requireEnv("APP_SUPABASE_URL"),
    requireEnv("APP_SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
