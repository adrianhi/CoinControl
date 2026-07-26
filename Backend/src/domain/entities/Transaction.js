export class Transaction {
  constructor({ id, userId, amount, type, category, description = null, createdAt }) {
    if (!userId) throw new Error('El usuario es requerido');
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) throw new Error('El monto debe ser mayor a 0');
    if (!['income', 'expense'].includes(type)) throw new Error('El tipo de transacción no es válido');
    if (!category?.trim()) throw new Error('La categoría es requerida');

    this.id = id;
    this.userId = userId;
    this.amount = Number(amount);
    this.type = type;
    this.category = category.trim();
    this.description = description?.trim() || null;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      amount: this.amount,
      type: this.type,
      category: this.category,
      description: this.description,
      createdAt: this.createdAt
    };
  }
}
