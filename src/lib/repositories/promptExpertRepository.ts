/**
 * Prompt Expert repository — placeholder.
 *
 * Owns all DB reads/writes for `prompt_experts` and related tables.
 * Phase 7 defines the module surface only; CRUD ships in a later phase.
 */

import type { PromptExpert, ID } from "@/lib/types";

export const promptExpertRepository = {
  async list(): Promise<PromptExpert[]> {
    throw new Error("promptExpertRepository.list not implemented");
  },
  async findBySlug(_slug: string): Promise<PromptExpert | null> {
    throw new Error("promptExpertRepository.findBySlug not implemented");
  },
  async findById(_id: ID): Promise<PromptExpert | null> {
    throw new Error("promptExpertRepository.findById not implemented");
  },
};
