import { BalanceWidget } from '../../widgets/balance';

export function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">CoinControl</h1>
      <p className="mt-2 text-slate-400">Tu control financiero, en un solo lugar.</p>
      <BalanceWidget />
    </main>
  );
}
