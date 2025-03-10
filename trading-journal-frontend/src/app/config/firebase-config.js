// เรียกใช้งาน dotenv
require('dotenv').config();

// Import the necessary functions from the Firebase SDK
const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } = require("firebase/auth");

// Firebase configuration (using environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
module.exports = { auth, provider, signInWithPopup, loginWithEmail, loginWithGoogle };
module.exports.default = app;
