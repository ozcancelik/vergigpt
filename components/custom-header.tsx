import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function CustomHeader() {
  const navigation = useNavigation();

  return (
    <View className="h-16 flex-row items-center px-4">
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <FontAwesome
          name="bars"
          size={24}
          color={useColorScheme() === "dark" ? "#fff" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
}
