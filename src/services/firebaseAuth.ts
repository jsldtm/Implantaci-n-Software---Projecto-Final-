// This Services file is part of the Firebase service integration
// It contains the Firebase configuration and initializes the Firebase authentication service

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";

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
