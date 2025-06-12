// constants/getInitialFiles.ts

export function getInitialFiles(
  projectName: string
): Record<string, { display: string; preview?: string }> {
  return {
    // VSCode settings
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
}`,
    },

    // Components
    "components/Navbar.tsx": {
      display: `
"use client";
import React from "react";
import { Menu } from "lucide-react";

type Route = "/" | "/about" | "/contact";

interface NavbarProps {
  projectName: string;
  onNavigate: (route: Route) => void;
  mobile?: boolean;
  onMenuOpen?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  projectName,
  onNavigate,
  mobile = false,
  onMenuOpen,
}) => {
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
};

interface NavLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

function NavLink({ onClick, children }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition"
    >
      {children}
    </button>
  );
}

export default Navbar;
  `.trim(),

      preview: `
<nav className="w-full flex items-center justify-between px-6 py-3 bg-cyan-50 dark:bg-zinc-900 border-b border-cyan-100/30 relative z-20">
  <span className="font-extrabold text-2xl text-cyan-600 dark:text-cyan-400 tracking-tight">
    My App
  </span>
  <div className="flex items-center gap-6">
    <a className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition" href="#">Home</a>
    <a className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition" href="#">About</a>
    <a className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition" href="#">Contact</a>
  </div>
</nav>
  `.trim(),
    },

    "components/Footer.tsx": {
      display: `
import React from "react";

interface FooterProps {
  projectName: string;
}

const Footer: React.FC<FooterProps> = ({ projectName }) => (
  <footer className="w-full text-center py-3 mt-auto text-xs text-zinc-400 dark:text-zinc-600 border-t border-cyan-100/20 bg-transparent">
    &copy; {new Date().getFullYear()} {projectName} · Built with BauerVision CodeMode
  </footer>
);

export default Footer;
  `.trim(),

      preview: `
<footer className="w-full text-center py-3 mt-auto text-xs text-zinc-400 dark:text-zinc-600 border-t border-cyan-100/20 bg-transparent">
  &copy; 2025 My App · Built with BauerVision CodeMode
</footer>
  `.trim(),
    },
    // Main app folder: Next.js app router style
    "app/layout.tsx": {
      display: `
import "./globals.css";
import React from "react";

export const metadata = {
  title: "${projectName}",
  description: "Scaffolded by CodeMode"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-cyan-50 via-zinc-200 to-cyan-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-cyan-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}
  `.trim(),

      preview: `
<div className="bg-gradient-to-br from-cyan-50 via-zinc-200 to-cyan-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-cyan-950 min-h-screen">
  {/* Page content would be rendered here */}
  {children}
</div>
  `.trim(),
    },

    "app/page.tsx": {
      display: `
import React from "react";
import LoginButton from "./components/LoginButton";

interface HomePageProps {
  alignLoginLeft?: boolean;
  darkBackground?: boolean;
  accentHeadline?: boolean;
  projectName?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  accentHeadline,
  projectName = "${projectName}",
}) => {
  return (
    <section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-gray-900 shadow-xl flex flex-col ">
      <div className="flex flex-col items-center justify-center p-3">
        <h1
          className={\`text-4xl font-bold mb-4 \${accentHeadline ? "text-cyan-400" : "text-cyan-600"}\`}
        >
          Welcome to {projectName}!
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-300">
          Instantly scaffold beautiful, production-ready apps.
          <br />
          Use the prompt bar below to ask CodeMode to update the UI!
        </p>
        <LoginButton />
      </div>
    </section>
  );
};

export default HomePage;
      `.trim(),

      preview: `
<section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-gray-900 shadow-xl flex flex-col ">
  <div className="flex flex-col items-center justify-center p-3">
    <h1 className="text-4xl font-bold mb-4 text-cyan-600">
      Welcome to ${projectName}!
    </h1>
    <p className="mb-8 text-zinc-600 dark:text-zinc-300">
      Instantly scaffold beautiful, production-ready apps.
      <br />
      Use the prompt bar below to ask CodeMode to update the UI!
    </p>
  </div>
</section>
      `.trim(),
    },

    "app/about.tsx": {
      display: `
import React from "react";

const AboutPage: React.FC = () => (
  <section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-zinc-800 shadow-xl flex flex-col ">
    <div className="flex flex-col items-center justify-center p-3">
      <h1 className="text-3xl font-bold text-cyan-600 mb-4">About</h1>
      <p className="text-zinc-600 dark:text-zinc-300">
        This project was scaffolded using BauerVision CodeMode.
        <br />
        Easily preview and build modern, mobile-responsive React apps.
      </p>
      <br />
      <br />
      <h2 className="text-xl font-bold text-cyan-600 mb-4">
        Add as much content as you want!
      </h2>
    </div>
  </section>
);

export default AboutPage;
      `.trim(),

      preview: `
<section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-zinc-800 shadow-xl flex flex-col ">
  <div className="flex flex-col items-center justify-center p-3">
    <h1 className="text-3xl font-bold text-cyan-600 mb-4">About</h1>
    <p className="text-zinc-600 dark:text-zinc-300">
      This project was scaffolded using BauerVision CodeMode.
      <br />
      Easily preview and build modern, mobile-responsive React apps.
    </p>
    <br />
    <br />
    <h2 className="text-xl font-bold text-cyan-600 mb-4">
      Add as much content as you want!
    </h2>
  </div>
</section>
      `.trim(),
    },

    "app/contact.tsx": {
      display: `
import React from "react";

const ContactPage: React.FC = () => (
  <section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-gray-800 shadow-xl flex flex-col ">
    <div className="flex flex-col items-center justify-center p-3">
      <h1 className="text-3xl font-bold text-cyan-600 mb-4">Contact</h1>
      <p className="text-zinc-600 dark:text-zinc-300 text-center">
        Have questions or feedback?
        <br />
        Contact the developer at mike@bauervision.com.
      </p>
    </div>
  </section>
);

export default ContactPage;
      `.trim(),

      preview: `
<section className="w-full min-h-[100vh] p-10 bg-cyan-50 dark:bg-gray-800 shadow-xl flex flex-col ">
  <div className="flex flex-col items-center justify-center p-3">
    <h1 className="text-3xl font-bold text-cyan-600 mb-4">Contact</h1>
    <p className="text-zinc-600 dark:text-zinc-300 text-center">
      Have questions or feedback?
      <br />
      Contact the developer at mike@bauervision.com.
    </p>
  </div>
</section>
      `.trim(),
    },
  };
}
