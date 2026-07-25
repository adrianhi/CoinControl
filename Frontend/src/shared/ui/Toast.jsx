const colors = {
  success: 'border-emerald-400 bg-emerald-950 text-emerald-100',
  error: 'border-rose-400 bg-rose-950 text-rose-100'
};

export function Toast({ type = 'error', message }) {
  if (!message) return null;

  return (
    <div role="alert" className={`rounded-lg border px-4 py-3 text-sm ${colors[type]}`}>
      {message}
    </div>
  );
}
