import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  LogIn,
  Menu,
  Search,
  Shield,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuthStatus } from "@/hooks/useAuth";
import { useWeb3 } from "@/hooks/useWeb3";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/logout-button";
import { ModeToggle } from "@/components/shared/mode-toggle";

type NavItem = {
  label: string;
  to: string;
  icon: typeof Search;
};

const navItemClass =
  "flex items-center gap-2 border border-transparent px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-700 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading, role } = useAuthStatus();
  const { account, connectWallet, disconnectWallet, isLoadingWeb3 } = useWeb3();
  const isAuthenticated = !loading && !!user;
  const isAdmin = isAuthenticated && role === "admin";
  const items: NavItem[] = [
    ...(isAdmin
      ? [{ label: "Upload", to: "/admin/upload", icon: Upload }]
      : []),
    { label: "Verify", to: "/verify", icon: Search },
  ];

  const closeMenu = () => setMenuOpen(false);
  const walletLabel = isLoadingWeb3
    ? "Connecting..."
    : account
      ? `${account.slice(0, 6)}...${account.slice(-4)}`
      : "Connect Wallet";

  const walletAction = () => {
    if (account) disconnectWallet();
    else connectWallet();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-white/95 dark:border-zinc-800 dark:bg-[#090909]/95">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={closeMenu}
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="border border-blue-600 p-1.5 dark:border-blue-400"
          >
            <Shield className="h-5 w-5 text-blue-700 dark:text-blue-400" />
          </motion.div>
          <div>
            <p className="text-base font-black uppercase tracking-[-0.04em] text-slate-950 dark:text-white">
              CertifyChain
            </p>
            <p className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:block dark:text-zinc-500">
              Credential integrity rail
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {items.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                navItemClass,
                location.pathname === to &&
                  "border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2 border-l border-slate-300 pl-3 dark:border-zinc-800">
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={walletAction}
              disabled={isLoadingWeb3}
              className="border-blue-500 font-mono text-[10px] uppercase tracking-[0.08em] text-blue-700 hover:bg-blue-600 hover:text-white dark:text-blue-400 p-4"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletLabel}
            </Button>
            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              <Link to="/admin/login">
                <Button
                  size="sm"
                  className="font-mono text-[10px] uppercase tracking-widest"
                >
                  Admin Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-slate-300 bg-white p-4 shadow-[0_12px_0_0_rgba(15,23,42,0.08)] md:hidden dark:border-zinc-800 dark:bg-[#0d0d0d]"
          >
            <p className="fintech-label mb-2">Navigate</p>
            <div className="grid gap-px border border-slate-300 bg-slate-300 dark:border-zinc-800 dark:bg-zinc-800">
              {items.map(({ label, to, icon: Icon }, index) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={to}
                    onClick={closeMenu}
                    className="flex items-center justify-between bg-white px-4 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:bg-[#111] dark:text-zinc-100"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                      {label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="fintech-label mb-2 mt-5">Session</p>
            <button
              type="button"
              onClick={() => {
                walletAction();
                closeMenu();
              }}
              disabled={isLoadingWeb3}
              className="flex w-full items-center justify-between border border-blue-500 bg-blue-50 px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-800 dark:bg-[#0b1220] dark:text-blue-300"
            >
              <span className="flex items-center gap-3">
                <Wallet className="h-4 w-4" />
                {walletLabel}
              </span>
              <span className="h-2 w-2 bg-blue-600" />
            </button>

            <div className="mt-3">
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <Link
                  to="/admin/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-1 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-zinc-300"
                >
                  <LogIn className="h-4 w-4" />
                  Institution login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
