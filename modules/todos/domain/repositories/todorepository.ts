import { Todo, TodoId } from "../entities/todo";


export interface ITodoRepository {
  list(): Promise<Todo[]>;
  saveAll(todos: Todo[]): Promise<void>;
  // Optional convenience
  add(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  remove(id: TodoId): Promise<void>;
}
