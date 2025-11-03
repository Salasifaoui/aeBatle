import { AuthProvider } from "@/src/providers/AuthProvider";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

import { useColorScheme } from "@/src/hooks/useColorSchema";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { AeSdkProvider } from "@/src/dex/context/AeSdkContext";
import { useAuth } from "@/src/features/auth";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "index",
};

const StackLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const isAtRoot = segments.length === (0 as number);
      if (isAtRoot) {
        if (user) {
          router.replace("/(tabs)/home");
        } else if (!user) {
          router.replace("/(auth)/auth-model");
        }
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500);
      }
    }
  }, [loading, user, segments]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(games)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <GluestackUIProvider mode={isDarkColorScheme ? "dark" : "light"}>
        <AeSdkProvider>
        <StackLayout />
        </AeSdkProvider>
       
        <StatusBar
          key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
          style={isDarkColorScheme ? "light" : "dark"}
        />
      </GluestackUIProvider>
    </AuthProvider>
  );
}
