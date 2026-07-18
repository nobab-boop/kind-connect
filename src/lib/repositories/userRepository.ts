/**
 * User repository — placeholder. Owns all reads/writes for user profiles.
 */

import type { User, ID } from "@/lib/types";

export const userRepository = {
  async findById(_id: ID): Promise<User | null> {
    throw new Error("userRepository.findById not implemented");
  },
  async updateProfile(_id: ID, _patch: Partial<User>): Promise<User> {
    throw new Error("userRepository.updateProfile not implemented");
  },
};
