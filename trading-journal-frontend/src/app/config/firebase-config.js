import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";  // เพิ่ม signInWithPopup

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRksM8qqDizW22VlSCSYIBTxJPCto6S1A", // ใช้ API Key ของคุณ
  authDomain: "trading-journal-dd458.firebaseapp.com", // ใช้ Firebase Auth Domain ของคุณ
  projectId: "trading-journal-dd458", // ใช้ Project ID ของคุณ
  storageBucket: "trading-journal-dd458.appspot.com",
  messagingSenderId: "537759680433",
  appId: "1:537759680433:web:xxxxxxxxxxxxxxxxxx", // ใช้ App ID ของคุณ
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize GoogleAuthProvider สำหรับล็อกอินผ่าน Google
const provider = new GoogleAuthProvider();

// Export Firebase Auth, Google Auth Provider, และ signInWithPopup
export { auth, provider, signInWithPopup };
export default app;
