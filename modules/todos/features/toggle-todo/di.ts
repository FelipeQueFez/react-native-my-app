import { repo } from "../../di/repo";
import { ToggleTodo } from "./application/toggletodo";
export const toggleTodoUC = new ToggleTodo(repo);
