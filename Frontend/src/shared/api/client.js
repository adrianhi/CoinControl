import { useAuthStore } from '../../entities/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
  const jwt = useAuthStore.getState().jwt;
  const headers = new Headers(options.headers);

  if (jwt) headers.set('Authorization', `Bearer ${jwt}`);

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
