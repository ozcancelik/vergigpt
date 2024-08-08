import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      // Kullanıcı oturum açmamışsa
      if (segments[0] !== "(auth)") {
        router.replace("/login");
      }
    } else {
      // Kullanıcı oturum açmışsa
      if (segments[0] === "(auth)") {
        router.replace("/(drawer)");
      }
    }
  }, [user, segments]);

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "mon-sb",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          presentation: "modal",
          title: "Giriş Yap",
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
        name="forgot-password"
        options={{
          title: "Şifremi Unuttum",
        }}
      />
    </Stack>
  );
}
