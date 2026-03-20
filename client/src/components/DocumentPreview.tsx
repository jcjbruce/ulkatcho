import { useState, useEffect, useCallback } from "react";
import { X, Download, FileText, Eye } from "lucide-react";

interface DocumentPreviewProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

function getFileType(url: string): "pdf" | "image" | "docx" | "other" {
  const lower = url.toLowerCase();
  if (lower.includes(".pdf")) return "pdf";
  if (lower.includes(".png") || lower.includes(".jpg") || lower.includes(".jpeg") || lower.includes(".webp")) return "image";
  if (lower.includes(".docx") || lower.includes(".doc")) return "docx";
  return "other";
}

export default function DocumentPreview({ url, title, isOpen, onClose }: DocumentPreviewProps) {
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [viewerType, setViewerType] = useState<"google" | "office">("google");
  const fileType = getFileType(url);

  // Reset state when URL changes
  useEffect(() => {
    setLoading(true);
    setIframeError(false);
    setViewerType("google");
  }, [url]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Auto-timeout: if loading takes too long (Google Docs Viewer sometimes fails silently),
  // try Office Online viewer as fallback
  useEffect(() => {
    if (!isOpen || !loading || iframeError) return;
    if (fileType !== "pdf" && fileType !== "docx") return;

    const timer = setTimeout(() => {
      if (loading && viewerType === "google") {
        // Google Docs Viewer timed out, try Office Online
        setViewerType("office");
        setLoading(true);
      }
    }, 12000); // 12 second timeout

    return () => clearTimeout(timer);
  }, [isOpen, loading, iframeError, fileType, viewerType]);

  // Download via fetch + blob to avoid CDN content-disposition issues
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      // Extract a clean filename
      const ext = fileType === "pdf" ? ".pdf" : fileType === "docx" ? ".docx" : fileType === "image" ? ".png" : "";
      a.download = title.endsWith(ext) ? title : `${title}${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  }, [url, title, fileType]);

  if (!isOpen) return null;

  // Google Docs Viewer URL (works for PDF and DOCX)
  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  // Office Online Viewer URL (works for DOCX, XLSX, PPTX, and PDF)
  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;

  // Determine which viewer URL to use
  const getViewerUrl = () => {
    if (viewerType === "office") return officeViewerUrl;
    return googleDocsViewerUrl;
  };

  const canPreview = fileType === "pdf" || fileType === "docx";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-[95vw] max-w-5xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-[#f0f4f8]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded bg-[#1a2e5a] flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[#1a2e5a] font-semibold text-sm md:text-base truncate">
                {title}
              </h3>
              {fileType === "docx" && (
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Word Document Preview
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2e5a] text-white text-sm rounded hover:bg-[#2a4070] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-gray-100 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-[#1a2e5a] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Loading preview...</p>
                {viewerType === "office" && (
                  <p className="text-xs text-gray-400">Trying alternate viewer...</p>
                )}
              </div>
            </div>
          )}

          {canPreview && !iframeError && (
            <iframe
              key={`${url}-${viewerType}`}
              src={getViewerUrl()}
              className="w-full h-full border-0"
              title={title}
              onLoad={() => setLoading(false)}
              onError={() => {
                if (viewerType === "google") {
                  // Try Office Online as fallback
                  setViewerType("office");
                  setLoading(true);
                } else {
                  setIframeError(true);
                  setLoading(false);
                }
              }}
            />
          )}

          {canPreview && iframeError && (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-xl bg-[#1a2e5a]/10 flex items-center justify-center mb-5">
                <FileText className="w-10 h-10 text-[#1a2e5a]" />
              </div>
              <h4 className="text-lg font-semibold text-[#1a2e5a] mb-2">{title}</h4>
              <p className="text-gray-500 text-sm mb-6 max-w-md">
                Preview could not be loaded. Please download the file to view its contents.
              </p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-[#1a2e5a] text-white rounded-lg hover:bg-[#2a4070] transition-colors font-medium cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Document
              </button>
            </div>
          )}

          {fileType === "image" && (
            <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
              <img
                src={url}
                alt={title}
                className="max-w-full max-h-full object-contain rounded shadow-lg"
                onLoad={() => setLoading(false)}
              />
            </div>
          )}

          {fileType === "other" && (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              {(() => { setTimeout(() => setLoading(false), 100); return null; })()}
              <div className="w-20 h-20 rounded-xl bg-[#1a2e5a]/10 flex items-center justify-center mb-5">
                <FileText className="w-10 h-10 text-[#1a2e5a]" />
              </div>
              <h4 className="text-lg font-semibold text-[#1a2e5a] mb-2">{title}</h4>
              <p className="text-gray-500 text-sm mb-6 max-w-md">
                This file type cannot be previewed. Please download to view.
              </p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-[#1a2e5a] text-white rounded-lg hover:bg-[#2a4070] transition-colors font-medium cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook for managing preview state
export function useDocumentPreview() {
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);

  const openPreview = useCallback((url: string, title: string) => {
    setPreview({ url, title });
  }, []);

  const closePreview = useCallback(() => {
    setPreview(null);
  }, []);

  return { preview, openPreview, closePreview };
}
