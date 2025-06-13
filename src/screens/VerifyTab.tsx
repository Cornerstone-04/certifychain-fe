import { useVerifyCertificate } from "@/hooks/useVerifyCertificate";
import VerifyForm from "@/components/verify/verify-form";
import VerifiedResult from "@/components/verify/verified-result";
import { toast } from "sonner";
import { useCertificateStore } from "@/store/certificateStore";
import { useState, useEffect } from "react";
import { CheckCircle, Search } from "lucide-react";

export default function VerifyTab() {
  const { mutate, data, isPending } = useVerifyCertificate();
  const { addVerification } = useCertificateStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (data?.file) {
      setHasResult(true);
    }
  }, [data]);

  const handleSubmit = (cid: string) => {
    mutate(cid, {
      onSuccess: (data) => {
        if (data?.isSuccess) {
          toast.success("Verification successful");
          addVerification({
            name: "Verified Certificate",
            cid,
            timestamp: new Date().toISOString(),
          });
        } else {
          toast.error(data?.message || "Verification failed");
        }
      },
      onError: () => toast.error("Request failed"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Form Container */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
              <Search className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Certificate Verification
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enter the CID to verify certificate authenticity
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Enhanced Form */}
          <div className="space-y-6">
            <VerifyForm onSubmit={handleSubmit} isPending={isPending} />
          </div>

          {/* Loading State */}
          {isPending && (
            <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                    Verifying Certificate...
                  </p>
                  <p className="text-blue-600 dark:text-blue-300 text-xs">
                    Checking blockchain records
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {data?.file && (
        <div
          className={`transition-all duration-700 delay-300 ${
            hasResult
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-95"
          }`}
        >
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-sm border border-green-200/50 dark:border-green-800/30 rounded-2xl p-6 shadow-lg">
            {/* Success Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-200">
                  Verification Successful
                </h3>
                <p className="text-green-600 dark:text-green-300 text-sm">
                  Certificate is authentic and verified
                </p>
              </div>
            </div>

            {/* Enhanced Result Display */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
              <VerifiedResult file={JSON.stringify(data.file, null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
