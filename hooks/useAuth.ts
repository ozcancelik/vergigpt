import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return { user };
}