import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FirebaseApiKey,
  FirebaseAuthDomain,
  FirebaseProjectId,
  FirebaseAppId,
  FirebaseMeasurementId,
  FirebaseMessagingSenderId,
  FirebaseStorageBucket,
} from "@/config/env";

const firebaseConfig = {
  apiKey: FirebaseApiKey,
  authDomain: FirebaseAuthDomain,
  projectId: FirebaseProjectId,
  storageBucket: FirebaseStorageBucket,
  messagingSenderId: FirebaseMessagingSenderId,
  appId: FirebaseAppId,
  measurementId: FirebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);

export { auth, db };
