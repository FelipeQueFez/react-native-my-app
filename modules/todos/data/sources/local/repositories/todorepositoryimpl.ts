import type { Todo, TodoId } from "../../../../domain/entities/todo";
import type { ITodoRepository } from "../../../../domain/repositories/todorepository";
import { readAll, writeAll } from "../asyncstoragetododatasource";

export class TodoRepositoryImpl implements ITodoRepository {
  saveAll(todos: Todo[]): Promise<void> {
      throw new Error("Method not implemented.");
  }
  async list(): Promise<Todo[]> { return readAll(); }
  async add(todo: Todo): Promise<void> {
    const all = await readAll(); all.push(todo); await writeAll(all);
  }
  async update(todo: Todo): Promise<void> {
    const all = await readAll();
    const i = all.findIndex(t => t.id === todo.id);
    if (i === -1) throw new Error("Todo not found");
    all[i] = todo; await writeAll(all);
  }
  async remove(id: TodoId): Promise<void> {
    const all = await readAll();
    await writeAll(all.filter(t => t.id !== id));
  }
}
