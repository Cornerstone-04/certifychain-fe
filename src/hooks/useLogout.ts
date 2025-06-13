import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";

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
      toast.error(err.message || "Logout failed");
    },
  });
};
