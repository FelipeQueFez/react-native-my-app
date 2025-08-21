import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import type { Todo } from "../../../../domain/entities/todo";

export default function TodoItem({
  todo, onToggle, onDelete
}: { todo: Todo; onToggle: (id: string) => void; onDelete: (id: string) => void; }) {
  const { t } = useTranslation();
  return (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee",
                   flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Pressable onPress={() => onToggle(todo.id)} style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, textDecorationLine: todo.done ? "line-through" : "none" }}>
          {todo.title}
        </Text>
        <Text style={{ fontSize: 12, color: "#888" }}>
          {todo.done ? t("status.completed") : t("status.open")}
        </Text>
      </Pressable>
      <Pressable onPress={() => onDelete(todo.id)} accessibilityRole="button" accessibilityLabel={`${t("delete")} ${todo.title}`}>
        <Text style={{ fontWeight: "600" }}>🗑️</Text>
      </Pressable>
    </View>
  );
}
