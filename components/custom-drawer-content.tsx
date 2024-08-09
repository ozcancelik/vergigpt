import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase-config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

interface Chat {
  id: string;
  name: string;
  createdAt: Date;
}

const PAGE_SIZE = 10;

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const [chats, setChats] = useState<Chat[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const { signOut } = useAuth();

  const navigation = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        const chatsRef = collection(FIREBASE_DB, `users/${user.uid}/chats`);
        const q = query(
          chatsRef,
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );

        try {
          const querySnapshot = await getDocs(q);
          const fetchedChats: Chat[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().chatTitle || "Unnamed Chat",
            createdAt: doc.data().createdAt.toDate(),
          }));
          setChats(fetchedChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };

    fetchChats();
  }, [user]);

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      className="p-3 border-b border-gray-200"
      onPress={() => navigation.push(`/chat/${item.id}`)}
    >
      <Text className="dark:text-white">{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Çıkış yapıldı");
      navigation.replace("/login");
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props} className="flex-1">
      <View className="flex-1">
        <Text className="text-lg font-bold p-3 dark:text-white">Chats</Text>
        <FlatList
          className="dark:text-white"
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <View className="p-5">
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-3 mb-2"
            onPress={handleSignOut}
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
