import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/useLogout";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export const LogoutButton = () => {
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout.mutate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group border-red-300/50 text-red-600 hover:border-red-500 hover:text-white hover:bg-gradient-to-tr from-red-500 to-rose-500 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 rounded-md backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-[-10deg] transition-transform" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/90 dark:bg-gray-900/80 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-red-700">Confirm Logout</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Are you sure you want to end your session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmLogout}
            disabled={logout.isPending}
            className="transition-all !bg-red-700"
          >
            {logout.isPending ? "Logging out..." : "Log out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
