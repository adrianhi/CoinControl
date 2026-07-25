import { LoginForm } from '../../features/auth';

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">CoinControl</h1>
      <p className="mt-2 text-slate-400">Inicia sesión para administrar tus finanzas.</p>
      <LoginForm />
    </main>
  );
}
