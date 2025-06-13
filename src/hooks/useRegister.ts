import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/hooks/lib/firebase";
import { toast } from "sonner";

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useRegister = (): UseMutationResult<
  User,
  FirebaseError,
  RegisterData,
  unknown
> => {
  return useMutation<User, FirebaseError, RegisterData>({
    mutationFn: async ({ email, password, firstName, lastName }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      return user;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed.");
    },
  });
};
