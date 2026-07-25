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
}
