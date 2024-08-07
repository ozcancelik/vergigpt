import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props} className="flex-1">
      <View className="flex-1">
        <DrawerItemList {...props} />
        <View className="p-5">
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-3 mb-2"
            onPress={() => FIREBASE_AUTH.signOut()}
          >
            <Text className="text-white text-center">Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 rounded-md p-3"
            onPress={() => FIREBASE_AUTH.currentUser?.delete()}
          >
            <Text className="text-white text-center">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
