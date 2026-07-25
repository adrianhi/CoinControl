import { useState } from 'react';
import { useAuthStore } from '../../entities/user';
import { LoginForm } from '../../features/auth';
import { BalanceWidget } from '../../widgets/balance';

export function HomePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showDashboard, setShowDashboard] = useState(Boolean(user));

  if (!showDashboard) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold">CoinControl</h1>
        <p className="mt-2 text-slate-400">Inicia sesión para administrar tus finanzas.</p>
        <LoginForm onSuccess={() => setShowDashboard(true)} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">CoinControl</h1>
          <p className="mt-2 text-slate-400">Sesión de {user?.email}</p>
        </div>
        <button onClick={() => { logout(); setShowDashboard(false); }} className="rounded-md border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800">Cerrar sesión</button>
      </div>
      <p className="mt-2 text-slate-400">Tu control financiero, en un solo lugar.</p>
      <BalanceWidget />
    </main>
  );
}
