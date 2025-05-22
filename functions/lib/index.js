"use strict";
// This file contains the Cloud Functions for Firebase code
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Initialize the app with default credentials
admin.initializeApp();
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map