import { useAuthStore } from '../../entities/user';

export function ProtectedRoute({ children, fallback }) {
  const user = useAuthStore((state) => state.user);
  const jwt = useAuthStore((state) => state.jwt);
  return user && jwt ? children : fallback;
}
