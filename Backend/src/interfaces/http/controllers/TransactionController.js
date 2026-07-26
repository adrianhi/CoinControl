export class TransactionController {
  constructor({ createTransactionUseCase, getUserTransactionsUseCase }) {
    this.create = async (request, response) => {
      try {
        const transaction = await createTransactionUseCase.execute({
          userId: request.auth.sub,
          ...request.body
        });
        return response.status(201).json(transaction.toJSON());
      } catch (error) {
        if (['El usuario es requerido', 'El monto debe ser mayor a 0', 'El tipo de transacción no es válido', 'La categoría es requerida'].includes(error.message)) {
          return response.status(400).json({ message: error.message });
        }
        console.error('Transaction creation failed:', error);
        return response.status(500).json({ message: 'No se pudo crear el movimiento' });
      }
    };

    this.list = async (request, response) => {
      try {
        const transactions = await getUserTransactionsUseCase.execute(request.auth.sub);
        return response.status(200).json(transactions.map((transaction) => transaction.toJSON()));
      } catch (error) {
        console.error('Transaction listing failed:', error);
        return response.status(500).json({ message: 'No se pudieron cargar los movimientos' });
      }
    };
  }
}
