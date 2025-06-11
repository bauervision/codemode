"use client";
import { useState } from "react";
import ProjectWizard from "./components/ProjectWizard";
import EditorLayout from "./components/EditorLayout";
import LoadingOverlay from "./components/LoadingOverlay";

export default function Home() {
  const [wizardOpen, setWizardOpen] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [projectFiles, setProjectFiles] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("codemode-demo");

  const handleProjectLaunch = (name: string) => {
    setProjectName(name);
    setWizardOpen(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setEditorReady(true);
      setProjectFiles([
        "layout.tsx",
        "Navbar.tsx",
        "Footer.tsx",
        "page.tsx",
        "About.tsx",
        "Contact.tsx",
        "LoginButton.tsx",
        "package.json",
        ".gitignore",
        ".vscode/settings.json",
      ]);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-zinc-900">
      {(wizardOpen || showLoading) && (
        <div className="fixed inset-0 z-30 backdrop-blur-sm" />
      )}
      {wizardOpen && <ProjectWizard onLaunch={handleProjectLaunch} />}
      {showLoading && <LoadingOverlay />}
      {editorReady && (
        <EditorLayout files={projectFiles} projectName={projectName} />
      )}
    </div>
  );
}
