import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClpbqw6ruma60auZyLy_Giy-NCptHYARs",
  authDomain: "videotube-806ab.firebaseapp.com",
  projectId: "videotube-806ab",
  storageBucket: "videotube-806ab.firebasestorage.app",
  messagingSenderId: "768013151721",
  appId: "1:768013151721:web:53f6b976cebd685be6af78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app