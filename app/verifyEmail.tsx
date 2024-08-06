import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { User } from 'firebase/auth';

const VerifyEmailPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.emailVerified) {
        router.replace('/(tabs)')
      }
    });

    return () => unsubscribe();
  }, []);

  const resendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        Toast.show({
          type: 'success',
          text1: 'E-posta Gönderildi',
          text2: 'Doğrulama e-postası tekrar gönderildi.',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin.',
        });
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">E-posta Doğrulaması Gerekli</Text>
      <Text className="text-center mb-6 text-gray-600 dark:text-gray-300">
        Lütfen {user?.email} adresine gönderilen doğrulama e-postasını kontrol edin ve bağlantıya tıklayın.
      </Text>
      <TouchableOpacity 
        onPress={resendVerificationEmail} 
        className="bg-blue-500 rounded-xl py-3 px-6"
      >
        <Text className="text-white font-semibold">Doğrulama E-postasını Tekrar Gönder</Text>
      </TouchableOpacity>
    </View>
  )
}