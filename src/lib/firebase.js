import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-cad9a.firebaseapp.com",
  projectId: "reactchatapp-cad9a",
  storageBucket: "reactchatapp-cad9a.appspot.com",
  messagingSenderId: "767270158660",
  appId: "1:767270158660:web:c6ae0104cf839cd8435711"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()