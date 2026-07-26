import { create } from 'zustand';
import { apiFetch } from '../../../shared/api/client';

function calculateSummary(transactions) {
  return transactions.reduce((summary, transaction) => {
    if (transaction.type === 'income') summary.totalIncome += Number(transaction.amount);
    else summary.totalExpenses += Number(transaction.amount);
    summary.totalBalance = summary.totalIncome - summary.totalExpenses;
    return summary;
  }, { totalBalance: 0, totalIncome: 0, totalExpenses: 0 });
}

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  summary: calculateSummary([]),
  isLoading: false,
  error: null,
  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/api/transactions');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No se pudieron cargar los movimientos');
      set({ transactions: data, summary: calculateSummary(data) });
    } catch (error) {
      set({ error: error.message, transactions: [], summary: calculateSummary([]) });
    } finally {
      set({ isLoading: false });
    }
  },
  addTransaction: async (transaction) => {
    const response = await apiFetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'No se pudo crear el movimiento');

    const transactions = [data, ...get().transactions];
    set({ transactions, summary: calculateSummary(transactions) });
    return data;
  },
  clearTransactions: () => set({ transactions: [], summary: calculateSummary([]), error: null })
}));
