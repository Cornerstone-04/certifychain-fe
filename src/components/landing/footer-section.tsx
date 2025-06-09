interface FooterProps {
  isVisible: boolean;
}

export default function Footer({ isVisible }: FooterProps) {
  return (
    <footer
      className={`relative text-center py-8 text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-800 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm">
          &copy; 2025 CertifyChain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
