import { FlatList, Text } from "react-native";
import type { Todo } from "../../../domain/entities/todo";
import TodoItem from "./components/todoitem";

export default function TodoList({
  todos, onToggle, onDelete
}: { todos: Todo[]; onToggle: (id: string) => Promise<void>; onDelete: (id: string) => Promise<void>; }) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => <TodoItem todo={item} onToggle={onToggle} onDelete={onDelete} />}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      ListEmptyComponent={<Text style={{ textAlign: "center", color: "#777", marginTop: 24 }}>
        No tasks yet—add one above.
      </Text>}
    />
  );
}
