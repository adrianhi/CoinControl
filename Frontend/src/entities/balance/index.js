import { create } from 'zustand';

export const useBalanceStore = create((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance })
}));
