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
          className="border-red-500 text-red-700 hover:border-red-700 hover:bg-red-700 hover:text-white dark:text-red-400"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-400 bg-white sm:max-w-md dark:border-zinc-700 dark:bg-[#111111]">
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-[-0.03em] text-red-700 dark:text-red-400">
            Confirm Logout
          </DialogTitle>
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
