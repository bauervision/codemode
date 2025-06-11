"use client";
export default function Footer({ projectName }: { projectName: string }) {
  return (
    <footer className="w-full px-8 py-6 bg-zinc-950/90 border-t border-cyan-800 text-center text-cyan-200 text-sm">
      © {new Date().getFullYear()} {projectName}. Powered by BauerVision CodeMode.
    </footer>
  );
}
