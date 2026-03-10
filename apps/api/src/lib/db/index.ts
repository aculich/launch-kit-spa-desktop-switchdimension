import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

let _db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!_db) {
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    const pool = new Pool({ connectionString });
    _db = drizzle(pool);
  }
  return _db;
}

/** @deprecated Use getDb() for lazy initialization. Throws immediately if DATABASE_URL is missing. */
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});
