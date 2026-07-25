import pg from 'pg';

const { Pool } = pg;

export function createPostgresPool(connectionString) {
  return new Pool({ connectionString });
}
