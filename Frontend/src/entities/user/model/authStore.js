import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      login: async ({ email, password }) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'No se pudo iniciar sesión');

        set({ user: data.user, jwt: data.token });
        return data.user;
      },
      logout: () => set({ user: null, jwt: null })
    }),
    {
      name: 'coincontrol-auth',
      partialize: (state) => ({ user: state.user, jwt: state.jwt })
    }
  )
);
