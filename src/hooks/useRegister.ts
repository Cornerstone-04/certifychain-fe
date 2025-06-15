// src/hooks/useRegister.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/lib/firebase"; // Import db for Firestore
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore"; // Import setDoc for Firestore

interface RegisterData {
  email: string;
  password: string;
  universityName: string; // Changed from firstName, lastName
}

export const useRegister = (): UseMutationResult<
  User,
  FirebaseError,
  RegisterData,
  unknown
> => {
  return useMutation<User, FirebaseError, RegisterData>({
    mutationFn: async ({ email, password, universityName }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase Auth profile (displayName)
      await updateProfile(user, {
        displayName: universityName, // Use university name as display name
      });

      // Store additional user data (including role) in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        universityName: universityName,
        role: "admin", // Assign 'admin' role upon registration
        createdAt: new Date().toISOString(),
      });

      return user;
    },
    onSuccess: (user) => {
      toast.success(
        `Welcome, ${user.displayName || "Admin"}! Registration successful.`
      );
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed.");
    },
  });
};
