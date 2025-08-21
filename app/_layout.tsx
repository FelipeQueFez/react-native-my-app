import { Stack } from "expo-router";
import "./../modules/shared/i18n/i18n"; // initialize i18n

export default function RootLayout() {
  return <Stack screenOptions={{ headerTitleAlign: "center" }} />;
}
