import { Transaction } from '../../domain/entities/Transaction.js';
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository.js';

export class PgTransactionRepository extends ITransactionRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async create(transaction) {
    const result = await this.pool.query(
      `INSERT INTO transactions (user_id, amount, type, category, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, amount, type, category, description, created_at`,
      [transaction.userId, transaction.amount, transaction.type, transaction.category, transaction.description]
    );
    return this.#toEntity(result.rows[0]);
  }

  async findByUserId(userId) {
    const result = await this.pool.query(
      `SELECT id, user_id, amount, type, category, description, created_at
       FROM transactions WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows.map((row) => this.#toEntity(row));
  }

  #toEntity(row) {
    return new Transaction({
      id: row.id,
      userId: row.user_id,
      amount: Number(row.amount),
      type: row.type,
      category: row.category,
      description: row.description,
      createdAt: row.created_at
    });
  }
}
