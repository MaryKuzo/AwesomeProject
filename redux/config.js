// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKxvfEjcrxX3KYG_w1xbTlJ4juThuSGH4",
  authDomain: "awesome-project-92181.firebaseapp.com",
  databaseURL: "https://awesome-project-92181-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-project-92181",
  storageBucket: "awesome-project-92181.appspot.com",
  messagingSenderId: "534166626579",
  appId: "1:534166626579:web:a1d146e03b39603db77ae6",
  measurementId: "G-BQ4KVZ6GG8",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);