"use client";
import React from "react";

import { useState } from "react";
import Footer from "./PreviewFooter";
import PreviewNavbar from "./PreviewNavbar";
import { DemoPageRenderer } from "./DemoPageRenderer";
import LoginButton from "./PreviewLoginButton";

export default function LivePreview({
  isMobilePreview,
  projectName,
  loading,
  route,
  onRouteChange,
  fileContents,
}: {
  isMobilePreview: boolean;
  projectName: string;
  loading?: boolean;
  route: string;
  onRouteChange: (route: string) => void;
  fileContents: Record<string, { display: string; preview?: string }>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px]">
        {/* ...spinner code as before... */}
      </div>
    );
  }

  // Route to file map:
  const routeToFile: Record<string, string> = {
    "/": "app/page.tsx",
    "/about": "app/about.tsx",
    "/contact": "app/contact.tsx",
  };
  const fileKey = routeToFile[route] || "app/page.tsx";
  const code =
    fileContents[fileKey]?.preview || "<div>No preview available</div>";

  // Any demo/mock components referenced in preview code need to be passed here:
  const scope = {
    React,
    LoginButton,
    // Add more as needed!
    projectName, // if your preview code uses this
  };

  return (
    <div
      className={`relative min-h-[400px] flex flex-col w-full h-full bg-zinc-950 border-zinc-900 rounded-2xl shadow-xl transition-all duration-500`}
    >
      {/* Mobile overlay/drawer */}
      {isMobilePreview && menuOpen && (
        <>{/* ...mobile menu code as before... */}</>
      )}

      {/* Navbar */}
      <PreviewNavbar
        projectName={projectName}
        mobile={isMobilePreview}
        onNavigate={onRouteChange}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <main className="w-full min-h-[100vh]  flex flex-col">
        <DemoPageRenderer code={code} scope={scope} />
      </main>
      <Footer projectName={projectName} />
    </div>
  );
}
