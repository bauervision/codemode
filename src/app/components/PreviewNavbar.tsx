"use client";
import { Menu } from "lucide-react";

type Route = "/" | "/about" | "/contact";

type PreviewNavbarProps = {
  projectName: string;
  onNavigate: (route: Route) => void;
  mobile?: boolean;
  onMenuOpen?: () => void; // New: handler from LivePreview!
};

export default function PreviewNavbar({
  projectName,
  onNavigate,
  mobile = false,
  onMenuOpen,
}: PreviewNavbarProps) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-cyan-50 dark:bg-zinc-900 border-b border-cyan-100/30 relative z-20">
      <span className="font-extrabold text-2xl text-cyan-600 dark:text-cyan-400 tracking-tight">
        {projectName}
      </span>

      {mobile ? (
        <button
          className="p-2 rounded-xl hover:bg-cyan-100 dark:hover:bg-zinc-800 transition"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7 text-cyan-600 dark:text-cyan-300" />
        </button>
      ) : (
        <div className="flex items-center gap-6">
          <NavLink onClick={() => onNavigate("/")}>Home</NavLink>
          <NavLink onClick={() => onNavigate("/about")}>About</NavLink>
          <NavLink onClick={() => onNavigate("/contact")}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition"
    >
      {children}
    </button>
  );
}
