// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhQpRKzAgB-wD0dX3PyGgnLA4O1l0hY-w",
    authDomain: "vergi-gpt.firebaseapp.com",
    projectId: "vergi-gpt",
    storageBucket: "vergi-gpt.appspot.com",
    messagingSenderId: "210866303046",
    appId: "1:210866303046:web:2e3e439993c3d57b08da47"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);