/**
 * Centralized domain types for CreatorVault.
 *
 * These are the future-facing entity interfaces. Actual DB rows will come
 * from `@/lib/supabase/types` once the schema is created. Domain types
 * decouple UI/service code from raw table shapes.
 */

export type ID = string;
export type ISODateString = string;

export interface User {
  id: ID;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: ISODateString;
}

export interface PromptExpert {
  id: ID;
  slug: string;
  name: string;
  description: string;
  category: string;
  version: string;
  featured: boolean;
  premium: boolean;
  createdAt: ISODateString;
}

export interface Generation {
  id: ID;
  userId: ID;
  expertId: ID;
  expertVersion: string;
  inputs: Record<string, unknown>;
  output: string | null;
  status: "pending" | "running" | "succeeded" | "failed";
  createdAt: ISODateString;
}

export interface Subscription {
  id: ID;
  userId: ID;
  plan: "free" | "pro" | "credits";
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: ISODateString | null;
}

export interface Result<T, E = AppError> {
  ok: boolean;
  data?: T;
  error?: E;
}

export interface AppError {
  code: string;
  message: string;
  cause?: unknown;
}
