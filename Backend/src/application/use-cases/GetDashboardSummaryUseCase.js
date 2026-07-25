export class GetDashboardSummaryUseCase {
  async execute(_userId) {
    return {
      totalBalance: 12450.75,
      totalIncome: 15000,
      totalExpenses: 2549.25,
      recentTransactions: [
        { id: 'tx-001', description: 'Pago de nómina', category: 'Ingresos', type: 'income', amount: 3500, date: '2026-07-24' },
        { id: 'tx-002', description: 'Supermercado', category: 'Alimentación', type: 'expense', amount: 185.4, date: '2026-07-23' },
        { id: 'tx-003', description: 'Suscripción de internet', category: 'Servicios', type: 'expense', amount: 45, date: '2026-07-22' },
        { id: 'tx-004', description: 'Proyecto freelance', category: 'Ingresos', type: 'income', amount: 1200, date: '2026-07-20' },
        { id: 'tx-005', description: 'Transporte', category: 'Movilidad', type: 'expense', amount: 78.85, date: '2026-07-19' }
      ]
    };
  }
}
