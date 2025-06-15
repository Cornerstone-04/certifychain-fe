import { Link } from "react-router"; // Use react-router-dom for navigation within components
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { LogoutButton } from "@/components/shared/logout-button";
import { ArrowRight, Shield, Upload, Search } from "lucide-react"; // Import necessary icons

interface AppHeaderProps {
  isAuthenticated: boolean;
  userRole: "admin" | "client" | null;
}

export const AppHeader = ({ isAuthenticated, userRole }: AppHeaderProps) => {
  return (
    <header className="relative w-full px-4 sm:px-10 py-6 flex items-center justify-between max-w-7xl mx-auto transition-all duration-1000">
      {/* Logo/Title */}
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="relative">
          <Shield className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md animate-ping"></div>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          CertifyChain
        </span>
      </Link>

      {/* Navigation and Actions */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        {isAuthenticated ? (
          // Authenticated User (Admin) Navigation
          <>
            {userRole === "admin" && (
              <>
                <Link to="/admin/upload">
                  <Button
                    variant="ghost"
                    className="hidden sm:flex items-center gap-1 text-blue-600 hover:bg-blue-500/20 dark:hover:bg-blue-800/20"
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button
                    variant="ghost"
                    className="hidden sm:flex items-center gap-1 text-green-600 hover:bg-green-500/20 dark:hover:bg-green-800/20"
                  >
                    <Search className="w-4 h-4" /> Verify
                  </Button>
                </Link>
              </>
            )}
            <LogoutButton />
          </>
        ) : (
          // Public/Unauthenticated User Navigation
          <>
            <Link to="/verify">
              <Button
                variant="outline"
                className="border-green-500/50 text-green-600 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
              >
                Verify
                <Search className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button
                variant="outline"
                className="border-blue-500/50 text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
              >
                Admin Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
