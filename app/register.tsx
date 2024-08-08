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
import { FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toastConfig } from "@/config/toast-config";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = FIREBASE_AUTH;

  const validateForm = () => {
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "İsim Soyisim gereklidir",
      });
      return false;
    }
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
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: "Şifreler eşleşmiyor",
      });
      return false;
    }
    return true;
  };

  const signUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      const userDocRef = doc(FIREBASE_DB, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        uid: userCredential.user.uid,
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp(),
        emailVerified: false,
      });

      await sendEmailVerification(userCredential.user);

      Toast.show({
        type: "success",
        text1: "Kayıt Başarılı",
        text2: "Lütfen e-postanızı doğrulayın.",
      });
      router.replace("/verify-email"); // Redirect to email verification page
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Kayıt başarısız",
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
      <Text className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Yeni hesap oluştur
      </Text>

      <View className="mb-4">
        <TextInput
          className="h-12 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-2"
          placeholder="İsim Soyisim"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          className="h-12 border border-gray-300 dark:border-gray-600 rounded-xl px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-2"
          placeholder="E-posta"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row items-center h-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
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

        <View className="flex-row items-center h-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 mt-2">
          <TextInput
            className="flex-1 h-full px-4 text-gray-800 dark:text-white"
            placeholder="Şifre Tekrar"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="px-3"
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={signUp}
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

      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
};

export default Page;
