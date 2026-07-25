import { create } from 'zustand';
import { apiFetch } from '../../../shared/api/client';

export const useDashboardStore = create((set) => ({
  summary: null,
  isLoading: false,
  error: null,
  fetchSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiFetch('/api/dashboard/summary');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No se pudo cargar el resumen financiero');
      set({ summary: data });
    } catch (error) {
      set({ error: error.message, summary: null });
    } finally {
      set({ isLoading: false });
    }
  },
  clearSummary: () => set({ summary: null, error: null })
}));
