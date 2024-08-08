import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router, Link } from "expo-router";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/toast-config";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = FIREBASE_AUTH;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);
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
  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error: any) {
      console.error("Error with Google sign in: ", error);
      Toast.show({
        type: "error",
        text1: "Google Girişi Başarısız",
        text2: error.message,
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 p-4 bg-white dark:bg-gray-900"
    >
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
      <Link href="/forgot-password" asChild>
        <TouchableOpacity className="mb-4">
          <Text className="text-blue-500 text-right">Şifremi Unuttum</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={signIn}
        disabled={loading}
        className={`bg-blue-500 rounded-xl py-3 items-center h-20 flex justify-center ${
          loading ? "opacity-70" : ""
        }`}
      >
        {loading ? (
          <View className="flex-row items-center">
            <View className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
            <Text className="text-white text-lg font-semibold"></Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Text className="text-white text-lg font-semibold">GİRİŞ YAP</Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="flex-row items-center mt-4">
        <View className="flex-1 border border-gray-300 dark:border-gray-600" />
        <Text className="text-gray-600 dark:text-gray-400 mx-4">veya</Text>
        <View className="flex-1 border border-gray-300 dark:border-gray-600" />
      </View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        disabled={!request}
        className="bg-white border border-gray-300 rounded-xl py-3 items-center mt-4"
      >
        <View className="flex-row items-center">
          <Ionicons name="logo-google" size={24} color="#4285F4" />
          <Text className="text-gray-700 text-lg font-semibold ml-2">
            Google ile Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
};

export default Page;
