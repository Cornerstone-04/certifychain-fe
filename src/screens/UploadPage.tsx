import UploadForm from "@/components/upload/upload-form";
import UploadResult from "@/components/upload/upload-result";
import { useCertificateUpload } from "@/hooks/useCertificateUpload";
import { useState, useEffect } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { LayoutPage } from "@/layouts/layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UploadPage() {
  const { handleUpload, isUploading, cid, isUploadingMetadata } =
    useCertificateUpload();
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (cid) setShowDialog(true);
  }, [cid]);

  return (
    <LayoutPage className="flex flex-col md:flex-row gap-4">
      <div
        className={`w-full max-w-2xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Upload Certificate
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Securely upload and store your certificate on the blockchain
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <UploadForm
              onSubmit={handleUpload}
              isLoading={isUploading || isUploadingMetadata}
            />
          </div>

          {isUploading && (
            <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="flex-1">
                  <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                    Uploading to Blockchain...
                  </p>
                </div>
              </div>

              <div className="mt-3 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden p-0">
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
            {/* Header */}
            <DialogHeader className="px-4 sm:px-6 py-4 border-b border-green-200/30 dark:border-green-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-base sm:text-lg font-bold text-green-800 dark:text-green-200">
                    Upload Successful!
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-green-200/30 dark:border-green-700/30">
                <UploadResult cid={cid!} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </LayoutPage>
  );
}
