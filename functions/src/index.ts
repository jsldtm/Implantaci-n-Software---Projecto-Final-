// This file contains the Cloud Functions for Firebase code

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize the app with default credentials
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from FirebaseJake!");
});