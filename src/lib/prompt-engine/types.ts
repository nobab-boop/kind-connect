/**
 * Prompt Expert Engine — type definitions.
 *
 * The engine is entirely data-driven: each Prompt Expert is described by a
 * `PromptExpertDefinition`. The UI (question renderer, workflow, review,
 * preview) reads this definition and renders itself with no expert-specific
 * React code.
 *
 * Future backend mapping (not implemented in Phase 6):
 *   - PromptExpertDefinition           -> `public.prompt_experts` row + joins
 *   - QuestionGroup / Question         -> `public.prompt_expert_questions`
 *   - Answers (Record<string, unknown>) -> `public.generations.inputs` (jsonb)
 *   - Generated output                 -> `public.generations.output` (text)
 */

export type QuestionType =
  | "text"
  | "textarea"
  | "select"
  | "multi-select"
  | "radio"
  | "checkbox"
  | "switch"
  | "slider"
  | "number"
  | "color"
  | "file";

export type SelectOption = { value: string; label: string; description?: string };

/** Show `question` only when the referenced answer matches. */
export type ConditionalRule = {
  /** id of another question in the same expert */
  questionId: string;
  /** show when the answer equals one of these values (or, for multi-select, includes any) */
  equalsAny: (string | number | boolean)[];
};

export type ValidationRule = {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  /** for multi-select / checkbox lists */
  minSelections?: number;
  maxSelections?: number;
  pattern?: string; // stringified RegExp source
  message?: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;
  options?: SelectOption[]; // for select/multi-select/radio/checkbox
  min?: number; // for slider/number
  max?: number;
  step?: number;
  validation?: ValidationRule;
  showWhen?: ConditionalRule;
};

export type QuestionGroup = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type WorkflowStep = {
  id: string;
  title: string;
  description?: string;
  /** If provided, this step renders the referenced question group. */
  groupId?: string;
  /** Well-known kinds handled by the runner. */
  kind?: "questions" | "review" | "generate";
};

export type OutputSection = {
  id: string;
  title: string;
  /** Mock body used until real generation is wired in a later phase. */
  mock: string;
  language?: string; // for future syntax highlighting
};

export type PromptExpertDefinition = {
  /** Stable slug — matches the marketing/mock-data expert catalogue. */
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  platforms: string[];
  outputs: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  version: string;
  tags: string[];
  featured?: boolean;
  premium?: boolean;
  groups: QuestionGroup[];
  workflow: WorkflowStep[];
  outputSections: OutputSection[];
};

export type Answers = Record<string, unknown>;

export type ValidationError = { questionId: string; message: string };
