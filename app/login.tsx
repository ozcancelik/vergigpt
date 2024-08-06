import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e", backgroundColor: "#4ade80" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#dc2626", backgroundColor: "#ef4444" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#f59e0b", backgroundColor: "#f97316" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
};
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = FIREBASE_AUTH;

  const validateForm = () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "E-posta gereklidir",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Geçerli bir e-posta adresi giriniz",
      });
      return false;
    }
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Şifre gereklidir",
      });
      return false;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Şifre en az 6 karakter olmalıdır",
      });
      return false;
    }
    return true;
  };

  const signIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        Toast.show({
          type: "info",
          text1: "E-posta Doğrulanmadı.",
          text2: "Lütfen e-postanızı doğrulayın.",
        });
        router.replace("/verify-email");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Giriş başarısız",
        text2: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 p-4 bg-white dark:bg-gray-900"
    >
      {loading && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Giriş Yap
      </Text>

      <View className="mb-4">
        <TextInput
          className="h-12 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-2"
          placeholder="E-posta"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row items-center h-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 mt-2">
          <TextInput
            className="flex-1 h-full px-4 text-gray-800 dark:text-white"
            placeholder="Şifre"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-3"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={signIn}
        className="bg-blue-500 rounded-xl py-3 items-center"
      >
        <Text className="text-white text-lg font-semibold">GİRİŞ YAP</Text>
      </TouchableOpacity>

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default Page;
