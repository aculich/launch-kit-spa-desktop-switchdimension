import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from monorepo root (cwd can be repo root or apps/api depending on how npm/concurrently runs the script)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { clerkMiddleware } from '@hono/clerk-auth';
import { healthRoute } from './routes/health.js';
import { todosRoute } from './routes/todos.js';
import { usersRoute } from './routes/users.js';

const app = new Hono();

app.use('/api/*', cors());

const isClerkConfigured =
  !!process.env.CLERK_SECRET_KEY &&
  process.env.CLERK_SECRET_KEY.length > 10;

if (isClerkConfigured) {
  app.use('/api/*', clerkMiddleware());
} else {
  console.warn('[auth] Clerk not configured — API routes are unprotected');
}
app.route('/api', healthRoute);
app.route('/api', todosRoute);
app.route('/api', usersRoute);

export type AppType = typeof app;

const port = Number(process.env.PORT) || 3834;

console.log(`Hono API listening on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

