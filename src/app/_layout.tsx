import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    LatoRegular: Lato_400Regular,
    LatoBold: Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#1A312C' }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="task/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}