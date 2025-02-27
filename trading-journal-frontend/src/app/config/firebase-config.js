// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration (using environment variables)
const firebaseConfig = {
  apiKey: "AIzaSyCRksM8qqDizW22VlSCSYIBTxJPCto6S1A",  // ใช้ค่า API Key ตรงๆ
  authDomain: "trading-journal-dd458.firebaseapp.com",
  projectId: "trading-journal-dd458",
  storageBucket: "trading-journal-dd458.appspot.com",
  messagingSenderId: "537759680433",
  appId: "1:537759680433:web:ada45146cc5121eb951f90",
};



// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set up Google Authentication provider
const provider = new GoogleAuthProvider();

// Function for logging in with email and password
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User Logged In with Email:", user);
    // You can send the user information to your server or database here if needed
  } catch (error) {
    console.error("Error during Email login:", error);
    alert(`Error: ${error.message}`);
  }
};

// Function for logging in with Google
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Logged In with Google:", user);
    // You can send the user information to your server or database here if needed
  } catch (error) {
    console.error("Error during Google login:", error);
    alert(`Error: ${error.message}`);
  }
};

// Export Firebase Auth, Google Auth Provider, signInWithPopup, and login functions
export { auth, provider, signInWithPopup, loginWithEmail, loginWithGoogle };
export default app;
