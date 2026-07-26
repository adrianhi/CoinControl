import { useState } from 'react';
import { useTransactionStore } from '../../../entities/transaction';
import { Toast } from '../../../shared/ui/Toast';

const inputClass = (hasError) => `w-full rounded-md border bg-slate-800 px-3 py-2 outline-none focus:border-cyan-400 ${hasError ? 'border-red-500' : 'border-slate-700'}`;

function validate(values) {
  const errors = {};
  if (!Number.isFinite(Number(values.amount)) || Number(values.amount) <= 0) errors.amount = 'El monto debe ser mayor a 0.';
  if (!['income', 'expense'].includes(values.type)) errors.type = 'Selecciona un tipo válido.';
  if (!values.category.trim()) errors.category = 'La categoría es obligatoria.';
  if (!values.description.trim()) errors.description = 'La descripción no puede estar vacía.';
  return errors;
}

export function AddTransactionForm({ onSuccess }) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [values, setValues] = useState({ amount: '', type: 'expense', category: '', description: '' });
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
      await addTransaction({ ...values, amount: Number(values.amount) });
      onSuccess();
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'No se pudo crear el movimiento.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form noValidate onSubmit={handleSubmit} className="space-y-4"><div><label className="mb-1 block text-sm" htmlFor="amount">Monto</label><input id="amount" name="amount" value={values.amount} onChange={updateField} type="number" min="0.01" step="0.01" className={inputClass(submitted && errors.amount)} aria-invalid={Boolean(submitted && errors.amount)} />{submitted && errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}</div><div><label className="mb-1 block text-sm" htmlFor="type">Tipo</label><select id="type" name="type" value={values.type} onChange={updateField} className={inputClass(submitted && errors.type)}>{<><option value="expense">Gasto</option><option value="income">Ingreso</option></>}</select>{submitted && errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}</div><div><label className="mb-1 block text-sm" htmlFor="category">Categoría</label><input id="category" name="category" value={values.category} onChange={updateField} className={inputClass(submitted && errors.category)} aria-invalid={Boolean(submitted && errors.category)} />{submitted && errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}</div><div><label className="mb-1 block text-sm" htmlFor="description">Descripción</label><textarea id="description" name="description" value={values.description} onChange={updateField} rows="3" className={inputClass(submitted && errors.description)} aria-invalid={Boolean(submitted && errors.description)} />{submitted && errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}</div><Toast {...notification} /><button disabled={isSubmitting} className="w-full rounded-md bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60">{isSubmitting ? 'Guardando…' : 'Guardar movimiento'}</button></form>;
}
