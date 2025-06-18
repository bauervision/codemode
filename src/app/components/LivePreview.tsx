/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef, useState } from "react";
import Footer from "./PreviewFooter";
import PreviewNavbar from "./PreviewNavbar";
import { DemoPageRenderer } from "./DemoPageRenderer";
import { ColorRoles } from "../types";

export default function LivePreview({
  isMobilePreview,
  projectName,
  loading,
  route,
  onRouteChange,
  colors,
}: {
  isMobilePreview: boolean;
  projectName: string;
  loading?: boolean;
  route: string;
  onRouteChange: (route: string) => void;
  fileContents: Record<string, { display: string; preview?: string }>;
  colors: ColorRoles;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Map colors to CSS vars
  const cssVars = {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-background": colors.background,
    "--color-surface": colors.surface,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px]">
        {/* ...spinner code as before... */}
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[400px] flex flex-col w-full h-full bg-zinc-950 border-zinc-900 rounded-2xl shadow-xl transition-all duration-500`}
      ref={modalRef}
      style={cssVars as React.CSSProperties}
    >
      {/* Navbar */}
      <PreviewNavbar
        projectName={projectName}
        mobile={isMobilePreview}
        onNavigate={onRouteChange}
        colors={colors}
        modalRoot={modalRef}
      />
      <main className="w-full flex flex-col flex-1">
        <DemoPageRenderer
          route={route}
          projectName={projectName}
          colors={colors}
        />
      </main>
      <Footer projectName={projectName} colors={colors} />
    </div>
  );
}
