import React, { ReactNode, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [chatMessages, setChatMessages] = useState<
    {
      role: ReactNode;
      content: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = FIREBASE_AUTH.currentUser;
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (user && id) {
        const chatRef = doc(FIREBASE_DB, `users/${user.uid}/chats/${id}`);
        try {
          const chatDoc = await getDoc(chatRef);
          if (chatDoc.exists()) {
            setChatMessages(chatDoc.data().chatMessages || []);
          }
        } catch (error) {
          console.error("Error fetching chat messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChatMessages();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollViewContent}
    >
      {chatMessages.map((message, index) => (
        <View
          key={index}
          className="bg-gray-200 dark:bg-gray-800 rounded-md mb-2 p-3 "
        >
          <Text className="font-bold text-xl dark:text-white">
            {message.role === "user" ? user?.displayName : "VergiGPT"}
          </Text>
          <View style={styles.messageContent} className="dark:text-white">
            <Markdown
              style={{
                text: {
                  color: colorScheme.colorScheme === "dark" ? "white" : "black",
                },
              }}
            >
              {message.content}
            </Markdown>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageContent: {
    width: "100%",
    color: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
