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
    "src/app/components/Navbar.tsx": {
      display: `"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import LoginDialog from "./LoginDialog";
import { ColorRoles } from "../types";
import chroma from "chroma-js";

interface NavbarProps {
  projectName: string;
  colors: ColorRoles;
}

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function getContrastAwareTextColor(bg: string, fallback: string): string {
  try {
    return chroma.contrast(bg, "#ffffff") >= 4.5 ? "#ffffff" : "#111827";
  } catch {
    return fallback;
  }
}

const Navbar: React.FC<NavbarProps> = ({ projectName, colors }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const textColor = getContrastAwareTextColor(colors.accent, colors.text);

  const linkClass = (href: string) =>
    \`px-4 py-2 rounded-lg font-semibold transition \${pathname === href
      ? "pointer-events-none"
      : "hover:bg-cyan-200/20"}\`;

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 border-b relative z-20"
      style={{
        background: colors.secondary,
        color: textColor,
      }}
    >
      <Link href="/" className="font-extrabold text-2xl tracking-tight" style={{ color: textColor }}>
        {projectName}
      </Link>

      {isMobile ? (
        <button
          className="p-2 rounded-xl transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" style={{ color: colors.primary }} />
        </button>
      ) : (
        <div className="flex items-center gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              style={{
                color: textColor,
                background: pathname === href ? colors.accent : "transparent"
              }}
            >
              {label}
            </Link>
          ))}
          <LoginDialog colors={colors} />
        </div>
      )}

      {menuOpen && isMobile && (
        <div
          className="absolute right-0 top-full mt-2 rounded-lg shadow-lg p-4 flex flex-col gap-2 z-30"
          style={{
            background: colors.surface,
            color: textColor,
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setMenuOpen(false)}
              style={{
                color: textColor,
                background: pathname === href ? colors.accent : "transparent"
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;`.trim(),
    },
    // --- AnimatedSection ---
    "src/app/components/AnimatedSection.tsx": {
      display: `"use client";
import { motion } from "framer-motion";
import chroma from "chroma-js";

type WidthOption = "content" | "full" | "half";

interface AnimatedSectionProps {
  title: string;
  body: string;
  alignment?: "left" | "center" | "right";
  width?: WidthOption;
  padding?: string;
  margin?: string;
  backgroundColor?: string; // hex
  textColor?: string;       // hex
  rounded?: boolean;
}

export default function AnimatedSection({
  title,
  body,
  alignment = "center",
  width = "content",
  padding = "p-6",
  margin = "my-10",
  backgroundColor = "#1f2937",
  textColor = "#d1d5db",
  rounded = false,
}: AnimatedSectionProps) {
  const textAlign =
    alignment === "left" ? "text-left" :
    alignment === "right" ? "text-right" : "text-center";

  const roundedClass = rounded ? "rounded-2xl" : "";
  const widthClass =
    width === "full" ? "w-full" :
    width === "half" ? "w-[75%] mx-auto" : "max-w-3xl mx-auto";

  const contrastPass = chroma.contrast(backgroundColor, textColor) >= 4.5;
    const safeTextColor = contrastPass
      ? textColor
      : chroma.contrast(backgroundColor, "#ffffff") >= 4.5
      ? "#ffffff"
      : "#000000";

    const subtleTextColor = chroma
      .mix(backgroundColor, safeTextColor, 0.85)
      .hex();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={\`\${margin} \${padding} \${textAlign} \${widthClass} \${roundedClass} shadow-md\`}
      style={{ backgroundColor, color: textColor }}
    >
      <h2 className="text-2xl font-bold"
      style={{ color: safeTextColor }}>
        {title}
      </h2>
      <p className="mt-2"
      style={{ color: subtleTextColor }}>
      {body}</p>
    </motion.section>
  );
}`.trim(),
    },

    // --- LoginDialog ---
    "src/app/components/LoginDialog.tsx": {
      display: `"use client";
import { useState } from "react";
import { ColorRoles } from "../types";
import chroma from "chroma-js";

type LoginDialogProps = {
  colors?: ColorRoles;
};

function getContrastAwareText(bg: string): string {
  try {
    return chroma.contrast(bg, "#ffffff") >= 4.5 ? "#ffffff" : "#111827";
  } catch {
    return "#111827";
  }
}

export default function LoginDialog({ colors }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    alert(\`Login successful for: \${email}\`);
    setOpen(false);
  };

  const accent = colors?.accent ?? "#06b6d4";
  const textColor = getContrastAwareText(accent);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded transition font-semibold"
        style={{
          background: accent,
          color: textColor,
        }}
      >
        Login
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8">
          <div
            className="w-full max-w-sm p-6 rounded-lg shadow-lg relative"
            style={{
              background: colors?.surface ?? "#ffffff",
              color: colors?.text ?? "#111827",
            }}
          >
            <button
              className="absolute top-2 right-3 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
              onClick={() => setOpen(false)}
              style={{ color: colors?.text }}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4" style={{ color: accent }}>
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                style={{
                  background: "#ffffff",
                  color: "#111827",
                  borderColor: colors?.accent ?? "#94a3b8",
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                style={{
                  background: "#ffffff",
                  color: "#111827",
                  borderColor: colors?.accent ?? "#94a3b8",
                }}
                required
              />
              <button
                type="submit"
                className="w-full py-2 rounded font-semibold transition"
                style={{
                  background: accent,
                  color: textColor,
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}`.trim(),
    },
    // --- FOOTER ---
    "src/app/components/Footer.tsx": {
      display: `
import React from "react";

interface FooterProps {
  projectName: string;
}

const Footer: React.FC<FooterProps> = ({ projectName }) => (
  <footer
    className="w-full text-center px-8 py-6 mt-auto text-xs border-t bg-transparent"
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
    "src/app/hooks/useIsMobile.ts": {
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
    "src/app/layout.tsx": {
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
const colors = {
    primary: "${color("primary", "#e7765b")}",
    secondary: "${color("secondary", "#e58b45")}",
    accent: "${color("accent", "#5be776")}",
    background: "${color("background", "#f1f5f9")}",
    surface: "${color("surface", "#ffffff")}",
    text: "${color("text", "#22223b")}",
  };

  return (
    <html lang="en">
      <body
        className="min-h-screen"
        style={{
          background: colors.background,
          color: colors.text
        }}
      >
        <Navbar projectName={metadata.title} colors={colors} />
        <main>{children}</main>
        <Footer projectName={metadata.title} />
      </body>
    </html>
  );
}`.trim(),
    },

    // --- Home Page ---
    "src/app/page.tsx": {
      display: `"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./components/AnimatedSection";

const HomePage: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section
          className="w-full flex-1 p-10 shadow-xl flex flex-col min-h-screen"
          style={{
            background: "${color("background", "#1e1e1a")}",
            color: "${color("text", "#5be776")}"
          }}
        >
          <div className="inline-block border-b-4 px-2 pb-1 mb-6" style={{ borderColor: "${color(
            "secondary",
            "#86d685"
          )}" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "${color("accent", "#e7765b")}" }}
            >
              Welcome to ${projectName}!
            </h1>
          </div>
            <p className="text-center pb-4">
              Mobile ready, web application scaffolded and ready for development!
            </p>

            <AnimatedSection
              title="Animated Sections with Alignment"
              body="This section has everything aligned to the left, passed via a prop"
              alignment="left"
              width="full"
              backgroundColor="${color("primary", "#e7765b")}"
              textColor="${color("accent", "#67e8f9")}"
              padding="px-10 py-16"
              margin="mb-20"
            />

            <AnimatedSection
              title="Centered Section"
              body="This particular section is just centered 100%"
              alignment="center"
              width="content"
              backgroundColor="${color("primary", "#e7765b")}"
              textColor="${color("accent", "#67e8f9")}"
              padding="px-10 py-16"
              margin="mb-20"
              rounded
            />

            <AnimatedSection
              title="Right Aligned"
              body="Here we pushed everything to the right"
              alignment="right"
              width="half"
              backgroundColor="${color("primary", "#e7765b")}"
              textColor="${color("accent", "#67e8f9")}"
              padding="px-10 py-16"
              margin="mb-20"
              rounded
            />

            <AnimatedSection
              title="Animated on Scroll"
              body="Responds to its position in the view and animates accordingly"
              alignment="left"
              width="full"
              backgroundColor="${color("primary", "#e7765b")}"
              textColor="${color("accent", "#67e8f9")}"
              padding="px-10 py-16"
              margin="mb-20"
            />

        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;`.trim(),
    },

    // --- About page ---
    "src/app/about/page.tsx": {
      display: `"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section
        className="w-full flex-1 p-10 shadow-xl flex flex-col min-h-screen"
        style={{
          background: "${color("background", "#1e1e1a")}",
          color: "${color("text", "#5be776")}",
        }}
      >
        <div className="inline-block border-b-4 px-2 pb-1 mb-6" style={{ borderColor: "${color(
          "secondary",
          "#86d685"
        )}" }}>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "${color("accent", "#e7765b")}" }}
          >
            About
          </h1>
          </div>
          <p className="text-center pb-4">
            This project was scaffolded using BauerVision CodeMode.
            <br />
            Easily preview and build modern, mobile-responsive React apps.
          </p>

          <AnimatedSection
            title="Centered About"
            body="This particular section is just centered 100%"
            alignment="center"
            width="half"
            backgroundColor="${color("primary", "#e7765b")}"
            textColor="${color("text", "#5be776")}"
            padding="p-10 py-16"
            margin="m-20"
          />

      </section>
    </motion.div>
  );
};

export default AboutPage;`.trim(),
    },

    // --- Contact Page ---
    "src/app/contact/page.tsx": {
      display: `"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent, thank you!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section
        className="w-full flex-1 p-10 shadow-xl flex flex-col min-h-screen"
        style={{
          background: "${color("background", "#1e1e1a")}",
          color: "${color("text", "#5be776")}"
        }}
      >
        <div className="inline-block border-b-4 px-2 pb-1 mb-6" style={{ borderColor: "${color(
          "secondary",
          "#86d685"
        )}" }}>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "${color("accent", "#e7765b")}" }}
          >
            Contact
          </h1>
        </div>
          <p className="text-center pb-4">
            Have questions or feedback?<br />
            Contact us here, someone will be in touch within 24 hours.
          </p>

          <form
            onSubmit={handleContact}
            className="space-y-4 max-w-md mx-auto p-6 rounded-xl shadow-md"
            style={{
              background: "${color("primary", "#e7765b")}",
              color: "${color("text", "#1f2937")}"
            }}
          >
            <input
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-md border focus:outline-none"
              style={{
                background: "#ffffff",
                color: "#111827"
              }}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md border focus:outline-none"
              style={{
                background: "#ffffff",
                color: "#111827"
              }}
            />
            <textarea
              required
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-md border min-h-[120px] focus:outline-none"
              style={{
                background: "#ffffff",
                color: "#111827"
              }}
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition"
              style={{
                background: "${color("accent", "#67e8f9")}",
                color: "#111827"
              }}
            >
              Send
            </button>
          </form>

      </section>
    </motion.div>
  );
};

export default ContactPage;`.trim(),
    },

    // --- Types ---
    "src/app/types.ts": {
      display: `export type ColorRoles = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
};`.trim(),
    },

    // --- Globals.css ---
    "src/app/globals.css": {
      display: `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}`.trim(),
    },
  };
}

export const COLOR_ROLES = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "text", label: "Text" },
];
