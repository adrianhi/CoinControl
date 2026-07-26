import { Router } from 'express';

export function createTransactionRouter({ transactionController, authenticate }) {
  const router = Router();
  router.use(authenticate);
  router.get('/', transactionController.list);
  router.post('/', transactionController.create);
  return router;
}
