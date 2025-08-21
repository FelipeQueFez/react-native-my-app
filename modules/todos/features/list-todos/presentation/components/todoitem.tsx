import { useTheme } from "@shared/theme";
import { Pressable, Text, View } from "react-native";

export default function TodoItem({ todo, onToggle, onDelete }: any) {
  const { theme } = useTheme();
  return (
    <View style={{
      padding: theme.spacing(3),
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.background
    }}>
      <Pressable onPress={() => onToggle(todo.id)} style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.text,
            textDecorationLine: todo.done ? "line-through" : "none"
          }}>
          {todo.title}
        </Text>
        <Text style={{ fontSize: 12, color: theme.colors.muted }}>
          {todo.done ? "Completed" : "Open"}
        </Text>
      </Pressable>
      <Pressable onPress={() => onDelete(todo.id)}>
        <Text style={{ fontWeight: "600", color: theme.colors.danger }}>🗑️</Text>
      </Pressable>
    </View>
  );
}
