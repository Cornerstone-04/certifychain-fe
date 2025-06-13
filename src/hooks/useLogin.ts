import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/hooks/lib/firebase";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

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
      return userCredential.user;
    },
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.displayName || "Admin"}!`);
    },
    onError: (error: FirebaseError) => {
      toast.error(error.message || "Login failed.");
    },
  });
};
