import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";

interface RegisterData {
  email: string;
  password: string;
  universityName: string;
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

      try {
        await updateProfile(user, {
          displayName: universityName,
        });

        // Admin access must be granted through a trusted server-side process.
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          universityName: universityName,
          role: "client",
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        try {
          await deleteUser(user);
        } catch (cleanupError) {
          console.error("Failed to clean up incomplete account:", cleanupError);
        }
        throw error;
      }

      return user;
    },
    onSuccess: (user) => {
      toast.success(
        `Welcome, ${user.displayName || "User"}! Registration successful.`
      );
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast.error(
        getFirebaseErrorMessage(
          error,
          "Unable to create your account. Please try again."
        )
      );
    },
  });
};
