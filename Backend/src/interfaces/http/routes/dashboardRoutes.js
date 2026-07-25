import { Router } from 'express';

export function createDashboardRouter({ dashboardController, authenticate }) {
  const router = Router();
  router.get('/summary', authenticate, dashboardController.getSummary);
  return router;
}
