// This Services file is part of the Firebase service integration
// It contains the Firebase configuration and initializes the Firebase authentication service

import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

// Initialize Firebase Admin SDK
let app;

try {
  app = initializeApp({ credential: applicationDefault() });
} catch (e) {
  // Prevent re-initialization error in dev
}

export async function verifyFirebaseToken(token: string) {
  if (!token) throw new Error("No token provided");
  const auth = getAuth();
  return await auth.verifyIdToken(token);
}