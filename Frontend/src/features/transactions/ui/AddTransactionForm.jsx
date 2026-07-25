import { useState } from 'react';
import { useTransactionStore } from '../../../entities/transaction';
import { Toast } from '../../../shared/ui/Toast';

export function AddTransactionForm({ onSuccess }) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', description: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }
  async function handleSubmit(event) {
    event.preventDefault();
    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) return setError('El monto debe ser mayor a 0.');
    if (!form.category.trim()) return setError('La categoría es obligatoria.');
    try {
      setIsSubmitting(true); setError('');
      await addTransaction({ ...form, amount: Number(form.amount) });
      onSuccess();
    } catch (requestError) { setError(requestError.message); }
    finally { setIsSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} className="space-y-4"><div><label className="mb-1 block text-sm" htmlFor="amount">Monto</label><input id="amount" name="amount" value={form.amount} onChange={updateField} type="number" min="0.01" step="0.01" required className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2" /></div><div><label className="mb-1 block text-sm" htmlFor="type">Tipo</label><select id="type" name="type" value={form.type} onChange={updateField} className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2"><option value="expense">Gasto</option><option value="income">Ingreso</option></select></div><div><label className="mb-1 block text-sm" htmlFor="category">Categoría</label><input id="category" name="category" value={form.category} onChange={updateField} required className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2" /></div><div><label className="mb-1 block text-sm" htmlFor="description">Descripción</label><textarea id="description" name="description" value={form.description} onChange={updateField} rows="3" className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2" /></div><Toast type="error" message={error} /><button disabled={isSubmitting} className="w-full rounded-md bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60">{isSubmitting ? 'Guardando…' : 'Guardar movimiento'}</button></form>;
}
