import { Todo } from "../../domain/entities/todo";
import { ITodoRepository } from "../../domain/repositories/todorepository";

export class ToggleTodo {
  constructor(private repo: ITodoRepository) {}
  async execute(id: string): Promise<Todo> {
    const todos = await this.repo.list();
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) throw new Error("Todo not found");
    const updated: Todo = { ...todos[idx], done: !todos[idx].done, updatedAt: Date.now() };
    await this.repo.update(updated);
    return updated;
  }
}
