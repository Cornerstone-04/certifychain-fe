import { Info } from "lucide-react";

interface InfoBannerProps {
  isVisible: boolean;
}

export default function InfoBanner({ isVisible }: InfoBannerProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className={`transition-all duration-700 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="border border-amber-500 bg-amber-50 p-4 dark:bg-[#141108]">
          <div className="flex flex-col md:flex-row items-start space-x-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                Keep your CID safe!
              </p>
              <p className="text-amber-600 dark:text-amber-300">
                The Content Identifier (CID) is unique to your certificate and
                required for verification. Save it securely or share it with
                parties who need to verify your certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
