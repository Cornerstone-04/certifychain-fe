import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      toast.success("Signed out successfully.");
      navigate("/");
    },
    onError: (err: FirebaseError) => {
      console.error("Logout failed:", err);
      toast.error(
        getFirebaseErrorMessage(
          err,
          "Unable to sign out. Please try again."
        )
      );
    },
  });
};
