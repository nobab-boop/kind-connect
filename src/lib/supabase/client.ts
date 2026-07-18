/**
 * Browser Supabase client.
 *
 * Uses the publishable (anon) key. Row Level Security enforces access rules.
 * Import this from React components, hooks, and any client-only code.
 * NEVER import this from `*.server.ts` modules.
 */

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PROJECT } from "./config";
import type { Database } from "./types";

export const supabase = createClient<Database>(
  SUPABASE_PROJECT.url,
  SUPABASE_PROJECT.publishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "creatorvault.auth",
    },
  },
);
