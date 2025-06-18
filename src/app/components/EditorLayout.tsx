/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import FileTabs from "./FileTabs";
import CodeViewer from "./CodeViewer";
import LivePreview from "./LivePreview";
import { DownloadIcon } from "lucide-react";

import { ProjectFileTree } from "./ProjectFileTree";

import { ResponsiveMobilePreview } from "./ResponsiveMobilePreview";
import { Package, FilePlus } from "lucide-react";
import { ColorRoles } from "../types";
import { ThemeSidebarModule } from "./ThemeSidebarModule";
import { generateRandomPalette } from "../utils/color";
import { useTheme } from "../context/ThemeContext";
import { exportProjectZip } from "../utils/exportZip";

interface EditorLayoutProps {
  files: Record<string, { display: string; preview?: string }>;
  projectName: string;
  onNewProject: () => void;
}

// Main layout
export default function EditorLayout({
  files,
  projectName,
  onNewProject,
}: EditorLayoutProps) {
  const {
    colors,
    setColors,
    locks,
    setLocks,
    finalized,
    setFinalized,
    randomizeColors,
  } = useTheme();

  const [fileContents, setFileContents] = useState(files);

  const [currentFile, setCurrentFile] = useState(
    Object.keys(files).find((f) => f.endsWith("page.tsx")) ||
      Object.keys(files)[0]
  );

  const [learningMode, setLearningMode] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [mobileView, setMobileView] = useState(false);
  const [device, setDevice] = useState<"iphone" | "pixel" | "galaxy">("iphone");
  const deviceSizes = {
    iphone: { w: 390, h: 844, label: "iPhone 14 Pro" },
    pixel: { w: 393, h: 851, label: "Pixel 7" },
    galaxy: { w: 360, h: 800, label: "Galaxy S20" },
  };

  // To open package.json instructions:
  const handlePackageJsonClick = () => setCurrentFile("package.json.virtual");

  // For preview routing
  const [previewRoute, setPreviewRoute] = useState("/");

  const ROUTES = [
    { key: "/", label: "Home" },
    { key: "/about", label: "About" },
    { key: "/contact", label: "Contact" },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header Row */}
      <div className="flex flex-row items-center w-full py-2 px-6 mb-2">
        {/* Brand (left) */}
        <div className="flex flex-col items-start">
          <span className="font-extrabold text-3xl text-cyan-500 tracking-tight">
            CodeMode
          </span>
          <span className="text-zinc-300 font-medium text-sm">
            Project scaffolding tool by BauerVision
          </span>
        </div>
        {/* New Project button */}
        <button
          className="px-4 py-2 rounded text-sm font-bold bg-zinc-800 text-cyan-300 hover:bg-cyan-800 ml-8 border border-cyan-900"
          onClick={onNewProject}
          title="Start a new project"
        >
          <FilePlus className="w-5 h-5" />
        </button>

        <button
          onClick={() => exportProjectZip(fileContents, projectName)}
          className="px-4 py-2 rounded text-sm font-bold bg-zinc-800 text-cyan-300 hover:bg-cyan-800 ml-8 border border-cyan-900"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
        </button>
        {/* Instructions (center) */}
        <div className="flex-1 text-center text-zinc-400 text-sm font-medium px-8">
          Instantly scaffold a new project, preview code for each file, then
          copy and paste each file into your own project folder in VSCode.
        </div>
        {/* Modes (right) */}
        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 rounded text-sm font-bold ${
              learningMode
                ? "bg-cyan-600 text-white"
                : "bg-zinc-800 text-cyan-300"
            }`}
            onClick={() => setLearningMode((l) => !l)}
          >
            {learningMode ? "Learning Mode: ON" : "Learning Mode: OFF"}
          </button>
          <button
            className={`px-4 py-2 rounded text-sm font-bold border ${
              mobileView
                ? "bg-cyan-600 text-white border-cyan-500"
                : "bg-zinc-800 text-cyan-300 border-zinc-800"
            }`}
            onClick={() => setMobileView((m) => !m)}
          >
            {mobileView ? "Mobile: ON" : "View Mobile"}
          </button>
        </div>
      </div>

      {/* Toolbar/Header (FileTabs and buttons) */}
      <div className="flex items-center gap-4 bg-zinc-950 border-b justify-between border-zinc-800 px-6 py-3">
        <FileTabs
          files={files}
          currentFile={currentFile}
          onSelect={setCurrentFile}
        />
        {mobileView && (
          <div className="flex items-center gap-3 ml-2 w-full max-w-xl">
            {/* Instructional text */}
            <span className="text-xs text-cyan-400 font-medium">
              Mobile navigation:
            </span>
            {/* Page Tabs */}
            <div className="flex gap-1 bg-zinc-900 dark:bg-zinc-800 p-1 rounded-xl shadow">
              {ROUTES.map((route) => (
                <button
                  key={route.key}
                  onClick={() => setPreviewRoute(route.key)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                    previewRoute === route.key
                      ? "bg-cyan-600 text-white shadow"
                      : "bg-zinc-800 text-cyan-200 hover:bg-cyan-700 hover:text-white"
                  }`}
                >
                  {route.label}
                </button>
              ))}
            </div>
            {/* Device size buttons */}
            <div className="flex gap-1 ml-3">
              {Object.entries(deviceSizes).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setDevice(k as any)}
                  className={`px-3 py-1 rounded text-xs font-bold border ${
                    device === k
                      ? "bg-cyan-500 text-white border-cyan-400"
                      : "bg-zinc-800 text-cyan-300 border-zinc-800"
                  }`}
                  title={v.label}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main editor area: FileTree | Code | Preview */}
      <div className="flex flex-1 min-h-0 bg-zinc-900 w-full">
        {/* Sidebar: File Tree */}
        <aside className="flex flex-col h-full min-w-[220px] max-w-[280px] border-r border-zinc-800 bg-zinc-950 px-0 py-4">
          <div className="flex-1 overflow-y-auto pr-1">
            <ProjectFileTree
              files={fileContents}
              currentFile={currentFile}
              onFileSelect={(filePath) => setCurrentFile(filePath)}
              showPackageJsonSpecial={true}
              onPackageJsonClick={handlePackageJsonClick}
            />{" "}
          </div>
          {/* Theme Color Picker (fixed) */}
          <div className="shrink-0 border-t border-zinc-800 p-2">
            <ThemeSidebarModule
              colors={colors}
              locks={locks}
              setColors={setColors}
              setLocks={setLocks}
              finalized={finalized}
              setFinalized={setFinalized}
            />
          </div>
        </aside>

        {/* Code Editor (center) */}
        <section className="flex-shrink-0 w-[50%] min-w-[400px] max-w-[900px] border-r border-zinc-800 min-h-0 overflow-hidden">
          {currentFile === "package.json.virtual" ? (
            // Special package.json instructions panel
            <div className="max-w-lg mx-auto bg-zinc-900/90 rounded-2xl shadow-xl p-8 mt-12 text-center">
              <div className="flex flex-col items-center mb-4">
                <Package size={32} className="text-yellow-400 mb-2" />
                <span className="font-bold text-lg text-cyan-300">
                  Add dependencies
                </span>
              </div>
              <div className="text-zinc-100 mb-2 text-sm">
                Add these dependencies to your{" "}
                <code className="font-mono text-cyan-200">package.json</code>{" "}
                (or run the install command):
              </div>
              <div className="flex flex-col items-center gap-2 mb-4">
                <pre className="bg-zinc-800 px-4 py-2 rounded-lg text-left text-cyan-200 font-mono text-sm select-all">
                  {`"lucide-react": "^0.273.0"`}
                </pre>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`npm install lucide-react`)
                  }
                  className="px-4 py-2 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition"
                >
                  Copy install command
                </button>
                <span className="text-zinc-400 text-xs">
                  Run in your project folder:
                </span>
                <pre className="bg-zinc-800 px-3 py-1 rounded text-xs font-mono text-cyan-300 select-all">
                  npm install lucide-react
                </pre>
              </div>
              <div className="text-zinc-400 text-xs">
                <strong>Tip:</strong> Don’t overwrite your existing{" "}
                <code>package.json</code>—just add new dependencies!
              </div>
            </div>
          ) : (
            <CodeViewer
              filename={currentFile}
              code={fileContents[currentFile].display}
              learningMode={learningMode}
              finalized={finalized}
            />
          )}
        </section>

        {/* Live Preview (right) */}
        <section className="flex-1 min-w-[400px] min-h-0 overflow-auto bg-zinc-950 ">
          {mobileView ? (
            <ResponsiveMobilePreview
              device={device}
              deviceSizes={deviceSizes}
              previewRoute={previewRoute}
              setPreviewRoute={setPreviewRoute}
              projectName={projectName}
              previewLoading={previewLoading}
              mobileView={mobileView}
              fileContents={fileContents}
              colors={colors}
            />
          ) : (
            <LivePreview
              isMobilePreview={mobileView}
              route={previewRoute}
              onRouteChange={setPreviewRoute}
              projectName={projectName}
              loading={previewLoading}
              fileContents={fileContents}
              colors={colors}
            />
          )}
        </section>
      </div>
      {/* <AiPromptBar onPrompt={handlePrompt} loading={previewLoading} /> */}
    </div>
  );
}
