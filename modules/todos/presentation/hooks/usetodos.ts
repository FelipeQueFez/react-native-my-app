import { useCallback, useEffect, useState } from "react";
import { usecases } from "../../di/container";
import type { Todo } from "../../domain/entities/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setTodos(await usecases.listTodos.execute());
    } catch (e: any) {
      setError(e?.message ?? "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (title: string) => {
    const todo = await usecases.addTodo.execute(title);
    setTodos(prev => [todo, ...prev]);
  }, []);

  const toggle = useCallback(async (id: string) => {
    const updated = await usecases.toggleTodo.execute(id);
    setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
  }, []);

  const remove = useCallback(async (id: string) => {
    await usecases.deleteTodo.execute(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { todos, loading, error, add, toggle, remove, refresh };
}
