/**
 * Supabase generated Database type.
 *
 * Placeholder for Phase 7 — no tables exist yet. Regenerate with the Supabase
 * CLI once schema lands: `supabase gen types typescript --project-id <id>`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
