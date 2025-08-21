import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Todo } from "../../../domain/entities/todo";

const KEY = "feature.todos.v1";

export async function readAll(): Promise<Todo[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as Todo[]; } catch { return []; }
}
export async function writeAll(todos: Todo[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(todos));
}
