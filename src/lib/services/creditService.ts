/**
 * Credit service — placeholder.
 */

export const creditService = {
  async getBalance(_userId: string) {
    throw new Error("creditService.getBalance not implemented");
  },
  async debit(_userId: string, _amount: number, _reason: string) {
    throw new Error("creditService.debit not implemented");
  },
};
