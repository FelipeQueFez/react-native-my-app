
import { repo } from "../../di/repo";
import { ListTodos } from "./application/listtodos";
export const listTodosUC = new ListTodos(repo);
