import { Todo } from "../../../domain/entities/todo";
import { ITodoRepository } from "../../../domain/repositories/todorepository";

export class ListTodos {
  constructor(private repo: ITodoRepository) {}
  async execute(): Promise<Todo[]> {
    // business rule: newest first
    const todos = await this.repo.list();
    return [...todos].sort((a, b) => b.createdAt - a.createdAt);
  }
}
