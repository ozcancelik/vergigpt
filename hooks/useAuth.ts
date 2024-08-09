// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/config/firebase-config';
import { router } from 'expo-router';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser: any) => {
      setUser(currentUser);
      if (!currentUser) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(FIREBASE_AUTH);
      // signOut işlemi başarılı olduğunda, onAuthStateChanged tetiklenecek
      // ve kullanıcıyı ana sayfaya yönlendirecek
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return { user, signOut };
}