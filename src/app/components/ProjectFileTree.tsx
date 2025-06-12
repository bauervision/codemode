/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder, FileText, Package } from "lucide-react";

export function ProjectFileTree({
  files,
  currentFile,
  onFileSelect,
  showPackageJsonSpecial,
  onPackageJsonClick,
}: {
  files: Record<string, { display: string; preview?: string }>;
  currentFile: string;
  onFileSelect: (filePath: string) => void;
  showPackageJsonSpecial?: boolean;
  onPackageJsonClick?: () => void;
}) {
  // Build nested tree from paths
  function buildTree(paths: string[]) {
    const root: any = {};
    for (const path of paths) {
      const parts = path.split("/");
      let node = root;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!node[part]) {
          node[part] = i === parts.length - 1 ? null : {};
        }
        node = node[part];
      }
    }
    return root;
  }

  // Render tree recursively
  function renderTree(node: any, path = "", level = 0) {
    return Object.entries(node).map(([name, child]) => {
      const isFile = child === null;
      const filePath = path + name;
      return (
        <div key={filePath} style={{ paddingLeft: level * 16 }}>
          {isFile ? (
            <button
              type="button"
              onClick={() => onFileSelect(filePath)}
              className={`
                group flex items-center gap-2 w-full text-left py-1 px-2 rounded
                cursor-pointer transition
                ${
                  filePath === currentFile
                    ? "bg-cyan-800 text-white font-semibold"
                    : "hover:bg-zinc-800 text-zinc-200"
                }
              `}
              tabIndex={0}
            >
              <FileText size={16} className="text-cyan-400 shrink-0" />
              <span className="truncate">{name}</span>
            </button>
          ) : (
            <div>
              <span className="inline-flex items-center gap-2 font-bold text-cyan-600 mb-1">
                <Folder size={16} className="text-cyan-400" />
                {name}
              </span>
              <div>{renderTree(child, filePath + "/", level + 1)}</div>
            </div>
          )}
        </div>
      );
    });
  }

  const tree = buildTree(Object.keys(files));

  return (
    <aside className="bg-zinc-900/90 p-4 rounded-2xl shadow-xl w-64 min-w-[192px] max-h-[80vh] overflow-auto">
      <div className="font-semibold mb-2 text-cyan-400">Project File Tree</div>
      {/* Virtual package.json entry */}
      {showPackageJsonSpecial && (
        <button
          type="button"
          onClick={onPackageJsonClick}
          className={`group flex items-center gap-2 w-full text-left py-1 px-2 rounded cursor-pointer transition
            ${
              currentFile === "package.json.virtual"
                ? "bg-cyan-800 text-white font-semibold"
                : "hover:bg-zinc-800 text-zinc-200"
            }`}
          tabIndex={0}
        >
          <Package size={16} className="text-yellow-400 shrink-0" />
          <span>
            package.json{" "}
            <span className="text-xs text-yellow-400">(dependencies)</span>
          </span>
        </button>
      )}
      {renderTree(tree)}
    </aside>
  );
}
