// constants/getInitialFiles.ts

export function getInitialFiles(projectName: string): Record<string, string> {
  return {
    // VSCode settings
    ".vscode/settings.json": `{
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

    // Components
    "components/PreviewNavbar.tsx": `import React from "react";
import { Menu } from "lucide-react";

type Route = "/" | "/about" | "/contact";

interface PreviewNavbarProps {
  projectName: string;
  onNavigate: (route: Route) => void;
  mobile?: boolean;
  onMenuOpen?: () => void;
}

const PreviewNavbar: React.FC<PreviewNavbarProps> = ({
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

export default PreviewNavbar;
`,

    "components/PreviewFooter.tsx": `import React from "react";

interface PreviewFooterProps {
  projectName: string;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ projectName }) => (
  <footer className="w-full text-center py-3 mt-auto text-xs text-zinc-400 dark:text-zinc-600 border-t border-cyan-100/20 bg-transparent">
    &copy; {new Date().getFullYear()} {projectName} · Built with BauerVision CodeMode
  </footer>
);

export default PreviewFooter;
`,

    "components/PreviewLoginButton.tsx": `import React from "react";

const PreviewLoginButton: React.FC = () => (
  <button className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold shadow hover:bg-cyan-700 transition">
    Log In
  </button>
);

export default PreviewLoginButton;
`,

    // Main app folder: Next.js app router style
    "app/layout.tsx": `import "./globals.css";
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
`,

    "app/page.tsx": `import React from "react";
import PreviewLoginButton from "../components/PreviewLoginButton";

interface HomePageProps {
  alignLoginLeft?: boolean;
  darkBackground?: boolean;
  accentHeadline?: boolean;
  projectName?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  alignLoginLeft,
  darkBackground,
  accentHeadline,
  projectName = "${projectName}",
}) => {
  return (
    <section
      className={\`w-full max-w-xl mx-auto p-10 rounded-2xl shadow-xl mt-12 \${alignLoginLeft ? "flex flex-col items-start" : ""} \${darkBackground ? "bg-zinc-950" : "bg-white/90 dark:bg-zinc-900/80"}\`}
    >
      <h1 className={\`text-4xl font-bold mb-4 \${accentHeadline ? "text-cyan-400" : "text-cyan-600"}\`}>
        Welcome to {projectName}!
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-300">
        Instantly scaffold beautiful, production-ready apps.<br />
        Use the prompt bar below to ask CodeMode to update the UI!
      </p>
      <PreviewLoginButton />
    </section>
  );
};

export default HomePage;
`,

    "app/about.tsx": `import React from "react";

const AboutPage: React.FC = () => (
  <section className="w-full max-w-xl mx-auto p-10 rounded-2xl bg-white/90 dark:bg-zinc-900/80 shadow-xl mt-12">
    <h1 className="text-3xl font-bold text-cyan-600 mb-4">About</h1>
    <p className="text-zinc-600 dark:text-zinc-300">
      This project was scaffolded using BauerVision CodeMode.<br/>
      Easily preview and build modern, mobile-responsive React apps.
    </p>
  </section>
);

export default AboutPage;
`,

    "app/contact.tsx": `import React from "react";

const ContactPage: React.FC = () => (
  <section className="w-full max-w-xl mx-auto p-10 rounded-2xl bg-white/90 dark:bg-zinc-900/80 shadow-xl mt-12">
    <h1 className="text-3xl font-bold text-cyan-600 mb-4">Contact</h1>
    <p className="text-zinc-600 dark:text-zinc-300">
      Have questions or feedback?<br/>
      Contact the developer at mike@bauervision.com.
    </p>
  </section>
);

export default ContactPage;
`,

    "app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles here */`,

    // Root files
    "package.json": `{
  "name": "${projectName.toLowerCase().replace(/\\s+/g, "-")}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.273.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.23",
    "autoprefixer": "^10.4.14"
  }
}
`,
    ".gitignore": `node_modules
.next
.env
.DS_Store
out
dist
.vercel
.vscode
build
coverage
*.log
`,
  };
}
