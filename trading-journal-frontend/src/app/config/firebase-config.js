// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRksM8qqDizW22VlSCSYIBTxJPCto6S1A", // ใช้ API Key ของคุณ
  authDomain: "trading-journal-dd458.firebaseapp.com", // ใช้ Firebase Auth Domain ของคุณ
  projectId: "trading-journal-dd458", // ใช้ Project ID ของคุณ
  storageBucket: "trading-journal-dd458.appspot.com",
  messagingSenderId: "537759680433",
  appId: "1:537759680433:web:xxxxxxxxxxxxxxxxxx",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
export default app;
