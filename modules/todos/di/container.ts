import { AddTodo } from "../application/usecases/addtodo";
import { DeleteTodo } from "../application/usecases/deletetodo";
import { ListTodos } from "../application/usecases/listtodos";
import { ToggleTodo } from "../application/usecases/toggletodo";
import { TodoRepositoryImpl } from "../data/sources/local/repositories/todorepositoryimpl";

const repo = new TodoRepositoryImpl();

export const usecases = {
  addTodo: new AddTodo(repo),
  listTodos: new ListTodos(repo),
  toggleTodo: new ToggleTodo(repo),
  deleteTodo: new DeleteTodo(repo),
};
