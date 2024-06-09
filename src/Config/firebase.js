import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIunfTPexT62itndxcSnQWMhdU1EUeYy4",
  authDomain: "docs-app-3a782.firebaseapp.com",
  projectId: "docs-app-3a782",
  storageBucket: "docs-app-3a782.appspot.com",
  messagingSenderId: "843081768140",
  appId: "1:843081768140:web:ad3507780d4d09d665b669",
  measurementId: "G-V79MK7PY3H",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export default app;
