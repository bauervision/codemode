"use client";

import { useState } from "react";
import Footer from "./PreviewFooter";
import LoginButton from "./PreviewLoginButton";
import PreviewNavbar from "./PreviewNavbar";
import { X } from "lucide-react";

export default function LivePreview({
  isMobilePreview,
  alignLoginLeft,
  darkBackground,
  accentHeadline,
  projectName,
  loading,
  route,
  onRouteChange,
}: {
  isMobilePreview: boolean;
  alignLoginLeft: boolean;
  darkBackground: boolean;
  accentHeadline: boolean;
  projectName: string;
  loading?: boolean;
  route: string;
  onRouteChange: (route: string) => void;
}) {
  // New: control the mobile menu state here!
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px]">
        <svg
          className="animate-spin mb-4"
          width={44}
          height={44}
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#06b6d4"
            strokeWidth="4"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M44 24a20 20 0 0 1-20 20"
            stroke="#06b6d4"
            strokeWidth="4"
            fill="none"
          />
        </svg>
        <div className="text-cyan-400 font-semibold text-lg">
          Updating preview…
        </div>
      </div>
    );
  }

  // Render different pages based on current route
  let Content: React.ReactNode;
  if (route === "/about") {
    Content = (
      <section className="w-full max-w-xl mx-auto p-10 rounded-2xl bg-white/90 dark:bg-zinc-900/80 shadow-xl mt-12">
        <h1 className="text-3xl font-bold text-cyan-600 mb-4">About</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          This project was scaffolded using BauerVision CodeMode.
          <br />
          Easily preview and build modern, mobile-responsive React apps.
        </p>
      </section>
    );
  } else if (route === "/contact") {
    Content = (
      <section className="w-full max-w-xl mx-auto p-10 rounded-2xl bg-white/90 dark:bg-zinc-900/80 shadow-xl mt-12">
        <h1 className="text-3xl font-bold text-cyan-600 mb-4">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Have questions or feedback?
          <br />
          Contact the developer at mike@bauervision.com.
        </p>
      </section>
    );
  } else {
    Content = (
      <section
        className={`w-full max-w-xl mx-auto p-10 rounded-2xl shadow-xl mt-12 ${
          alignLoginLeft ? "flex flex-col items-start" : ""
        } ${
          darkBackground ? "bg-zinc-950" : "bg-white/90 dark:bg-zinc-900/80"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-4 ${
            accentHeadline ? "text-cyan-400" : "text-cyan-600"
          }`}
        >
          Welcome to {projectName}!
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-300">
          Instantly scaffold beautiful, production-ready apps.
          <br />
          Use the prompt bar below to ask CodeMode to update the UI!
        </p>
        <LoginButton />
      </section>
    );
  }

  return (
    <div
      className={`relative min-h-[400px] flex flex-col w-full h-full ${
        darkBackground
          ? "bg-zinc-950 border-zinc-900"
          : "bg-white/90 dark:bg-zinc-900/80 border-cyan-100/10"
      } rounded-2xl shadow-xl transition-all duration-500`}
      // relative: required for abs overlay/menu!
    >
      {/* Overlay & Drawer always go here */}
      {isMobilePreview && menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="absolute inset-0 z-30 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ transition: "background 0.3s" }}
          />
          {/* Drawer */}
          <div
            className={`
              absolute top-0 right-0 z-40 h-full w-72
              bg-white dark:bg-zinc-900
              border-l-4 border-cyan-300 dark:border-cyan-900
              shadow-2xl
              flex flex-col gap-6 p-6
              transition-transform duration-300
              ${
                menuOpen
                  ? "translate-x-0"
                  : "translate-x-full pointer-events-none"
              }
            `}
            aria-label="Mobile menu"
          >
            <button
              className="self-end mb-4 p-1 rounded-full hover:bg-cyan-100 dark:hover:bg-zinc-800"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7 text-cyan-600 dark:text-cyan-300" />
            </button>
            <button
              className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition text-left"
              onClick={() => {
                setMenuOpen(false);
                onRouteChange("/");
              }}
            >
              Home
            </button>
            <button
              className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition text-left"
              onClick={() => {
                setMenuOpen(false);
                onRouteChange("/about");
              }}
            >
              About
            </button>
            <button
              className="text-cyan-700 dark:text-cyan-200 text-base font-medium hover:underline px-2 py-1 rounded transition text-left"
              onClick={() => {
                setMenuOpen(false);
                onRouteChange("/contact");
              }}
            >
              Contact
            </button>
          </div>
        </>
      )}

      {/* Pass onMenuOpen so PreviewNavbar can open the menu */}
      <PreviewNavbar
        projectName={projectName}
        mobile={isMobilePreview}
        onNavigate={onRouteChange}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <main className="flex-1 flex flex-col items-center justify-center">
        {Content}
      </main>
      <Footer projectName={projectName} />
    </div>
  );
}
