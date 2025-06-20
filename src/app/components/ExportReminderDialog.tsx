"use client";
import { useEffect, useState } from "react";

export default function ExportReminderDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const command =
    "npm install lucide-react framer-motion chroma-js --save-dev @types/chroma-js";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 rounded-xl max-w-md w-full shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-cyan-600">Before You Go</h2>
        <p className="mb-4">
          Run this command in your exported project folder:
        </p>

        <div className="relative group">
          <pre className="bg-zinc-800 text-white text-sm p-3 rounded font-mono select-all overflow-x-auto">
            {command}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-1 right-1 px-2 py-1 text-xs rounded bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
