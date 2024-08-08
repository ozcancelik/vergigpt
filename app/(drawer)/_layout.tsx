import React from "react";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import CustomDrawerContent from "@/components/custom-drawer-content";

type DrawerIconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
};

function DrawerIcon({ name, color }: DrawerIconProps) {
  return <FontAwesome size={28} className="mb-2" name={name} color={color} />;
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="chat/[id]"
        options={{
          title: "Chat",
          drawerItemStyle: { height: 0 }, // Bu satır drawer'da görünmemesini sağlar
        }}
      />
    </Drawer>
  );
}
