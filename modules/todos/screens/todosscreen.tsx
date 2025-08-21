import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import type { Todo } from "../domain/entities/todo";
import { AddTodoForm, addTodoUC } from "../features/add-todo";
import { deleteTodoUC } from "../features/delete-todo";
import { TodoList, listTodosUC } from "../features/list-todos";
import { toggleTodoUC } from "../features/toggle-todo";

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try { setLoading(true); setTodos(await listTodosUC.execute()); }
    catch (e: any) { setError(e?.message ?? "Failed to load todos"); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const onAdd = async (title: string) => {
    await addTodoUC.execute(title);
    await refresh();
  };
  const onToggle = async (id: string) => {
    const updated = await toggleTodoUC.execute(id);
    setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };
  const onDelete = async (id: string) => {
    await deleteTodoUC.execute(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Todos (Use-case features)</Text>
        <AddTodoForm onAdd={onAdd} />
        {loading && <ActivityIndicator size="small" />}
        {error && <Text style={{ color: "tomato" }}>{error}</Text>}
      </View>
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </SafeAreaView>
  );
}
