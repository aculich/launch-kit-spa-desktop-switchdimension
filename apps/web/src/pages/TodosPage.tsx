import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/shared/lib/use-api';
import { Button } from '@/components/ui/button';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string | null;
};

export function TodosPage() {
  const api = useApi();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTodos = useCallback(async () => {
    // @ts-expect-error - useApi() client type lost under tsc -b; runtime shape is correct
    const res = await api.api.todos.$get();
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchTodos();
  }, [api, fetchTodos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || submitting) return;
    setSubmitting(true);
    // @ts-expect-error - useApi() client type lost under tsc -b; runtime shape is correct
    const res = await api.api.todos.$post({ json: { title: t } });
    if (res.ok) {
      const created = await res.json();
      setTodos((prev) => [created, ...prev]);
      setTitle('');
    }
    setSubmitting(false);
  };

  const handleToggle = async (id: number, completed: boolean) => {
    // @ts-expect-error - useApi() client type lost under tsc -b; runtime shape is correct
    const res = await api.api.todos[':id'].$patch({
      param: { id: String(id) },
      json: { completed: !completed },
    });
    if (res.ok) {
      const updated = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Todos</h1>
        <p className="mt-2 text-zinc-400">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-100">Todos</h1>
      <p className="mt-1 text-zinc-400">
        Minimal todo app — database connected via Drizzle + Neon.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-ring"
          disabled={submitting}
        />
        <Button type="submit" disabled={submitting || !title.trim()}>
          Add
        </Button>
      </form>

      <ul className="mt-6 space-y-2">
        {todos.length === 0 ? (
          <li className="text-zinc-500">No todos yet. Add one above.</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-md border border-sidebar-border bg-sidebar px-3 py-2"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
                className="size-4 rounded border-input"
              />
              <span
                className={
                  todo.completed
                    ? 'flex-1 text-zinc-500 line-through'
                    : 'flex-1 text-zinc-100'
                }
              >
                {todo.title}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
