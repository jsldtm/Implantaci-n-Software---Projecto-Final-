// This Services file is part of the Firebase service integration.


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  
};

// Initialize Firebase authentication
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Export the initialized app for use in other services
export { app };
