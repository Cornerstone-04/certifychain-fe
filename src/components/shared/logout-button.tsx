import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useLogout } from "@/hooks/useLogout";

export const LogoutButton = () => {
  const logoutMutation = useLogout();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => logoutMutation.mutate()}
          variant="outline"
          size="icon"
          className="border-red-300/50 hover:border-red-400/50 hover:bg-red-50/50 dark:hover:bg-red-950/50 transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="center"
        className="bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-md shadow-md px-3 py-1.5"
      >
        Log out
      </TooltipContent>
    </Tooltip>
  );
};
