/**
 * CreatorVault application constants.
 * Central source for app-wide static values (name, tagline, URLs).
 */

export const APP = {
  name: "CreatorVault",
  tagline: "Expert prompt engineering for AI creators.",
  description:
    "CreatorVault turns expert prompt engineering into guided workflows, so creators generate professional AI content without learning prompts.",
  locale: "en",
  region: "BD",
  url: "https://creatorvault.app",
  twitter: "@creatorvault",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Storage buckets (Supabase Storage). Prepared for future asset uploads;
 * buckets are not provisioned in Phase 7.
 */
export const STORAGE_BUCKETS = {
  promptCovers: "prompt-covers",
  promptAssets: "prompt-assets",
  userAssets: "user-assets",
} as const;

/**
 * Feature flags (placeholders). Wire to a real flag source in a later phase.
 */
export const FEATURE_FLAGS = {
  auth: false,
  billing: false,
  aiGeneration: false,
  adminCms: false,
} as const;

/**
 * Application configuration.
 */
export const APP_CONFIG = {
  supportEmail: "support@creatorvault.app",
  defaultLocale: "en",
  supportedLocales: ["en", "bn"] as const,
} as const;
