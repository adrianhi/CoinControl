import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase.js';
import { createPostgresPool } from '../../infrastructure/database/postgres.js';
import { runAuthMigrations } from '../../infrastructure/database/runAuthMigrations.js';
import { PgUserRepository } from '../../infrastructure/repositories/PgUserRepository.js';
import { AuthController } from './controllers/AuthController.js';
import { createAuthRouter } from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const pool = createPostgresPool(process.env.DATABASE_URL);
const userRepository = new PgUserRepository(pool);
const loginUserUseCase = new LoginUserUseCase({
  userRepository,
  jwtSecret: process.env.JWT_SECRET || 'development-only-secret'
});
const authController = new AuthController(loginUserUseCase);

app.use(cors());
app.use(express.json());
app.use('/api/auth', createAuthRouter(authController));

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok', service: 'coincontrol-backend' });
});

async function startServer() {
  try {
    await runAuthMigrations(pool);
    app.listen(port, () => {
      console.log(`CoinControl API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

startServer();
