/**
 * Static marketing content used across the public website.
 * Frontend-only placeholders — no backend dependencies.
 */

export type PromptExpert = {
  slug: string;
  name: string;
  description: string;
  platforms: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  outputs: string[];
  category: string;
};

export const PROMPT_EXPERTS: PromptExpert[] = [
  {
    slug: "ai-food",
    name: "AI Food",
    description:
      "Craft mouth-watering food imagery and recipe reels with consistent styling and lighting.",
    platforms: ["ChatGPT", "Nano Banana", "Veo"],
    difficulty: "Beginner",
    outputs: ["Image", "Video"],
    category: "Lifestyle",
  },
  {
    slug: "ai-baby-videos",
    name: "AI Baby Videos",
    description:
      "Generate adorable, safe-for-family baby video concepts with narration and background music prompts.",
    platforms: ["Veo", "ElevenLabs"],
    difficulty: "Beginner",
    outputs: ["Video", "Voice"],
    category: "Family",
  },
  {
    slug: "ai-storytelling",
    name: "AI Storytelling",
    description:
      "Turn simple ideas into multi-scene stories with characters, arcs, and voice-ready scripts.",
    platforms: ["ChatGPT", "Gemini", "ElevenLabs"],
    difficulty: "Intermediate",
    outputs: ["Text", "Voice"],
    category: "Narrative",
  },
  {
    slug: "ai-horror",
    name: "AI Horror",
    description:
      "Build tension-filled horror shorts with cinematic direction, sound design, and pacing cues.",
    platforms: ["Veo", "ElevenLabs", "ChatGPT"],
    difficulty: "Advanced",
    outputs: ["Video", "Voice"],
    category: "Cinematic",
  },
  {
    slug: "ai-talking-animals",
    name: "AI Talking Animals",
    description:
      "Give animals believable personalities, voices, and dialogue for viral short-form content.",
    platforms: ["Veo", "ElevenLabs"],
    difficulty: "Beginner",
    outputs: ["Video", "Voice"],
    category: "Comedy",
  },
  {
    slug: "ai-product-ads",
    name: "AI Product Ads",
    description:
      "Produce polished product commercials with hook, demo, and CTA structured to convert.",
    platforms: ["Veo", "ChatGPT", "Nano Banana"],
    difficulty: "Intermediate",
    outputs: ["Video", "Image"],
    category: "Marketing",
  },
  {
    slug: "ai-fashion",
    name: "AI Fashion",
    description:
      "Generate on-model fashion shots and lookbook concepts with cohesive palettes and posing.",
    platforms: ["Nano Banana", "ChatGPT"],
    difficulty: "Intermediate",
    outputs: ["Image"],
    category: "Lifestyle",
  },
  {
    slug: "ai-explainers",
    name: "AI Explainers",
    description:
      "Turn complex topics into short, clear explainer scripts optimized for reels and shorts.",
    platforms: ["ChatGPT", "Gemini", "ElevenLabs"],
    difficulty: "Beginner",
    outputs: ["Text", "Voice"],
    category: "Educational",
  },
  {
    slug: "ai-music-videos",
    name: "AI Music Videos",
    description:
      "Design scene-by-scene music video treatments synced to mood, tempo, and lyric structure.",
    platforms: ["Veo", "Grok"],
    difficulty: "Advanced",
    outputs: ["Video"],
    category: "Cinematic",
  },
];

export const AI_PLATFORMS: { name: string; kind: string }[] = [
  { name: "ChatGPT", kind: "Text" },
  { name: "Gemini", kind: "Multimodal" },
  { name: "Grok", kind: "Text" },
  { name: "Veo", kind: "Video" },
  { name: "ElevenLabs", kind: "Voice" },
  { name: "Nano Banana", kind: "Image" },
];

export const FEATURES: {
  title: string;
  description: string;
}[] = [
  {
    title: "Guided Prompt Generation",
    description:
      "Answer simple questions. CreatorVault composes a production-ready prompt behind the scenes.",
  },
  {
    title: "Prompt Experts",
    description:
      "Purpose-built experts for food, storytelling, horror, ads, and more — each tuned for a specific outcome.",
  },
  {
    title: "Randomized Outputs",
    description:
      "Controlled variation keeps every generation fresh while staying on-brand and on-topic.",
  },
  {
    title: "Multi-AI Compatibility",
    description:
      "Ships prompts formatted for ChatGPT, Gemini, Grok, Veo, ElevenLabs, and Nano Banana.",
  },
  {
    title: "Beginner Friendly",
    description:
      "Designed for creators who have never written a prompt — no jargon, no guessing.",
  },
  {
    title: "Weekly Updates",
    description:
      "New experts, refreshed templates, and platform tweaks land every week.",
  },
  {
    title: "Favorites",
    description:
      "Save the prompts that work and re-run them any time with one click.",
  },
  {
    title: "Copy Ready",
    description:
      "Every output is copy-and-paste ready — no cleanup, no formatting hassle.",
  },
  {
    title: "Bangla + English Support",
    description:
      "Full support for Bangla and English, built for creators in Bangladesh first.",
  },
];

export const PRICING: {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}[] = [
  {
    name: "Free",
    price: "৳0",
    cadence: "forever",
    description: "Try CreatorVault with a limited set of Prompt Experts.",
    features: [
      "5 prompts per month",
      "Access to starter experts",
      "Bangla + English support",
      "Community help",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "৳499",
    cadence: "per month",
    description: "For active creators who ship AI content every week.",
    features: [
      "Unlimited prompts",
      "All Prompt Experts",
      "Favorites & history",
      "Priority weekly updates",
      "Email support",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Credit Packs",
    price: "৳199",
    cadence: "one-time",
    description: "Pay-as-you-go credits for occasional projects and campaigns.",
    features: [
      "500 credits",
      "Never expires",
      "All Prompt Experts",
      "Works alongside Free or Pro",
    ],
    cta: "Buy credits",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need to know how to write prompts?",
    a: "No. CreatorVault is built for creators who have never written a prompt. You answer guided questions and we compose the prompt for you.",
  },
  {
    q: "Which AI tools does CreatorVault work with?",
    a: "We currently ship prompts formatted for ChatGPT, Gemini, Grok, Veo, ElevenLabs, and Nano Banana, with more on the way.",
  },
  {
    q: "Is CreatorVault available in Bangla?",
    a: "Yes. The experience is designed Bangla-first, with full English support alongside it.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes — the Free plan lets you generate a limited number of prompts each month with no credit card required.",
  },
  {
    q: "How is this different from writing prompts myself?",
    a: "Prompt Experts encode the exact structure, tone, and platform quirks that professional prompt engineers use — so your outputs are consistent and production-ready.",
  },
  {
    q: "Do prompts include randomization?",
    a: "Yes. Controlled randomness keeps every generation fresh while staying on-brand and on-topic.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Pro is a rolling monthly subscription. Cancel any time and keep access until the end of your billing period.",
  },
];

export const COMPARISON: { manual: string; creatorvault: string }[] = [
  { manual: "Hours spent tweaking prompt wording", creatorvault: "Answer a few guided questions" },
  { manual: "Inconsistent outputs across attempts", creatorvault: "Predictable, on-brand results" },
  { manual: "Guessing what each AI tool prefers", creatorvault: "Formatted for the target platform" },
  { manual: "Restart from scratch every time", creatorvault: "Save favorites and re-run instantly" },
  { manual: "English-only prompting resources", creatorvault: "Bangla + English, creator-first" },
];

export const TESTIMONIALS: { quote: string; name: string; handle: string }[] = [
  {
    quote:
      "I stopped fighting with prompts. I just answer a few questions and my reels look ten times better.",
    name: "Nabila R.",
    handle: "@nabilacreates",
  },
  {
    quote:
      "The horror expert alone is worth it. My shorts finally have the pacing I could never nail on my own.",
    name: "Tanvir H.",
    handle: "@tanvirshorts",
  },
  {
    quote:
      "Being able to work in Bangla changed everything for my team. We ship twice as much content now.",
    name: "Sadia K.",
    handle: "@sadiastudio",
  },
];
