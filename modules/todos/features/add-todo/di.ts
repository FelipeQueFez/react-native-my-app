import { repo } from "../../di/repo";
import { AddTodo } from "./application/addtodo";

export const addTodoUC = new AddTodo(repo);
