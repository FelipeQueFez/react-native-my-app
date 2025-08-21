import { repo } from "../../di/repo";
import { DeleteTodo } from "./application/deletetodo";
export const deleteTodoUC = new DeleteTodo(repo);
