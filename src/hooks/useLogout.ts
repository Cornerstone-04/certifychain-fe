// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@/hooks/lib/firebase";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

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
    onError: (error: FirebaseError) => {
      toast.error(error.message || "Sign out failed.");
    },
  });
};
