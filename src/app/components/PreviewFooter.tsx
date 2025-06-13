"use client";

import { ColorRoles } from "../types";

export default function Footer({
  colors,
  projectName,
}: {
  projectName: string;
  colors: ColorRoles;
}) {
  return (
    <footer
      className="w-full px-8 py-6  text-center text-sm"
      style={{
        background: colors.surface,
        color: colors.text,
        borderColor: colors.accent,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      © {new Date().getFullYear()} {projectName}. Powered by BauerVision
      CodeMode.
    </footer>
  );
}
