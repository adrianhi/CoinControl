import { useState } from 'react';
import { useAuthStore } from '../../../entities/user';
import { Toast } from '../../../shared/ui/Toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass = (hasError) => `w-full rounded-md border bg-slate-800 px-3 py-2 outline-none focus:border-cyan-400 ${hasError ? 'border-red-500' : 'border-slate-700'}`;

function validate(values) {
  const errors = {};
  if (!values.email.trim()) errors.email = 'El correo electrónico es obligatorio.';
  else if (!emailPattern.test(values.email)) errors.email = 'Introduce un correo electrónico válido.';
  if (!values.password) errors.password = 'La contraseña es obligatoria.';
  else if (values.password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  return errors;
}

export function LoginForm({ onSuccess }) {
  const login = useAuthStore((state) => state.login);
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const nextValues = { ...values, [event.target.name]: event.target.value };
    setValues(nextValues);
    setErrors(validate(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setIsSubmitting(true);
      setNotification(null);
      await login(values);
      setNotification({ type: 'success', message: 'Inicio de sesión exitoso. Redirigiendo…' });
      if (onSuccess) window.setTimeout(onSuccess, 900);
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'No se pudo iniciar sesión.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form noValidate onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 rounded-xl bg-slate-900 p-6 shadow-lg"><div><label htmlFor="email" className="mb-1 block text-sm font-medium">Correo electrónico</label><input id="email" name="email" type="email" value={values.email} onChange={updateField} className={inputClass(submitted && errors.email)} autoComplete="email" aria-invalid={Boolean(submitted && errors.email)} />{submitted && errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}</div><div><label htmlFor="password" className="mb-1 block text-sm font-medium">Contraseña</label><input id="password" name="password" type="password" value={values.password} onChange={updateField} className={inputClass(submitted && errors.password)} autoComplete="current-password" aria-invalid={Boolean(submitted && errors.password)} />{submitted && errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}</div><Toast {...notification} /><button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}</button></form>;
}
