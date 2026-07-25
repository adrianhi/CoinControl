import { useEffect } from 'react';
import { useAuthStore } from '../../entities/user';
import { useDashboardStore } from '../../entities/dashboard';
import { LogoutButton } from '../../features/auth';
import { RecentTransactionsTable } from '../../widgets/recent-transactions-table';
import { SummaryCards } from '../../widgets/summary-cards';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const summary = useDashboardStore((state) => state.summary);
  const isLoading = useDashboardStore((state) => state.isLoading);
  const error = useDashboardStore((state) => state.error);
  const fetchSummary = useDashboardStore((state) => state.fetchSummary);
  useEffect(() => { fetchSummary(); }, [fetchSummary]);
  return <main className="mx-auto min-h-screen max-w-6xl p-6 md:p-8"><header className="mb-8 flex items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">CoinControl</h1><p className="mt-1 text-slate-400">Hola, {user.email}</p></div><LogoutButton /></header>{isLoading && <p className="text-slate-400">Cargando resumen financiero…</p>}{error && <p role="alert" className="rounded-lg border border-rose-400 bg-rose-950 px-4 py-3 text-rose-100">{error}</p>}{summary && <div className="space-y-8"><SummaryCards summary={summary} /><RecentTransactionsTable transactions={summary.recentTransactions} /></div>}</main>;
}
