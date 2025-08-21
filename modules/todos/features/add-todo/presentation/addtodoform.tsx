import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function AddTodoForm({ onAdd }: { onAdd: (title: string) => Promise<void> }) {
  const [title, setTitle] = useState("");
  const submit = async () => {
    if (!title.trim()) return;
    await onAdd(title);
    setTitle("");
  };
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Add a task..."
        style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, height: 44 }}
        returnKeyType="done"
        onSubmitEditing={submit}
      />
      <Button title="Add" onPress={submit} />
    </View>
  );
}
