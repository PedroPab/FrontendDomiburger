// src/FirebaseAuthService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Función para registrar un usuario
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

// Función para iniciar sesión
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await signOut(FirebaseAuth);
    console.log("Sesión cerrada correctamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};
