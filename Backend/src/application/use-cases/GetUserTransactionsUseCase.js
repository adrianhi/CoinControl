export class GetUserTransactionsUseCase {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(userId) {
    return this.transactionRepository.findByUserId(userId);
  }
}
