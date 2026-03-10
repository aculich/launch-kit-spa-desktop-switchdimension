import { Hono } from 'hono';
import { getAuth } from '@hono/clerk-auth';
import { db } from '../lib/db/index.js';
import { users } from '../lib/db/schema.js';

export const usersRoute = new Hono().get('/users', async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const result = await db.select().from(users);
  return c.json(result);
});
