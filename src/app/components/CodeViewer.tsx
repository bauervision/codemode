type Props = {
  filename: string;
  code: string;
  learningMode: boolean;
};

const comments: Record<string, Record<number, string>> = {
  "layout.tsx": {
    0: "// RootLayout: provides base HTML structure for your app",
    3: "// <html lang=\"en\">: sets language",
    4: "// <body>{children}</body>: renders your pages inside body"
  },
  "page.tsx": {
    0: "// Home: main app page",
    1: "// Renders a greeting"
  },
  "package.json": {
    0: "// Project manifest: lists name, version, dependencies"
  },
  ".gitignore": {
    0: "// Ignore node_modules, build, and environment files"
  },
  ".vscode/settings.json": {
    0: "// VS Code editor settings for this project"
  }
};

export default function CodeViewer({ filename, code, learningMode }: Props) {
  return (
    <div className="rounded-lg bg-zinc-950 p-4 shadow-lg font-mono text-sm whitespace-pre overflow-x-auto">
      {learningMode ? (
        code.split("\n").map((line, i) => (
          <div key={i} className="flex">
            <span className="flex-1">{line}</span>
            {comments[filename]?.[i] && (
              <span className="ml-4 text-cyan-300 select-none">{comments[filename][i]}</span>
            )}
          </div>
        ))
      ) : (
        code
      )}
    </div>
  );
}
