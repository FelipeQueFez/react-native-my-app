import { useState } from "react";
import { ActivityIndicator, Button, FlatList, SafeAreaView, Text, TextInput, View } from "react-native";
import TodoItem from "../src/presentation/components/todoitem";
import { useTodos } from "../src/presentation/hooks/usetodos";

export default function Home() {
  const [title, setTitle] = useState("");
  const { todos, loading, error, add, toggle, remove } = useTodos();

  const handleAdd = async () => {
    try {
      if (!title.trim()) return;
      await add(title);
      setTitle("");
    } catch (e) {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Clean Architecture Todo</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Add a task..."
            style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, height: 44 }}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <Button title="Add" onPress={handleAdd} />
        </View>
        {loading && <ActivityIndicator size="small" />}
        {error && <Text style={{ color: "tomato" }}>{error}</Text>}
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggle} onDelete={remove} />
        )}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        ListEmptyComponent={!loading ? <Text style={{ textAlign: "center", color: "#777", marginTop: 24 }}>No tasks yet—add one above.</Text> : null}
      />
    </SafeAreaView>
  );
}
