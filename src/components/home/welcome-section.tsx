export const WelcomeSection = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`text-center mb-12 transition-all duration-1000 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
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
