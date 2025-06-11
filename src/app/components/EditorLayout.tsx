/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import FileTabs from "./FileTabs";
import CodeViewer from "./CodeViewer";
import LivePreview from "./LivePreview";
import AiPromptBar from "./AiPromptBar";
import { ProjectFileTree } from "./ProjectFileTree";
import { getInitialFiles } from "../constants";
import { ResponsiveMobilePreview } from "./ResponsiveMobilePreview";

// Main layout
export default function EditorLayout({ projectName }: { projectName: string }) {
  // Use full paths as keys!
  const [fileContents, setFileContents] = useState(
    getInitialFiles(projectName)
  );
  const files = Object.keys(fileContents);
  const [currentFile, setCurrentFile] = useState(
    files.find((f) => f.endsWith("page.tsx")) || files[0]
  );
  const [learningMode, setLearningMode] = useState(false);
  const [alignLoginLeft, setAlignLoginLeft] = useState(false);
  const [darkBackground, setDarkBackground] = useState(false);
  const [accentHeadline, setAccentHeadline] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [mobileView, setMobileView] = useState(false);
  const [device, setDevice] = useState<"iphone" | "pixel" | "galaxy">("iphone");
  const deviceSizes = {
    iphone: { w: 390, h: 844, label: "iPhone 14 Pro" },
    pixel: { w: 393, h: 851, label: "Pixel 7" },
    galaxy: { w: 360, h: 800, label: "Galaxy S20" },
  };

  // For preview routing
  const [previewRoute, setPreviewRoute] = useState("/");

  // Handle prompt bar (update fileContents as needed)
  const handlePrompt = (prompt: string) => {
    setPreviewLoading(true);
    setTimeout(() => {
      const updated = { ...fileContents };
      if (prompt.toLowerCase().includes("move the login button to the left")) {
        setAlignLoginLeft(true);
        // Safely update page.tsx with full path
        if (updated["app/page.tsx"]) {
          updated["app/page.tsx"] = updated["app/page.tsx"].replace(
            /mt-12"(.|\s)*?<PreviewLoginButton \/>/,
            'mt-12 flex flex-col items-start"{children}<PreviewLoginButton />'
          );
        }
      }
      if (prompt.toLowerCase().includes("darken the background")) {
        setDarkBackground(true);
        if (updated["app/layout.tsx"]) {
          updated["app/layout.tsx"] = updated["app/layout.tsx"].replace(
            /bg-gradient-to-br[^`]*/,
            "bg-zinc-950"
          );
        }
      }
      if (prompt.toLowerCase().includes("accent color for the text")) {
        setAccentHeadline(true);
        if (updated["app/page.tsx"]) {
          updated["app/page.tsx"] = updated["app/page.tsx"].replace(
            /text-cyan-600/g,
            "text-cyan-400"
          );
        }
      }
      setFileContents(updated);
      setPreviewLoading(false);
    }, 1200);
  };

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
          fileContents={fileContents}
        />
        {mobileView && (
          <div className="flex gap-2 ml-2">
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
        )}
      </div>
      {/* Main editor area: FileTree | Code | Preview */}
      <div className="flex flex-1 min-h-0 bg-zinc-900">
        {/* Sidebar: File Tree */}
        <aside className="h-full border-r border-zinc-800 bg-zinc-950 px-0 py-4 min-w-[220px] max-w-[280px] overflow-y-auto">
          <ProjectFileTree files={fileContents} />
        </aside>
        {/* Code Editor (left half) */}
        <section className="w-1/2 border-r border-zinc-800 p-6 overflow-auto">
          <CodeViewer
            filename={currentFile}
            code={fileContents[currentFile]}
            learningMode={learningMode}
          />
        </section>
        {/* Live Preview (right half) */}
        <section className="w-1/2 flex flex-row items-start justify-center overflow-visible min-h-0 relative">
          {mobileView ? (
            <ResponsiveMobilePreview
              device={device}
              deviceSizes={deviceSizes}
              previewRoute={previewRoute}
              setPreviewRoute={setPreviewRoute}
              alignLoginLeft={alignLoginLeft}
              darkBackground={darkBackground}
              accentHeadline={accentHeadline}
              projectName={projectName}
              previewLoading={previewLoading}
              mobileView={mobileView}
            />
          ) : (
            <div className="w-full h-full">
              <LivePreview
                isMobilePreview={mobileView}
                route={previewRoute}
                onRouteChange={setPreviewRoute}
                alignLoginLeft={alignLoginLeft}
                darkBackground={darkBackground}
                accentHeadline={accentHeadline}
                projectName={projectName}
                loading={previewLoading}
              />
            </div>
          )}
        </section>
      </div>
      <AiPromptBar onPrompt={handlePrompt} loading={previewLoading} />
    </div>
  );
}
