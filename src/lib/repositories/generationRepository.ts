/**
 * Generation repository — placeholder.
 */

import type { Generation, ID } from "@/lib/types";

export const generationRepository = {
  async listForUser(_userId: ID): Promise<Generation[]> {
    throw new Error("generationRepository.listForUser not implemented");
  },
  async create(_input: Omit<Generation, "id" | "createdAt">): Promise<Generation> {
    throw new Error("generationRepository.create not implemented");
  },
  async findById(_id: ID): Promise<Generation | null> {
    throw new Error("generationRepository.findById not implemented");
  },
};
