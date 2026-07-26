import { Router } from 'express';
import { validateRequest } from '../../../infrastructure/middlewares/validateRequest.js';
import { createTransactionSchema } from '../validators/transactionSchemas.js';

export function createTransactionRouter({ transactionController, authenticate }) {
  const router = Router();
  router.use(authenticate);
  router.get('/', transactionController.list);
  router.post('/', validateRequest(createTransactionSchema), transactionController.create);
  return router;
}
