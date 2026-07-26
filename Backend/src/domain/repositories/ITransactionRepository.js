export class ITransactionRepository {
  async create(_transaction) {
    throw new Error('ITransactionRepository.create must be implemented');
  }

  async findByUserId(_userId) {
    throw new Error('ITransactionRepository.findByUserId must be implemented');
  }
}
