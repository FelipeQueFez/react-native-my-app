import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 20 }}>Feature Modules Demo</Text>
      <Link href="/todos">Open Todos</Link>
    </View>
  );
}
