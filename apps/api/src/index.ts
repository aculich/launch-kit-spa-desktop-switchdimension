import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { clerkMiddleware } from '@hono/clerk-auth';
import { healthRoute } from './routes/health.js';
import { todosRoute } from './routes/todos.js';
import { usersRoute } from './routes/users.js';

const app = new Hono();

app.use('/api/*', cors());
app.use('/api/*', clerkMiddleware());
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

