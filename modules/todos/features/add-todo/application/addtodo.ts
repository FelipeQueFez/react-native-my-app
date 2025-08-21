import { createTodo, Todo } from "../../../domain/entities/todo";
import { ITodoRepository } from "../../../domain/repositories/todorepository";

export class AddTodo {
  constructor(private repo: ITodoRepository) {}
  async execute(title: string): Promise<Todo> {
    const todo = createTodo(title);
    await this.repo.add(todo);
    return todo;
  }
}
