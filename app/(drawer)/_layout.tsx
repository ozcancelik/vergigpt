import React from "react";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import CustomDrawerContent from "@/components/CustomDrawerContent";

type DrawerIconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
};

function DrawerIcon({ name, color }: DrawerIconProps) {
  return (
    <FontAwesome size={28} className="mb-[-3]" name={name} color={color} />
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setIsLoading(false);
      if (!user) {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) return null;

  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }: { color: string }) => (
            <DrawerIcon name="home" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="chats"
        options={{
          title: "Chats",
          drawerIcon: ({ color }: { color: string }) => (
            <DrawerIcon name="comments" color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
