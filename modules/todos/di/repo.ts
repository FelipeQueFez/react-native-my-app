import { TodoRepositoryImpl } from "../data/sources/local/repositories/todorepositoryimpl";
import type { ITodoRepository } from "../domain/repositories/todorepository";

export const repo: ITodoRepository = new TodoRepositoryImpl();
