import { ITodoRepository } from "../../../domain/repositories/todorepository";

export class DeleteTodo {
  constructor(private repo: ITodoRepository) {}
  async execute(id: string): Promise<void> {
    await this.repo.remove(id);
  }
}
