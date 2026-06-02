interface FooterProps {
  isVisible: boolean;
}

export default function Footer({ isVisible }: FooterProps) {
  return (
    <footer
      className={`relative bg-white py-8 text-slate-500 dark:bg-[#090909] dark:text-zinc-500 transition-all duration-700 delay-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CertifyChain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
