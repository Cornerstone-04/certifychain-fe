import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { LogoutButton } from "@/components/shared/logout-button";
import {
  ArrowRight,
  Shield,
  Upload,
  Search,
  Menu,
  X,
  Wallet,
} from "lucide-react"; // Import Wallet icon
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeb3 } from "@/hooks/useWeb3";

interface AppHeaderProps {
  isAuthenticated: boolean;
  userRole: "admin" | "client" | null;
}

export const AppHeader = ({ isAuthenticated, userRole }: AppHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { account, connectWallet, disconnectWallet, isLoadingWeb3 } = useWeb3(); // Use web3 context

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="w-7 h-7 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute inset-0 w-7 h-7 bg-blue-400/30 rounded-full blur-sm group-hover:animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CertifyChain
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Secure • Verified • Trusted
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {userRole === "admin" && (
                  <>
                    <Link to="/admin/upload">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </Link>
                    <Link to="/verify">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/50 transition-all"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Verify
                      </Button>
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
                  <ModeToggle />
                  {account ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={disconnectWallet}
                      disabled={isLoadingWeb3}
                      className="group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                    >
                      {isLoadingWeb3
                        ? "Connecting..."
                        : `Connected: ${account.substring(0, 4)}...`}
                      <Wallet className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={connectWallet}
                      disabled={isLoadingWeb3}
                      className="group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                    >
                      {isLoadingWeb3 ? "Connecting..." : "Connect Wallet"}
                      <Wallet className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/verify">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-green-500/50 text-green-600 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300 hover:shadow-md"
                  >
                    <Search className="w-4 h-4 mr-2 group-hover:scale-110" />
                    Verify Certificate
                  </Button>
                </Link>
                {account ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                    disabled={isLoadingWeb3}
                    className="group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                  >
                    {isLoadingWeb3
                      ? "Connecting..."
                      : `Connected: ${account.substring(0, 4)}...`}
                    <Wallet className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={connectWallet}
                    disabled={isLoadingWeb3}
                    className="group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                  >
                    {isLoadingWeb3 ? "Connecting..." : "Connect Wallet"}
                    <Wallet className="w-4 h-4 ml-2" />
                  </Button>
                )}
                <Link to="/admin/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-blue-500/50 text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 hover:shadow-md"
                  >
                    Admin Login
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <ModeToggle />
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <div className="container px-4 py-4 space-y-3">
                {isAuthenticated ? (
                  <>
                    {userRole === "admin" && (
                      <>
                        <Link to="/admin/upload" onClick={toggleMobileMenu}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          >
                            <Upload className="w-4 h-4 mr-3" />
                            Upload Certificate
                          </Button>
                        </Link>
                        <Link to="/verify" onClick={toggleMobileMenu}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-green-600 hover:bg-green-50 dark:hover:bg-green-950/50"
                          >
                            <Search className="w-4 h-4 mr-3" />
                            Verify Certificate
                          </Button>
                        </Link>
                      </>
                    )}
                    {account ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          disconnectWallet();
                          toggleMobileMenu();
                        }}
                        disabled={isLoadingWeb3}
                        className="w-full justify-start group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                      >
                        {isLoadingWeb3
                          ? "Connecting..."
                          : `Connected: ${account.substring(0, 4)}...`}
                        <Wallet className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          connectWallet();
                          toggleMobileMenu();
                        }}
                        disabled={isLoadingWeb3}
                        className="w-full justify-start group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                      >
                        {isLoadingWeb3 ? "Connecting..." : "Connect Wallet"}
                        <Wallet className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    <div className="pt-3 border-t border-border">
                      <LogoutButton />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/verify" onClick={toggleMobileMenu}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-green-500/50 text-green-600 hover:bg-green-500 hover:text-white"
                      >
                        <Search className="w-4 h-4 mr-3" />
                        Verify Certificate
                      </Button>
                    </Link>
                    {account ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          disconnectWallet();
                          toggleMobileMenu();
                        }}
                        disabled={isLoadingWeb3}
                        className="w-full justify-start group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                      >
                        {isLoadingWeb3
                          ? "Connecting..."
                          : `Connected: ${account.substring(0, 4)}...`}
                        <Wallet className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          connectWallet();
                          toggleMobileMenu();
                        }}
                        disabled={isLoadingWeb3}
                        className="w-full justify-start group border-purple-500/50 text-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300 hover:shadow-md"
                      >
                        {isLoadingWeb3 ? "Connecting..." : "Connect Wallet"}
                        <Wallet className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    <Link to="/admin/login" onClick={toggleMobileMenu}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-blue-500/50 text-blue-600 hover:bg-blue-500 hover:text-white"
                      >
                        <ArrowRight className="w-4 h-4 mr-3" />
                        Admin Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
