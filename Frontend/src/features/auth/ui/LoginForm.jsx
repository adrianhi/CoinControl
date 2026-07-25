import { useState } from 'react';
import { useAuthStore } from '../../../entities/user';
import { Toast } from '../../../shared/ui/Toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ onSuccess }) {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!emailPattern.test(email)) {
      setNotification({ type: 'error', message: 'Introduce un correo electrónico válido.' });
      return;
    }
    if (!password) {
      setNotification({ type: 'error', message: 'La contraseña es obligatoria.' });
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      setNotification({ type: 'success', message: 'Inicio de sesión exitoso. Redirigiendo…' });
      if (onSuccess) window.setTimeout(onSuccess, 900);
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Credenciales inválidas.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 rounded-xl bg-slate-900 p-6 shadow-lg">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">Correo electrónico</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-cyan-400" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">Contraseña</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-cyan-400" autoComplete="current-password" />
      </div>
      <Toast {...notification} />
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
