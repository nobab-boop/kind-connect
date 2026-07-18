/**
 * Subscription repository — placeholder.
 */

import type { Subscription, ID } from "@/lib/types";

export const subscriptionRepository = {
  async findByUserId(_userId: ID): Promise<Subscription | null> {
    throw new Error("subscriptionRepository.findByUserId not implemented");
  },
};
