"use client";
import { Menu } from "lucide-react";
import { ColorRoles } from "../types";

type Route = "/" | "/about" | "/contact";

type PreviewNavbarProps = {
  projectName: string;
  onNavigate: (route: Route) => void;
  mobile?: boolean;
  onMenuOpen?: () => void;
  colors: ColorRoles;
};

export default function PreviewNavbar({
  projectName,
  onNavigate,
  mobile = false,
  onMenuOpen,
  colors,
}: PreviewNavbarProps) {
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3  relative z-20"
      style={{
        background: colors.secondary,
        color: colors.text,
        borderColor: colors.accent,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <span
        className="font-extrabold text-2xl  tracking-tight"
        style={{ color: colors.primary }}
      >
        {projectName}
      </span>

      {mobile ? (
        <button
          className="p-2 rounded-xl  transition"
          style={{
            background: colors.secondary,
            color: colors.text,
            borderColor: colors.accent,
            transition: "background 0.3s, color 0.3s",
          }}
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7 " style={{ color: colors.primary }} />
        </button>
      ) : (
        <div className="flex items-center gap-6">
          <NavLink colors={colors} onClick={() => onNavigate("/")}>
            Home
          </NavLink>
          <NavLink colors={colors} onClick={() => onNavigate("/about")}>
            About
          </NavLink>
          <NavLink colors={colors} onClick={() => onNavigate("/contact")}>
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  colors,
  onClick,
  children,
}: {
  colors: ColorRoles;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-base font-medium hover:underline px-2 py-1 rounded transition"
      style={{
        background: colors.secondary,
        color: colors.text,
        borderColor: colors.accent,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {children}
    </button>
  );
}
