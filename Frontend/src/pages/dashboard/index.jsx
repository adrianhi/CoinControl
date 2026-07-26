import { useEffect, useState } from 'react';
import { useAuthStore } from '../../entities/user';
import { useTransactionStore } from '../../entities/transaction';
import { LogoutButton } from '../../features/auth';
import { AddTransactionForm } from '../../features/transactions';
import { Modal } from '../../shared/ui/Modal';
import { RecentTransactionsTable } from '../../widgets/recent-transactions-table';
import { SummaryCards } from '../../widgets/summary-cards';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const transactions = useTransactionStore((state) => state.transactions);
  const summary = useTransactionStore((state) => state.summary);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const error = useTransactionStore((state) => state.error);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);
  return <main className="mx-auto min-h-screen max-w-6xl p-6 md:p-8"><header className="mb-8 flex items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">CoinControl</h1><p className="mt-1 text-slate-400">Hola, {user.email}</p></div><div className="flex gap-3"><button onClick={() => setIsModalOpen(true)} className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">Agregar movimiento</button><LogoutButton /></div></header>{isLoading && <p className="text-slate-400">Cargando movimientos…</p>}{error && <p role="alert" className="mb-6 rounded-lg border border-rose-400 bg-rose-950 px-4 py-3 text-rose-100">{error}</p>}<div className="space-y-8"><SummaryCards summary={summary} /><RecentTransactionsTable transactions={transactions} /></div>{isModalOpen && <Modal title="Agregar movimiento" onClose={() => setIsModalOpen(false)}><AddTransactionForm onSuccess={() => setIsModalOpen(false)} /></Modal>}</main>;
}
