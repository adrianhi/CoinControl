import { useBalanceStore } from '../../entities/balance';

export function BalanceWidget() {
  const balance = useBalanceStore((state) => state.balance);

  return (
    <section className="mt-8 rounded-xl bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">Balance disponible</p>
      <p className="mt-1 text-3xl font-semibold">${balance.toFixed(2)}</p>
    </section>
  );
}
