type Props = {
  filename: string;
  code: string;
  learningMode: boolean;
  finalized: boolean;
};

const comments: Record<string, Record<number, string>> = {
  "layout.tsx": {
    0: "// RootLayout: provides base HTML structure for your app",
    3: '// <html lang="en">: sets language',
    4: "// <body>{children}</body>: renders your pages inside body",
  },
  "page.tsx": {
    0: "// Home: main app page",
    1: "// Renders a greeting",
  },
  "package.json": {
    0: "// Project manifest: lists name, version, dependencies",
  },
  ".gitignore": {
    0: "// Ignore node_modules, build, and environment files",
  },
  ".vscode/settings.json": {
    0: "// VS Code editor settings for this project",
  },
};

export default function CodeViewer({
  filename,
  code,
  learningMode,
  finalized,
}: Props) {
  return (
    <div className="relative rounded-lg bg-zinc-950 p-4 shadow-lg font-mono text-sm whitespace-pre overflow-x-auto">
      {/* Draft badge overlay */}
      {!finalized && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-yellow-400/10 rounded-lg pointer-events-none">
          <span className="text-zinc-950 font-bold text-xl tracking-wider drop-shadow-lg animate-pulse">
            DRAFT THEME
          </span>
          <span className="text-zinc-900 font-medium text-xs mt-1">
            Finalize colors to inject them into your exported code
          </span>
        </div>
      )}

      {/* The actual code block, slightly dimmed if draft */}
      <div className={finalized ? "" : "opacity-40"}>
        {learningMode
          ? code.split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="flex-1">{line}</span>
                {comments[filename]?.[i] && (
                  <span className="ml-4 text-cyan-300 select-none">
                    {comments[filename][i]}
                  </span>
                )}
              </div>
            ))
          : code}
      </div>
    </div>
  );
}
