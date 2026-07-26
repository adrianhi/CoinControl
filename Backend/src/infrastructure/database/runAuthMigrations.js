const adminEmail = 'admin@coincontrol.local';
const adminPasswordHash = '$2b$12$NVIaJIeSTrNjK/38MqzSluI28mzj5YuesCoW2b3w/5VDjt3jDsm7u';

/**
 * Bootstrap idempotente para desarrollo.
 * También corrige volúmenes de PostgreSQL creados antes de añadir la migración.
 */
export async function runAuthMigrations(pool) {
  await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [adminEmail, adminPasswordHash]
  );
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
      type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
      category VARCHAR(100) NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query('CREATE INDEX IF NOT EXISTS idx_transactions_user_created_at ON transactions (user_id, created_at DESC)');
}
