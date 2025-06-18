"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import chroma from "chroma-js";
import { ColorRoles } from "../types";
import LoginDialog from "./LoginDialog";

type Route = "/" | "/about" | "/contact";

type PreviewNavbarProps = {
  projectName: string;
  onNavigate: (route: Route) => void;
  mobile?: boolean;
  modalRoot: React.RefObject<HTMLDivElement | null>;
  colors: ColorRoles;
};

// Contrast-aware fallback
function getContrastAwareTextColor(
  backgroundColor: string,
  fallback: string
): string {
  try {
    return chroma.contrast(backgroundColor, "#ffffff") >= 4.5
      ? "#ffffff"
      : "#111827";
  } catch {
    return fallback;
  }
}

export default function PreviewNavbar({
  projectName,
  onNavigate,
  mobile = false,
  modalRoot,
  colors,
}: PreviewNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const textColor = getContrastAwareTextColor(colors.accent, colors.text);

  const handleRoute = (route: Route) => {
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 relative z-20"
      style={{
        background: colors.secondary,
        color: textColor,
        borderColor: colors.accent,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <button
        onClick={() => handleRoute("/")}
        className="font-extrabold text-2xl tracking-tight"
        style={{ color: textColor }}
      >
        {projectName}
      </button>

      {mobile ? (
        <button
          className="p-2 rounded-xl transition"
          style={{
            background: colors.secondary,
            color: textColor,
            borderColor: colors.accent,
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" style={{ color: colors.primary }} />
        </button>
      ) : (
        <div className=" flex items-center gap-6 ">
          <NavLink
            onClick={() => handleRoute("/about")}
            textColor={textColor}
            colors={colors}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => handleRoute("/contact")}
            textColor={textColor}
            colors={colors}
          >
            Contact
          </NavLink>
          <LoginDialog colors={colors} modalRoot={modalRoot} />
        </div>
      )}

      {mobile && menuOpen && (
        <div
          className="absolute right-0 top-full mt-2 rounded-lg shadow-lg p-4 flex flex-col gap-2 z-30"
          style={{
            background: colors.surface,
            color: textColor,
          }}
        >
          <NavLink
            onClick={() => handleRoute("/about")}
            textColor={textColor}
            colors={colors}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => handleRoute("/contact")}
            textColor={textColor}
            colors={colors}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  onClick,
  children,
  textColor,
  colors,
}: {
  onClick: () => void;
  children: React.ReactNode;
  textColor: string;
  colors: ColorRoles;
}) {
  return (
    <button
      onClick={onClick}
      className="text-base font-medium hover:underline px-2 py-1 rounded transition"
      style={{
        background: colors.secondary,
        color: textColor,
        borderColor: colors.accent,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {children}
    </button>
  );
}
