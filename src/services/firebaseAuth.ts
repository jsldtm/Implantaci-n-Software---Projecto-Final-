// Código por - Joaquín Saldarriaga
// This Services file is part of the Firebase service integration
// It contains the Firebase configuration and initializes the Firebase authentication service

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";


// Register a new user
export async function register(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Create a function to handle user login
export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // userCredential.user contains user info
    return userCredential.user;
  } catch (error) {
    // handle error
    throw error;
  }
}

// Logout
export async function logout() {
  return await signOut(auth);
}
