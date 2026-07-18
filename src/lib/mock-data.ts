/**
 * Centralized mock data for the CreatorVault dashboard (Phase 5).
 * Frontend-only — every export is a placeholder shaped like a future
 * API response so components can be re-wired to Supabase without changes.
 *
 * Future integration notes (Supabase):
 *   - PROMPT_EXPERTS_EXTENDED  -> `public.prompt_experts` table (+ joins for
 *     platforms, outputs, workflow steps, examples, faqs).
 *   - MOCK_FAVORITES           -> `public.favorites` (user_id, expert_slug).
 *   - MOCK_GENERATIONS         -> `public.generations` (user_id, expert_slug,
 *     platform, output_type, status, created_at, token_cost).
 *   - MOCK_CREDIT_SUMMARY      -> RPC `get_credit_summary(user_id)` returning
 *     remaining/monthly/purchased + daily usage series.
 *   - MOCK_ANNOUNCEMENTS       -> `public.announcements` (published_at, body).
 *   - MOCK_USER                -> `auth.users` join with `public.profiles`.
 */

import { PROMPT_EXPERTS, type PromptExpert } from "@/lib/marketing";

/* ---------------- User ---------------- */

export type MockUser = {
  id: string;
  displayName: string;
  handle: string;
  plan: "Free" | "Pro" | "Team";
  joinedAt: string;
};

export const MOCK_USER: MockUser = {
  id: "user_demo",
  displayName: "Rafi Ahmed",
  handle: "@rafi",
  plan: "Pro",
  joinedAt: "2025-11-04",
};

/* ---------------- Prompt Experts (extended) ---------------- */

export type PromptExpertExtended = PromptExpert & {
  icon: string; // emoji stand-in until an icon system ships
  estimatedTime: string;
  workflow: { title: string; description: string }[];
  examples: { title: string; summary: string }[];
  faqs: { q: string; a: string }[];
};

const ICONS: Record<string, string> = {
  "ai-food": "🍜",
  "ai-baby-videos": "👶",
  "ai-storytelling": "📖",
  "ai-horror": "🕯️",
  "ai-talking-animals": "🐼",
  "ai-product-ads": "🛍️",
  "ai-fashion": "👗",
  "ai-explainers": "🎓",
  "ai-music-videos": "🎧",
};

const TIMES: Record<string, string> = {
  "ai-food": "~40s",
  "ai-baby-videos": "~60s",
  "ai-storytelling": "~90s",
  "ai-horror": "~90s",
  "ai-talking-animals": "~50s",
  "ai-product-ads": "~70s",
  "ai-fashion": "~45s",
  "ai-explainers": "~50s",
  "ai-music-videos": "~120s",
};

const DEFAULT_WORKFLOW = [
  { title: "Answer guided questions", description: "Pick tone, audience, platform, and output type." },
  { title: "Prompt Expert composes the prompt", description: "The expert applies its template, guardrails, and randomization." },
  { title: "Copy or send to your AI tool", description: "Get a production-ready prompt formatted for the target platform." },
];

const DEFAULT_EXAMPLES = [
  { title: "Concept A", summary: "A short-form treatment with hook, body, and CTA." },
  { title: "Concept B", summary: "A cinematic variant with pacing and shot cues." },
  { title: "Concept C", summary: "A minimalist take suited for reels and shorts." },
];

const DEFAULT_FAQS = [
  { q: "Do I need prompt engineering knowledge?", a: "No. Answer the guided questions and the expert composes the prompt." },
  { q: "Which platforms are supported?", a: "See the platform badges on this page — each expert is tuned per platform." },
  { q: "Can I re-run with different outputs?", a: "Yes. Randomization keeps variations fresh without going off-brand." },
];

export const PROMPT_EXPERTS_EXTENDED: PromptExpertExtended[] = PROMPT_EXPERTS.map((e) => ({
  ...e,
  icon: ICONS[e.slug] ?? "✨",
  estimatedTime: TIMES[e.slug] ?? "~60s",
  workflow: DEFAULT_WORKFLOW,
  examples: DEFAULT_EXAMPLES,
  faqs: DEFAULT_FAQS,
}));

export function getExpert(slug: string): PromptExpertExtended | undefined {
  return PROMPT_EXPERTS_EXTENDED.find((e) => e.slug === slug);
}

export const EXPERT_CATEGORIES = Array.from(
  new Set(PROMPT_EXPERTS_EXTENDED.map((e) => e.category)),
).sort();

/* ---------------- Favorites ---------------- */

export const MOCK_FAVORITES: { expertSlug: string; savedAt: string }[] = [
  { expertSlug: "ai-food", savedAt: "2026-07-12" },
  { expertSlug: "ai-storytelling", savedAt: "2026-07-10" },
  { expertSlug: "ai-product-ads", savedAt: "2026-07-05" },
  { expertSlug: "ai-fashion", savedAt: "2026-06-28" },
];

/* ---------------- Generations ---------------- */

export type MockGeneration = {
  id: string;
  expertSlug: string;
  platform: string;
  outputType: string;
  status: "Completed" | "Draft" | "Failed";
  createdAt: string;
  preview: string;
};

export const MOCK_GENERATIONS: MockGeneration[] = [
  {
    id: "gen_001",
    expertSlug: "ai-food",
    platform: "Nano Banana",
    outputType: "Image",
    status: "Completed",
    createdAt: "2026-07-17T09:32:00Z",
    preview: "Cinematic overhead shot of steaming khichuri with soft window light…",
  },
  {
    id: "gen_002",
    expertSlug: "ai-storytelling",
    platform: "ChatGPT",
    outputType: "Text",
    status: "Completed",
    createdAt: "2026-07-16T18:05:00Z",
    preview: "A three-scene reel treatment about a Dhaka rooftop musician…",
  },
  {
    id: "gen_003",
    expertSlug: "ai-product-ads",
    platform: "Veo",
    outputType: "Video",
    status: "Draft",
    createdAt: "2026-07-15T14:12:00Z",
    preview: "15-second product demo for a Bangladeshi skincare brand…",
  },
  {
    id: "gen_004",
    expertSlug: "ai-horror",
    platform: "Veo",
    outputType: "Video",
    status: "Completed",
    createdAt: "2026-07-14T22:44:00Z",
    preview: "Overgrown haveli at dusk, slow dolly-in, distant footsteps…",
  },
  {
    id: "gen_005",
    expertSlug: "ai-explainers",
    platform: "ElevenLabs",
    outputType: "Voice",
    status: "Failed",
    createdAt: "2026-07-13T11:20:00Z",
    preview: "Two-minute explainer on VAT for freelancers in Bangladesh…",
  },
  {
    id: "gen_006",
    expertSlug: "ai-fashion",
    platform: "Nano Banana",
    outputType: "Image",
    status: "Completed",
    createdAt: "2026-07-12T08:03:00Z",
    preview: "Eid lookbook — earth-tone palette, natural light, on-model…",
  },
];

/* ---------------- Credits ---------------- */

export type MockCreditSummary = {
  remaining: number;
  monthlyAllowance: number;
  purchasedCredits: number;
  renewsOn: string;
  usageThisMonth: number;
  dailyUsage: { day: string; used: number }[];
};

export const MOCK_CREDIT_SUMMARY: MockCreditSummary = {
  remaining: 1240,
  monthlyAllowance: 2000,
  purchasedCredits: 500,
  renewsOn: "2026-08-01",
  usageThisMonth: 760,
  dailyUsage: [
    { day: "Mon", used: 60 },
    { day: "Tue", used: 120 },
    { day: "Wed", used: 90 },
    { day: "Thu", used: 150 },
    { day: "Fri", used: 200 },
    { day: "Sat", used: 100 },
    { day: "Sun", used: 40 },
  ],
};

/* ---------------- Announcements & Updates ---------------- */

export const MOCK_ANNOUNCEMENTS: { title: string; body: string; date: string }[] = [
  {
    title: "New expert: AI Music Videos",
    body: "Scene-by-scene treatments synced to tempo, mood, and lyrics.",
    date: "2026-07-15",
  },
  {
    title: "Bangla prompt guardrails upgraded",
    body: "Cleaner tone control and improved code-switching for mixed Bangla-English input.",
    date: "2026-07-10",
  },
  {
    title: "Faster ChatGPT output formatting",
    body: "Prompts now render 30% faster on the Pro plan.",
    date: "2026-07-04",
  },
];

export const MOCK_WEEKLY_UPDATES: { title: string; description: string }[] = [
  { title: "3 new experts this week", description: "Music Videos, Fashion Lookbook, and Explainers v2." },
  { title: "Weekly template refresh", description: "Refreshed hook library across all short-form experts." },
  { title: "Community picks", description: "Top 5 favorited experts of the week — see them on the Dashboard." },
];
