/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder, FileText } from "lucide-react";

export function ProjectFileTree({ files }: { files: Record<string, string> }) {
  // Convert file paths to a nested tree structure
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

  function renderTree(node: any, path = "", level = 0) {
    return Object.entries(node).map(([name, child]) => {
      const isFile = child === null;
      return (
        <div key={path + name} style={{ paddingLeft: level * 16 }}>
          {isFile ? (
            <span className="inline-flex items-center gap-2">
              <FileText size={16} className="inline-block text-cyan-400" />
              {name}
            </span>
          ) : (
            <div>
              <span className="inline-flex items-center gap-2 font-bold text-cyan-600">
                <Folder size={16} className="inline-block text-cyan-400" />
                {name}
              </span>
              <div>{renderTree(child, path + name + "/", level + 1)}</div>
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
      {renderTree(tree)}
    </aside>
  );
}
