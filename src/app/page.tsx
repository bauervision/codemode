"use client";
import { useState } from "react";
import ProjectWizard from "./components/ProjectWizard";
import EditorLayout from "./components/EditorLayout";
import LoadingOverlay from "./components/LoadingOverlay";
import { getInitialFiles } from "./constants";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { colors } = useTheme();
  const [wizardOpen, setWizardOpen] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [projectFiles, setProjectFiles] = useState<
    Record<string, { display: string; preview?: string }>
  >({});

  const [projectName, setProjectName] = useState("codemode-demo");

  const handleProjectLaunch = (name: string) => {
    setProjectName(name);
    setWizardOpen(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setEditorReady(true);
      setProjectFiles(getInitialFiles(name, colors));
    }, 1200);
  };

  // Add this handler
  const handleNewProject = () => {
    setEditorReady(false); // this returns you to the wizard
    setWizardOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-zinc-900">
      {(wizardOpen || showLoading) && (
        <div className="fixed inset-0 z-30 backdrop-blur-sm" />
      )}
      {wizardOpen && <ProjectWizard onLaunch={handleProjectLaunch} />}
      {showLoading && <LoadingOverlay />}
      {editorReady && (
        <EditorLayout
          files={projectFiles}
          projectName={projectName}
          onNewProject={handleNewProject} // Pass the handler
        />
      )}
    </div>
  );
}
