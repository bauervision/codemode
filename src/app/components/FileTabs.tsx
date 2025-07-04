import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";

function getBasename(filePath: string) {
  return filePath.split("/").pop() || filePath;
}

interface FileTabsProps {
  files: Record<string, { display: string; preview?: string }>;
  currentFile: string;
  onSelect: (file: string) => void;
}

const FileTabs: React.FC<FileTabsProps> = ({
  files,
  currentFile,
  onSelect,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (currentFile && files[currentFile] !== undefined) {
      await navigator.clipboard.writeText(files[currentFile].display);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  if (!files || Object.keys(files).length === 0) {
    return <div className="text-zinc-400 text-center p-8">No files yet</div>;
  }

  return (
    <div className="flex items-end gap-2">
      {Object.keys(files).map((file) => (
        <div key={file} className="flex flex-col items-center">
          <button
            onClick={() => onSelect(file)}
            className={`px-3 py-2 rounded-t-lg font-mono border-b-2 text-xs transition-all
              ${
                file === currentFile
                  ? "bg-zinc-900 border-cyan-400 text-cyan-300"
                  : "bg-zinc-800 border-transparent text-zinc-400"
              }`}
          >
            {getBasename(file)}
          </button>
          {file === currentFile && (
            <button
              onClick={handleCopy}
              className="mt-1 flex items-center gap-2 px-3 py-1 rounded bg-cyan-600 text-white font-semibold shadow transition hover:bg-cyan-700 text-xs"
              title="Copy file code"
              style={{ minWidth: 80 }}
            >
              <ClipboardCopy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileTabs;
