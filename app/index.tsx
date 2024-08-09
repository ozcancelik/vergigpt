import React, { useEffect } from "react";
import { Text, View } from "react-native";
import BottomLoginSheet from "@/components/BottomLoginSheet";

export default function Index() {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-600">
          VergiGPT'ye hoş geldiniz!!
        </Text>
      </View>
      <BottomLoginSheet />
    </View>
  );
}
