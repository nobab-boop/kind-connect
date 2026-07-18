/**
 * Prompt Expert Engine — mock expert definitions.
 *
 * Three intentionally-different experts prove that the engine adapts to any
 * shape of workflow without expert-specific components:
 *   - ai-food             : image-focused, tight platform coupling, conditional Qs
 *   - ai-storytelling     : text-focused, long-form textarea + slider pacing
 *   - ai-product-ads      : video ads, multi-select outputs, brand-safety toggles
 *
 * Adding an expert is a data change, not a code change.
 */

import type { PromptExpertDefinition } from "./types";

const foodExpert: PromptExpertDefinition = {
  slug: "ai-food",
  name: "AI Food Cinematic Expert",
  description:
    "Cinematic food imagery — plating, light, and mood tuned for the platform.",
  icon: "🍜",
  category: "Image",
  platforms: ["Nano Banana", "Midjourney", "Flux"],
  outputs: ["Image"],
  difficulty: "Beginner",
  estimatedTime: "~40s",
  version: "1.0.0",
  tags: ["food", "cinematic", "image"],
  featured: true,
  groups: [
    {
      id: "platform",
      title: "Choose your AI platform",
      description: "The prompt is formatted for the tool you pick.",
      questions: [
        {
          id: "platform",
          type: "radio",
          label: "Target platform",
          required: true,
          defaultValue: "Nano Banana",
          options: [
            { value: "Nano Banana", label: "Nano Banana" },
            { value: "Midjourney", label: "Midjourney" },
            { value: "Flux", label: "Flux" },
          ],
        },
      ],
    },
    {
      id: "brief",
      title: "Describe the dish",
      questions: [
        {
          id: "dish",
          type: "text",
          label: "Dish name",
          placeholder: "e.g. Kacchi Biryani",
          required: true,
          validation: { minLength: 2, maxLength: 60 },
        },
        {
          id: "mood",
          type: "select",
          label: "Mood",
          required: true,
          defaultValue: "Cinematic",
          options: [
            { value: "Cinematic", label: "Cinematic" },
            { value: "Rustic", label: "Rustic" },
            { value: "Editorial", label: "Editorial" },
            { value: "Street food", label: "Street food" },
          ],
        },
        {
          id: "lighting",
          type: "select",
          label: "Lighting",
          defaultValue: "Soft window",
          options: [
            { value: "Soft window", label: "Soft window" },
            { value: "Golden hour", label: "Golden hour" },
            { value: "Moody low-key", label: "Moody low-key" },
          ],
        },
        {
          id: "props",
          type: "multi-select",
          label: "Props on the table",
          options: [
            { value: "linen", label: "Linen napkin" },
            { value: "brass", label: "Brass utensils" },
            { value: "herbs", label: "Fresh herbs" },
            { value: "steam", label: "Visible steam" },
          ],
          validation: { maxSelections: 3, message: "Pick up to three." },
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced controls",
      description: "Optional — leave defaults for a great result.",
      questions: [
        {
          id: "useNegative",
          type: "switch",
          label: "Add negative prompt",
          defaultValue: false,
        },
        {
          id: "negative",
          type: "textarea",
          label: "Negative prompt",
          placeholder: "e.g. plastic, cartoon, oversaturated",
          showWhen: { questionId: "useNegative", equalsAny: [true] },
          validation: { maxLength: 200 },
        },
        {
          id: "aspect",
          type: "radio",
          label: "Aspect ratio",
          defaultValue: "1:1",
          options: [
            { value: "1:1", label: "1:1" },
            { value: "4:5", label: "4:5" },
            { value: "16:9", label: "16:9" },
          ],
        },
      ],
    },
  ],
  workflow: [
    { id: "s-platform", title: "Choose platform", kind: "questions", groupId: "platform" },
    { id: "s-brief", title: "Brief", kind: "questions", groupId: "brief" },
    { id: "s-advanced", title: "Advanced", kind: "questions", groupId: "advanced" },
    { id: "s-review", title: "Review", kind: "review" },
    { id: "s-generate", title: "Generate", kind: "generate" },
  ],
  outputSections: [
    {
      id: "prompt",
      title: "Prompt",
      language: "text",
      mock:
        "Cinematic overhead shot of {dish}, {mood} mood, {lighting}, shallow depth of field, natural color grade, high detail, {aspect}.",
    },
    {
      id: "negative",
      title: "Negative prompt",
      language: "text",
      mock: "plastic, cartoon, oversaturated, watermark, text",
    },
  ],
};

const storytellingExpert: PromptExpertDefinition = {
  slug: "ai-storytelling",
  name: "AI Storytelling Expert",
  description: "Short-form treatments with hook, body, and payoff.",
  icon: "📖",
  category: "Text",
  platforms: ["ChatGPT", "Claude", "Gemini"],
  outputs: ["Text"],
  difficulty: "Intermediate",
  estimatedTime: "~90s",
  version: "1.0.0",
  tags: ["story", "text", "reels"],
  groups: [
    {
      id: "platform",
      title: "Target platform",
      questions: [
        {
          id: "platform",
          type: "radio",
          label: "Where will you paste the prompt?",
          required: true,
          defaultValue: "ChatGPT",
          options: [
            { value: "ChatGPT", label: "ChatGPT" },
            { value: "Claude", label: "Claude" },
            { value: "Gemini", label: "Gemini" },
          ],
        },
      ],
    },
    {
      id: "story",
      title: "Story brief",
      questions: [
        {
          id: "logline",
          type: "textarea",
          label: "Logline",
          placeholder: "One sentence that captures the story.",
          required: true,
          validation: { minLength: 12, maxLength: 240 },
        },
        {
          id: "audience",
          type: "select",
          label: "Audience",
          required: true,
          options: [
            { value: "gen-z", label: "Gen Z" },
            { value: "millennials", label: "Millennials" },
            { value: "families", label: "Families" },
          ],
        },
        {
          id: "tone",
          type: "multi-select",
          label: "Tone",
          options: [
            { value: "warm", label: "Warm" },
            { value: "witty", label: "Witty" },
            { value: "cinematic", label: "Cinematic" },
            { value: "dramatic", label: "Dramatic" },
          ],
          validation: { minSelections: 1, maxSelections: 3 },
        },
        {
          id: "pacing",
          type: "slider",
          label: "Pacing",
          defaultValue: 3,
          min: 1,
          max: 5,
          step: 1,
        },
      ],
    },
  ],
  workflow: [
    { id: "s-platform", title: "Choose platform", kind: "questions", groupId: "platform" },
    { id: "s-story", title: "Story", kind: "questions", groupId: "story" },
    { id: "s-review", title: "Review", kind: "review" },
    { id: "s-generate", title: "Generate", kind: "generate" },
  ],
  outputSections: [
    {
      id: "system",
      title: "System",
      mock: "You are a Bangladeshi short-form story writer for {audience}.",
    },
    {
      id: "user",
      title: "User",
      mock: "Write a 3-beat treatment based on: \"{logline}\". Tone: {tone}. Pacing: {pacing}/5.",
    },
  ],
};

const productAdsExpert: PromptExpertDefinition = {
  slug: "ai-product-ads",
  name: "AI Product Commercial Expert",
  description: "15–30s product spots with hook, demo, and CTA.",
  icon: "🛍️",
  category: "Video",
  platforms: ["Veo", "Runway", "Kling"],
  outputs: ["Video", "Storyboard"],
  difficulty: "Advanced",
  estimatedTime: "~70s",
  version: "1.0.0",
  tags: ["product", "video", "ads"],
  premium: true,
  groups: [
    {
      id: "brand",
      title: "Brand & product",
      questions: [
        {
          id: "brand",
          type: "text",
          label: "Brand name",
          required: true,
          validation: { minLength: 2, maxLength: 40 },
        },
        {
          id: "product",
          type: "text",
          label: "Product",
          required: true,
          placeholder: "e.g. glow serum",
        },
        {
          id: "outputs",
          type: "multi-select",
          label: "Deliverables",
          required: true,
          options: [
            { value: "video", label: "Video" },
            { value: "storyboard", label: "Storyboard" },
            { value: "captions", label: "Captions" },
          ],
          validation: { minSelections: 1 },
        },
      ],
    },
    {
      id: "creative",
      title: "Creative direction",
      questions: [
        {
          id: "length",
          type: "number",
          label: "Length (seconds)",
          defaultValue: 15,
          min: 6,
          max: 60,
          step: 1,
          required: true,
        },
        {
          id: "vibe",
          type: "select",
          label: "Vibe",
          defaultValue: "Clean modern",
          options: [
            { value: "Clean modern", label: "Clean modern" },
            { value: "Street energy", label: "Street energy" },
            { value: "Luxury", label: "Luxury" },
          ],
        },
        {
          id: "brandSafe",
          type: "switch",
          label: "Enforce brand-safety guardrails",
          defaultValue: true,
        },
        {
          id: "restricted",
          type: "checkbox",
          label: "Restricted themes to avoid",
          options: [
            { value: "alcohol", label: "Alcohol" },
            { value: "gambling", label: "Gambling" },
            { value: "politics", label: "Politics" },
          ],
          showWhen: { questionId: "brandSafe", equalsAny: [true] },
        },
        {
          id: "accent",
          type: "color",
          label: "Accent color (hex)",
          placeholder: "#00b894",
        },
      ],
    },
  ],
  workflow: [
    { id: "s-brand", title: "Brand", kind: "questions", groupId: "brand" },
    { id: "s-creative", title: "Creative", kind: "questions", groupId: "creative" },
    { id: "s-review", title: "Review", kind: "review" },
    { id: "s-generate", title: "Generate", kind: "generate" },
  ],
  outputSections: [
    {
      id: "brief",
      title: "Creative brief",
      mock:
        "Brand: {brand}. Product: {product}. Length: {length}s. Vibe: {vibe}. Deliverables: {outputs}.",
    },
    {
      id: "storyboard",
      title: "Storyboard",
      mock: "Beat 1 — Hook. Beat 2 — Demo. Beat 3 — CTA. Accent color: {accent}.",
    },
  ],
};

export const PROMPT_EXPERT_DEFINITIONS: PromptExpertDefinition[] = [
  foodExpert,
  storytellingExpert,
  productAdsExpert,
];

export function getExpertDefinition(slug: string): PromptExpertDefinition | undefined {
  return PROMPT_EXPERT_DEFINITIONS.find((e) => e.slug === slug);
}
