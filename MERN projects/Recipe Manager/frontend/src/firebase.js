import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCnTtYkt6Eywkj2adi5_cEGxW09j5l4kc",
  authDomain: "recipeimg.firebaseapp.com",
  projectId: "recipeimg",
  storageBucket: "recipeimg.firebasestorage.app",
  messagingSenderId: "195281433696",
  appId: "1:195281433696:web:7a8a4859b6aafa2d2d7f05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

export default app

