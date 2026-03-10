import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { healthRoute } from './routes/health.js';

const app = new Hono();

app.use('/api/*', cors());
app.route('/api', healthRoute);

export type AppType = typeof app;

const port = Number(process.env.PORT) || 3834;

console.log(`Hono API listening on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

