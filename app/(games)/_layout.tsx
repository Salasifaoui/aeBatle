import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="game-details" options={{ headerShown: false }} />
      <Stack.Screen name="games" options={{ headerShown: false }} />
    </Stack>
  );
}
