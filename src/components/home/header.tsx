import { Shield } from "lucide-react";
import { ModeToggle } from "../shared/mode-toggle";
import { LogoutButton } from "../shared/logout-button";

export const Header = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <header
      className={`relative w-full px-4 py-6 flex items-center justify-between max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center space-x-2 group">
        <div className="relative">
          <Shield className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md animate-ping"></div>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          CertifyChain
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <LogoutButton />
      </div>
    </header>
  );
};
