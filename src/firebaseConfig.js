// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";  // <-- Import sendPasswordResetEmail

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaH74Ij0xgn8jjPChN1L7aV73ifCJvzak",
  authDomain: "student-portal-1c102.firebaseapp.com",
  projectId: "student-portal-1c102",
  storageBucket: "student-portal-1c102.firebasestorage.app",
  messagingSenderId: "639825347114",
  appId: "1:639825347114:web:effc099c10c5bdfcd4f953",
  measurementId: "G-64B85P1496"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize auth

// Export auth, signInWithEmailAndPassword, and sendPasswordResetEmail
export { auth, signInWithEmailAndPassword, sendPasswordResetEmail };  // <-- Add sendPasswordResetEmail
