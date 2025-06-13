import type { ColorRoles } from "./types";

export function getInitialFiles(
  projectName: string,
  finalizedColors?: Partial<ColorRoles>
): Record<string, { display: string; preview?: string }> {
  function color(role: keyof ColorRoles, fallback: string) {
    return finalizedColors?.[role] || fallback;
  }

  return {
    ".vscode/settings.json": {
      display: `{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.eol": "\\n",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}`.trim(),
    },

    // --- NAVBAR ---
    "components/Navbar.tsx": {
      display: `
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

interface NavbarProps {
  projectName: string;
}

const Navbar: React.FC<NavbarProps> = ({ projectName }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 border-b relative z-20"
      style={{
        background: "${color("secondary", "#64748b")}",
        color: "${color("text", "#fff")}"
      }}
    >
      <span className="font-extrabold text-2xl tracking-tight">
        {projectName}
      </span>
      {isMobile ? (
        <button
          className="p-2 rounded-xl transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      ) : (
        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
      {menuOpen && isMobile && (
        <div className="absolute right-0 top-full mt-2 rounded-lg shadow-lg p-4 flex flex-col gap-2 z-30"
             style={{
               background: "${color("surface", "#fff")}",
               color: "${color("text", "#64748b")}"
             }}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
      `.trim(),
    },

    // --- FOOTER ---
    "components/Footer.tsx": {
      display: `
import React from "react";

interface FooterProps {
  projectName: string;
}

const Footer: React.FC<FooterProps> = ({ projectName }) => (
  <footer
    className="w-full text-center py-3 mt-auto text-xs border-t bg-transparent"
    style={{
      background: "${color("surface", "#fff")}",
      color: "${color("text", "#64748b")}"
    }}
  >
    &copy; {new Date().getFullYear()} {projectName} · Built with BauerVision CodeMode
  </footer>
);

export default Footer;
      `.trim(),
    },
    // --- HOOKS ---
    "app/hooks/useIsMobile.ts": {
      display: `
import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
      `.trim(),
    },

    // --- LAYOUT ---
    "app/layout.tsx": {
      display: `
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "${projectName}",
  description: "Scaffolded by CodeMode"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen"
        style={{
          background: "${color("background", "#f1f5f9")}",
          color: "${color("text", "#22223b")}"
        }}
      >
        <Navbar projectName={metadata.title} />
        <main>{children}</main>
        <Footer projectName={metadata.title} />
      </body>
    </html>
  );
}
      `.trim(),
    },

    "app/page.tsx": {
      display: `
import React from "react";

const HomePage: React.FC = () => (
  <section
    className="w-full min-h-[100vh] p-10 shadow-xl flex flex-col"
    style={{
      background: "${color("background", "#f1f5f9")}",
      color: "${color("text", "#22223b")}"
    }}
  >
    <div className="flex flex-col items-center justify-center p-3">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: "${color("primary", "#06b6d4")}" }}
      >
        Welcome to ${projectName}!
      </h1>
      <p className="mb-8">
        Instantly scaffold beautiful, production-ready apps.<br />
        Use the prompt bar below to ask CodeMode to update the UI!
      </p>

    </div>
  </section>
);

export default HomePage;
      `.trim(),
    },

    // --- ABOUT PAGE ---
    "app/about/page.tsx": {
      display: `
import React from "react";

const AboutPage: React.FC = () => (
  <section
    className="w-full min-h-[100vh] p-10 shadow-xl flex flex-col"
    style={{
      background: "${color("background", "#f1f5f9")}",
      color: "${color("text", "#22223b")}"
    }}
  >
    <div className="flex flex-col items-center justify-center p-3">
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: "${color("primary", "#06b6d4")}" }}
      >
        About
      </h1>
      <p>
        This project was scaffolded using BauerVision CodeMode.<br />
        Easily preview and build modern, mobile-responsive React apps.
      </p>
      <br />
      <br />
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: "${color("accent", "#eab308")}" }}
      >
        Add as much content as you want!
      </h2>
    </div>
  </section>
);

export default AboutPage;
      `.trim(),
    },

    // --- CONTACT PAGE ---
    "app/contact/page.tsx": {
      display: `
import React from "react";

const ContactPage: React.FC = () => (
  <section
    className="w-full min-h-[100vh] p-10 shadow-xl flex flex-col"
    style={{
      background: "${color("background", "#f1f5f9")}",
      color: "${color("text", "#22223b")}"
    }}
  >
    <div className="flex flex-col items-center justify-center p-3">
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: "${color("primary", "#06b6d4")}" }}
      >
        Contact
      </h1>
      <p className="text-center">
        Have questions or feedback?<br />
        Contact the developer at mike@bauervision.com.
      </p>
    </div>
  </section>
);

export default ContactPage;
      `.trim(),
    },
  };
}
