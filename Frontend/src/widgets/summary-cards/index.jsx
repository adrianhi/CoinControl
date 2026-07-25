const currency = new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' });

export function SummaryCards({ summary }) {
  const cards = [
    { label: 'Balance total', value: summary.totalBalance, style: 'border-cyan-400/50 bg-cyan-950/30 text-cyan-100' },
    { label: 'Ingresos', value: summary.totalIncome, style: 'border-emerald-400/50 bg-emerald-950/30 text-emerald-100' },
    { label: 'Gastos', value: summary.totalExpenses, style: 'border-rose-400/50 bg-rose-950/30 text-rose-100' }
  ];
  return <section className="grid gap-4 md:grid-cols-3">{cards.map((card) => <article key={card.label} className={`rounded-xl border p-5 shadow-lg ${card.style}`}><p className="text-sm opacity-75">{card.label}</p><p className="mt-2 text-2xl font-bold">{currency.format(card.value)}</p></article>)}</section>;
}
