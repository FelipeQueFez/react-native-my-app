import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TodoId } from "../../domain/entities/todo";
import { ITodoRepository } from "../../domain/repositories/todorepository";


const STORAGE_KEY = "ca.todos.v1";

async function readAll(): Promise<Todo[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Todo[];
    // basic type safety fallback
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(todos: Todo[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export class AsyncStorageTodoRepository implements ITodoRepository {
  async list(): Promise<Todo[]> {
    return readAll();
  }

  async saveAll(todos: Todo[]): Promise<void> {
    await writeAll(todos);
  }

  async add(todo: Todo): Promise<void> {
    const all = await readAll();
    all.push(todo);
    await writeAll(all);
  }

  async update(todo: Todo): Promise<void> {
    const all = await readAll();
    const idx = all.findIndex(t => t.id === todo.id);
    if (idx === -1) throw new Error("Todo not found");
    all[idx] = todo;
    await writeAll(all);
  }

  async remove(id: TodoId): Promise<void> {
    const all = await readAll();
    await writeAll(all.filter(t => t.id !== id));
  }
}
