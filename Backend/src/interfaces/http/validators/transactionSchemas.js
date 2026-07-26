import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.coerce.number({ invalid_type_error: 'El monto debe ser un número' }).positive('El monto debe ser mayor a 0'),
  type: z.enum(['income', 'expense'], { errorMap: () => ({ message: "El tipo debe ser 'income' o 'expense'" }) }),
  category: z.string().trim().min(1, 'La categoría es obligatoria'),
  description: z.string().trim().min(1, 'La descripción no puede estar vacía')
});
