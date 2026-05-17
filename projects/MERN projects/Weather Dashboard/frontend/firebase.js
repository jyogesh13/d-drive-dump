import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_uwFqEZqGeC2aYc7omKC6LmATv9R8Brc",
  authDomain: "weather-dashboard-14513.firebaseapp.com",
  projectId: "weather-dashboard-14513",
  storageBucket: "weather-dashboard-14513.firebasestorage.app",
  messagingSenderId: "522639879412",
  appId: "1:522639879412:web:a6dc33816eb4d2d549c2a1",
  measurementId: "G-6KE0HEHR74",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
