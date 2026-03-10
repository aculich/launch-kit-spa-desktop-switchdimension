import { Hono } from 'hono';
import { getAuth } from '@hono/clerk-auth';
import { desc, eq } from 'drizzle-orm';
import { db } from '../lib/db/index.js';
import { todos } from '../lib/db/schema.js';

export const todosRoute = new Hono()
  .get('/todos', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const result = await db.select().from(todos).orderBy(desc(todos.createdAt));
    return c.json(result);
  })
  .post('/todos', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    let body: { title?: string };
    try {
      body = await c.req.json<{ title: string }>();
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
    const title = body?.title?.trim();
    if (!title) {
      return c.json({ error: 'title is required' }, 400);
    }
    try {
      const [inserted] = await db
        .insert(todos)
        .values({ title })
        .returning();
      return c.json(inserted!, 201);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[POST /api/todos]', err);
      return c.json(
        { error: 'Failed to create todo', details: message },
        500
      );
    }
  })
  .patch('/todos/:id', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const id = Number(c.req.param('id'));
    if (Number.isNaN(id)) {
      return c.json({ error: 'invalid id' }, 400);
    }
    const body = await c.req.json<{ completed?: boolean }>();
    const [updated] = await db
      .update(todos)
      .set({ completed: body.completed ?? true })
      .where(eq(todos.id, id))
      .returning();
    if (!updated) {
      return c.json({ error: 'not found' }, 404);
    }
    return c.json(updated);
  });
