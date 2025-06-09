import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ModeToggle } from "@/components/shared/mode-toggle";

export default function Header({ isVisible }: { isVisible: boolean }) {
  return (
    <header
      className={`relative w-full px-10 py-6 flex items-center justify-between transition-all duration-1000 ${
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
      <div className="flex gap-3">
        <ModeToggle />
        <Link to="/login">
          <Button
            variant="outline"
            className="border-blue-500/50 text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
          >
            Login
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
