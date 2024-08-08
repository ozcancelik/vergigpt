import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

const predefinedQuestions = [
  "KDV Oranları nedir?",
  "KDV beyannamesi nasıl doldurulur?",
  "1 Milyon TL'nin Gelir Vergisi ne kadar?",
  "Vergi beyannamesi nasıl doldurulur?",
];
import CustomHeader from "@/components/custom-header";

export default function HomeScreen() {
  const [prompt, setPrompt] = React.useState("");
  const colorScheme = useColorScheme();

  const askQuestion = (question = prompt) => {
    if (question.trim()) {
      router.push(`/(drawer)`);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <CustomHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-4">
          <Text
            className={`text-3xl font-bold text-center mb-8 ${colorScheme === "dark" ? "text-white" : "text-black"}`}
          >
            Hoşgeldiniz!
          </Text>

          <View className="flex-1 justify-end">
            {predefinedQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 rounded-lg shadow-sm mb-3 ${
                  colorScheme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
                onPress={() => askQuestion(question)}
              >
                <Text
                  className={`text-base ${colorScheme === "dark" ? "text-white" : "text-black"}`}
                >
                  {question}
                </Text>
              </TouchableOpacity>
            ))}

            <View className="mt-4 flex-row">
              <TextInput
                className={`flex-1 p-4 rounded-lg shadow-sm text-base mr-2 ${
                  colorScheme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
                placeholder="VergiGPT'ye sor..."
                placeholderTextColor={
                  colorScheme === "dark" ? "#9CA3AF" : "#6B7280"
                }
                value={prompt}
                onChangeText={setPrompt}
                multiline
              />
              <TouchableOpacity
                className="bg-green-500 p-4 rounded-lg justify-center"
                onPress={() => askQuestion()}
              >
                <Text className="text-white text-center font-semibold">
                  SOR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
