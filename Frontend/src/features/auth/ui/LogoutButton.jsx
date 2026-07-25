import { useAuthStore } from '../../../entities/user';
import { useDashboardStore } from '../../../entities/dashboard';

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const clearSummary = useDashboardStore((state) => state.clearSummary);
  return <button onClick={() => { clearSummary(); logout(); }} className="rounded-md border border-slate-600 px-3 py-2 text-sm transition hover:bg-slate-800">Cerrar sesión</button>;
}
