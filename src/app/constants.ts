import type { ColorRoles } from "./types";

export function getInitialFiles(
  projectName: string,
  finalizedColors?: Partial<ColorRoles>
): Record<string, { display: string; preview?: string }> {
  function color(role: keyof ColorRoles, fallback: string) {
    return finalizedColors?.[role] || fallback;
  }

  return {
    "src/.vscode/settings.json": {
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
      display: `"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import LoginDialog from "./LoginDialog";
import { ColorRoles } from "../types";

interface NavbarProps {
  projectName: string;
  colors: ColorRoles;
}

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar: React.FC<NavbarProps> = ({ projectName, colors }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    \`px-4 py-2 rounded-lg font-semibold transition \${pathname === href
      ? "bg-cyan-700 text-white pointer-events-none"
      : "hover:bg-cyan-200/20 text-black dark:text-white"}\`;

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 border-b relative z-20"
      style={{
        background: "\${color('secondary', '#e58b45')}",
        color: "\${color('accent', '#5be776')}",
      }}
    >
      <Link href="/" className="font-extrabold text-2xl tracking-tight">
        {projectName}
      </Link>

      {isMobile ? (
        <button
          className="p-2 rounded-xl transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      ) : (
        <div className="flex items-center gap-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
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
            background: "\${color('surface', '#99d24b')}",
            color: "\${color('accent', '#5be776')}",
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setMenuOpen(false)}
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
    "components/AnimatedSection.tsx": {
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

  const h2Color = chroma.contrast(textColor, backgroundColor) >= 4.5
    ? textColor
    : chroma(textColor).luminance() > 0.5 ? "#111827" : "#f9fafb";

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={\`\${margin} \${padding} \${textAlign} \${widthClass} \${roundedClass} shadow-md\`}
      style={{ backgroundColor, color: textColor }}
    >
      <h2 className="text-2xl font-bold" style={{ color: h2Color }}>
        {title}
      </h2>
      <p className="mt-2">{body}</p>
    </motion.section>
  );
}`.trim(),
    },

    // --- LoginDialog ---
    "components/LoginDialog.tsx": {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
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

    // --- Home Page ---
    "src/app/page.tsx": {
      display: `"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const HomePage: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section
          className="w-full min-h-[100vh] pt-10 shadow-xl flex flex-col"
          style={{
            background: "\${color('background', '#1e1e1a')}",
            color: "\${color('text', '#5be776')}"
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "\${color('primary', '#e7765b')}" }}
            >
              Welcome to \${projectName}!
            </h1>
            <p className="text-center pb-4">
              Mobile ready, web application scaffolded and ready for development!
            </p>

            <AnimatedSection
              title="Animated Sections with Alignment"
              body="This section has everything aligned to the left, passed via a prop"
              alignment="left"
              width="full"
              backgroundColor="\${color('primary', '#e7765b')}"
              textColor="\${color('accent', '#67e8f9')}"
              padding="px-10 py-16"
              margin="mb-20"
            />

            <AnimatedSection
              title="Centered Section"
              body="This particular section is just centered 100%"
              alignment="center"
              width="content"
              backgroundColor="\${color('primary', '#e7765b')}"
              textColor="\${color('accent', '#67e8f9')}"
              padding="px-10 py-16"
              margin="mb-20"
              rounded
            />

            <AnimatedSection
              title="Right Aligned"
              body="Here we pushed everything to the right"
              alignment="right"
              width="half"
              backgroundColor="\${color('primary', '#e7765b')}"
              textColor="\${color('accent', '#67e8f9')}"
              padding="px-10 py-16"
              margin="mb-20"
              rounded
            />

            <AnimatedSection
              title="Animated on Scroll"
              body="Responds to its position in the view and animates accordingly"
              alignment="left"
              width="full"
              backgroundColor="\${color('primary', '#e7765b')}"
              textColor="\${color('accent', '#67e8f9')}"
              padding="px-10 py-16"
              margin="mb-20"
            />
          </div>
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
        className="w-full min-h-[100vh] shadow-xl flex flex-col"
        style={{
          background: "\${color('background', '#1e1e1a')}",
          color: "\${color('text', '#5be776')}",
        }}
      >
        <div className="flex flex-col items-center justify-center mt-10">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "\${color('primary', '#e7765b')}" }}
          >
            About
          </h1>
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
            backgroundColor="\${color('primary', '#e7765b')}"
            textColor="\${color('text', '#5be776')}"
            padding="p-10 py-16"
            margin="m-20"
          />
        </div>
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
        className="w-full min-h-[100vh] shadow-xl flex flex-col"
        style={{
          background: "\${color('background', '#1e1e1a')}",
          color: "\${color('text', '#5be776')}"
        }}
      >
        <div className="flex flex-col items-center justify-center mt-10">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "\${color('primary', '#e7765b')}" }}
          >
            Contact
          </h1>
          <p className="text-center pb-4">
            Have questions or feedback?<br />
            Contact us here, someone will be in touch within 24 hours.
          </p>

          <form
            onSubmit={handleContact}
            className="space-y-4 max-w-md mx-auto p-6 rounded-xl shadow-md"
            style={{
              background: "\${color('primary', '#e7765b')}",
              color: "\${color('text', '#1f2937')}"
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
                background: "\${color('accent', '#67e8f9')}",
                color: "#111827"
              }}
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;`.trim(),
    },
  };
}
