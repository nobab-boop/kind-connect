/**
 * Prompt Expert Engine — validation & conditional-visibility utilities.
 * Pure functions, no React. Trivial to unit-test and reuse server-side later.
 */

import type {
  Answers,
  Question,
  PromptExpertDefinition,
  ValidationError,
} from "./types";

export function isVisible(question: Question, answers: Answers): boolean {
  const cond = question.showWhen;
  if (!cond) return true;
  const value = answers[cond.questionId];
  if (Array.isArray(value)) {
    return cond.equalsAny.some((v) => (value as unknown[]).includes(v));
  }
  return cond.equalsAny.includes(value as string | number | boolean);
}

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export function validateQuestion(q: Question, value: unknown): string | null {
  const rules = q.validation ?? {};
  if (q.required && isEmpty(value)) {
    return rules.message ?? "This field is required.";
  }
  if (isEmpty(value)) return null;

  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength)
      return rules.message ?? `Must be at least ${rules.minLength} characters.`;
    if (rules.maxLength && value.length > rules.maxLength)
      return rules.message ?? `Must be at most ${rules.maxLength} characters.`;
    if (rules.pattern && !new RegExp(rules.pattern).test(value))
      return rules.message ?? "Invalid format.";
  }

  if (typeof value === "number") {
    if (rules.min !== undefined && value < rules.min)
      return rules.message ?? `Must be at least ${rules.min}.`;
    if (rules.max !== undefined && value > rules.max)
      return rules.message ?? `Must be at most ${rules.max}.`;
  }

  if (Array.isArray(value)) {
    if (rules.minSelections && value.length < rules.minSelections)
      return rules.message ?? `Choose at least ${rules.minSelections}.`;
    if (rules.maxSelections && value.length > rules.maxSelections)
      return rules.message ?? `Choose at most ${rules.maxSelections}.`;
  }

  return null;
}

export function validateGroup(
  expert: PromptExpertDefinition,
  groupId: string,
  answers: Answers,
): ValidationError[] {
  const group = expert.groups.find((g) => g.id === groupId);
  if (!group) return [];
  const errors: ValidationError[] = [];
  for (const q of group.questions) {
    if (!isVisible(q, answers)) continue;
    const msg = validateQuestion(q, answers[q.id]);
    if (msg) errors.push({ questionId: q.id, message: msg });
  }
  return errors;
}

export function validateAll(
  expert: PromptExpertDefinition,
  answers: Answers,
): ValidationError[] {
  return expert.groups.flatMap((g) => validateGroup(expert, g.id, answers));
}

export function buildDefaultAnswers(expert: PromptExpertDefinition): Answers {
  const out: Answers = {};
  for (const g of expert.groups) {
    for (const q of g.questions) {
      if (q.defaultValue !== undefined) out[q.id] = q.defaultValue;
      else if (q.type === "multi-select" || q.type === "checkbox") out[q.id] = [];
      else if (q.type === "switch") out[q.id] = false;
    }
  }
  return out;
}
