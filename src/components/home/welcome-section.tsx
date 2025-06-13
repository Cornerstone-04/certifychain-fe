import { User } from "lucide-react";

export const WelcomeSection = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`text-center mb-12 transition-all duration-1000 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Welcome to your Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Manage your certificates with blockchain-powered security and
        verification
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
    </div>
  );
};
