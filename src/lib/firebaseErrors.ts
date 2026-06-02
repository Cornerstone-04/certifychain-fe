import { FirebaseError } from "firebase/app";

const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use":
    "An account already exists for this email address.",
  "auth/invalid-credential": "Incorrect email or password. Please try again.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/network-request-failed":
    "Unable to reach the sign-in service. Check your connection and try again.",
  "auth/operation-not-allowed":
    "This sign-in method is not available. Please contact support.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment before trying again.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/user-not-found": "Incorrect email or password. Please try again.",
  "auth/weak-password": "Please choose a stronger password.",
  "auth/wrong-password": "Incorrect email or password. Please try again.",
  "permission-denied":
    "Your account profile could not be saved. Please contact support.",
};

export function getFirebaseErrorMessage(
  error: unknown,
  fallbackMessage: string,
) {
  if (!(error instanceof FirebaseError)) {
    return fallbackMessage;
  }

  return firebaseErrorMessages[error.code] ?? fallbackMessage;
}
