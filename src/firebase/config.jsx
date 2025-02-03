// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// TODO: Agrega otros SDKs de productos de Firebase que necesites
// Más información: https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para tu aplicación web
// Para Firebase JS SDK v7.20.0 y posteriores, measurementId es opcional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

console.log("Configuración de Firebase:", firebaseConfig);

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(app);

// Conecta con el emulador de autenticación si estás en desarrollo (localhost)
if (window.location.hostname === "localhost") {
  connectAuthEmulator(FirebaseAuth, "http://localhost:9099");
}

export { FirebaseAuth };
