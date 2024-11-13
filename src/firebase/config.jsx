// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TOD o: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8F6oYTMnQWwyMLwcl87-rg_DUJYD3CUg",
  authDomain: "domiburguer.firebaseapp.com",
  projectId: "domiburguer",
  storageBucket: "domiburguer.firebasestorage.app",
  messagingSenderId: "722900966985",
  appId: "1:722900966985:web:246f27525da4df0845e998",
  measurementId: "G-8JZ2VTN087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(app)

export {
  FirebaseAuth,
}