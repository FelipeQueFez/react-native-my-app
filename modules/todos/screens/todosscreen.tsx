import LanguageSwitcher from "@shared/i18n/components/LanguageSwitcher"; // path alias if you set it
import { useTheme } from "@shared/theme";
import ThemeSwitcher from "@shared/theme/components/ThemeSwitcher";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import type { Todo } from "../domain/entities/todo";
import { AddTodoForm, addTodoUC } from "../features/add-todo";
import { deleteTodoUC } from "../features/delete-todo";
import { TodoList, listTodosUC } from "../features/list-todos";
import { toggleTodoUC } from "../features/toggle-todo";

export default function TodosScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try { setLoading(true); setTodos(await listTodosUC.execute()); }
    catch { setError(t("error.loadTodos")); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: theme.spacing(4), gap: theme.spacing(3) }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: theme.colors.text }}>{t("todos.title")}</Text>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <AddTodoForm onAdd={async (title) => { await addTodoUC.execute(title); await refresh(); }} />
        {loading && <ActivityIndicator size="small" />}
        {error && <Text style={{ color: "tomato" }}>{error}</Text>}
      </View>
      <TodoList
        todos={todos}
        onToggle={async (id) => {
          const updated = await toggleTodoUC.execute(id);
          setTodos(prev => prev.map(ti => (ti.id === updated.id ? updated : ti)));
        }}
        onDelete={async (id) => {
          await deleteTodoUC.execute(id);
          setTodos(prev => prev.filter(ti => ti.id !== id));
        }}
      />
    </SafeAreaView>
  );
}
