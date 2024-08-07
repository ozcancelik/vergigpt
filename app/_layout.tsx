import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../global.css";
import Toast from "react-native-toast-message";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(drawer)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

        <Stack.Screen
          name="register"
          options={{
            presentation: "modal",
            title: "Hesap Oluştur",
            headerTitleStyle: {
              fontFamily: "mon-sb",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="verify-email"
          options={{
            title: "E-posta Doğrulama",
            headerTitleStyle: {
              fontFamily: "mon-sb",
            },
          }}
        />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
