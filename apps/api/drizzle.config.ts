import dotenv from 'dotenv';
import { resolve } from 'path';

// Load from repo root (works when cwd is apps/api from npm run db:*)
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
