import { Transaction } from '../../domain/entities/Transaction.js';

export class CreateTransactionUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({ userId, amount, type, category, description }) {
    const transaction = new Transaction({ userId, amount, type, category, description });
    return this.transactionRepository.create(transaction);
  }
}
