import { useAuthStore } from '../../../entities/user';
import { useTransactionStore } from '../../../entities/transaction';

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const clearTransactions = useTransactionStore((state) => state.clearTransactions);
  return <button onClick={() => { clearTransactions(); logout(); }} className="rounded-md border border-slate-600 px-3 py-2 text-sm transition hover:bg-slate-800">Cerrar sesión</button>;
}
