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
