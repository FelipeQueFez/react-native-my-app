export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  done: boolean;
  createdAt: number; // epoch ms
  updatedAt: number;
}

export function createTodo(title: string): Todo {
  const trimmed = title.trim();
  if (!trimmed) throw new Error("Title cannot be empty");
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const now = Date.now();
  return { id, title: trimmed, done: false, createdAt: now, updatedAt: now };
}
