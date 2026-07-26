import { Router } from 'express';
import { validateRequest } from '../../../infrastructure/middlewares/validateRequest.js';
import { loginSchema } from '../validators/authSchemas.js';

export function createAuthRouter(authController) {
  const router = Router();
  router.post('/login', validateRequest(loginSchema), authController.login);
  return router;
}
