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
import { FIREBASE_AUTH } from "@/config/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import Toast from "react-native-toast-message";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const auth = FIREBASE_AUTH;

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Lütfen e-posta adresinizi girin",
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi",
      });
      router.back(); // Giriş sayfasına geri dön
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Hata",
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
        Şifremi Unuttum
      </Text>

      <TextInput
        className="h-12 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-4"
        placeholder="E-posta"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleForgotPassword}
        className="bg-blue-500 rounded-xl py-3 items-center"
      >
        <Text className="text-white text-lg font-semibold">
          Şifre Sıfırlama Bağlantısı Gönder
        </Text>
      </TouchableOpacity>

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordPage;
