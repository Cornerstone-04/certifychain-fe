import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginData) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      const role = userDocSnap.data()?.role === "admin" ? "admin" : "client";

      return { user, role };
    },
    onSuccess: ({ user }) => {
      toast.success(`Welcome back, ${user.displayName || "Admin"}!`);
    },
    onError: (error: FirebaseError) => {
      console.error("Login failed:", error);
      toast.error(
        getFirebaseErrorMessage(
          error,
          "Unable to sign in. Please check your details and try again."
        )
      );
    },
  });
};
