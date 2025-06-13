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
          className="border-red-300/50 hover:border-red-400/50 hover:bg-red-50/50 dark:hover:bg-red-950/50 transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
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
          >
            {logout.isPending ? "Logging out..." : "Log out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
