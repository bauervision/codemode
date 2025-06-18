"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCopy, Check, Lock, Unlock, Move } from "lucide-react";
import { ColorRoles } from "../types";
import { generateRandomPalette } from "../utils/color";
import { useTheme } from "../context/ThemeContext";

// --- Color Roles ---
const COLOR_ROLES = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "text", label: "Text" },
];

export default function ProjectWizard({
  onLaunch,
}: {
  onLaunch: (name: string, colors: ColorRoles) => void;
}) {
  const { colors, setColors, locks, setLocks, setFinalized } = useTheme();
  const [step, setStep] = useState<
    "select" | "webName" | "customize" | "summary"
  >("select");
  const [projectName, setProjectName] = useState("My Next App");

  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  // Clipboard state
  const [copied, setCopied] = useState(false);

  // Animations
  const dialogVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const command = `npx create-next-app@latest ${projectName
    .toLowerCase()
    .replace(/\s+/g, "-")} --typescript --tailwind`;

  // Handlers
  function handleDragStart(role: string) {
    setDragging(role);
  }
  function handleDragOver(role: string) {
    setDragOver(role);
  }
  function handleDrop(target: string) {
    if (!dragging || dragging === target) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    setColors((c) => {
      const updated = { ...c };
      [
        updated[target as keyof ColorRoles],
        updated[dragging as keyof ColorRoles],
      ] = [
        updated[dragging as keyof ColorRoles],
        updated[target as keyof ColorRoles],
      ];
      return updated;
    });
    setLocks((l) => {
      const updated = { ...l };
      [updated[target], updated[dragging]] = [
        updated[dragging],
        updated[target],
      ];
      return updated;
    });
    setDragging(null);
    setDragOver(null);
    setFinalized(false);
  }

  // Randomize unlocked colors and UN-finalize
  function handleRandomize() {
    const newPalette = generateRandomPalette();
    setColors((prev) => {
      const updated = { ...prev };
      (Object.keys(newPalette) as (keyof ColorRoles)[]).forEach((role) => {
        if (!locks[role]) updated[role] = newPalette[role];
      });
      return updated;
    });
    setFinalized(false);
  }

  // Clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={dialogVariants}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <section className="flex flex-col justify-center items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 shadow-xl w-[95vw] max-w-lg text-center relative">
            <div className="font-extrabold text-3xl mb-2 text-cyan-400 tracking-wider">
              BauerVision: CodeMode
            </div>
            <div className="text-zinc-400 mb-8">
              Jumpstart your next project
            </div>

            {/* Step 1: Mode */}
            {step === "select" && (
              <div className="flex flex-col space-y-6">
                <div className="flex justify-center gap-4 mb-2">
                  {[
                    { key: "web", label: "Web", emoji: "🌐" },
                    { key: "mobile", label: "Mobile", emoji: "📱" },
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      className={`relative flex flex-col items-center text-xl rounded-xl py-6 px-6 min-w-[110px] focus:outline-none transition ${
                        mode.key === "mobile"
                          ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                          : "bg-zinc-800 hover:bg-cyan-800/60 text-white"
                      }`}
                      onClick={() => setStep("webName")}
                      disabled={mode.key === "mobile"}
                    >
                      <span className="text-3xl mb-2">{mode.emoji}</span>
                      {mode.label}

                      {mode.key === "mobile" && (
                        <span className="absolute top-1 right-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                          Coming Soon
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="text-cyan-400 underline underline-offset-2"
                    onClick={() => alert("Recent projects picker coming soon!")}
                  >
                    Open Recent Project
                  </button>
                  <button
                    className="text-cyan-400 underline underline-offset-2"
                    onClick={() => alert("Settings dialog coming soon!")}
                  >
                    Adjust Settings
                  </button>
                </div> */}
              </div>
            )}

            {/* Step 2: Name */}
            {step === "webName" && (
              <div className="flex flex-col items-center gap-6">
                <div className="font-bold text-lg text-left w-full mb-2">
                  Project Name:
                </div>
                <input
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none text-lg text-cyan-300"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  autoFocus
                />
                <button
                  className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl py-3 font-bold text-lg transition"
                  onClick={() => setStep("customize")}
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 3: Color Palette */}
            {step === "customize" && (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="font-bold text-lg mb-1">
                  Customize your color palette
                </div>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={handleRandomize}
                    className="bg-cyan-700 text-white rounded px-4 py-2 font-bold flex items-center gap-2"
                    type="button"
                  >
                    <Move className="w-4 h-4" />
                    Randomize Unlocked
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  {COLOR_ROLES.map(({ key, label }) => (
                    <div
                      key={key}
                      className={`flex flex-col items-center rounded-lg p-3 transition-all
                      ${
                        dragOver === key && dragging !== key
                          ? "ring-2 ring-cyan-400 scale-105"
                          : ""
                      }
                      ${dragging === key ? "opacity-60" : "opacity-100"}
                      bg-zinc-800 relative`}
                      draggable
                      onDragStart={() => handleDragStart(key)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(key);
                      }}
                      onDrop={() => handleDrop(key)}
                      onDragEnd={() => {
                        setDragging(null);
                        setDragOver(null);
                      }}
                      tabIndex={0}
                      title={`Drag to swap roles, lock to freeze, pick color`}
                    >
                      <div className="flex items-center mb-1 w-full justify-between">
                        <span className="text-xs font-semibold text-cyan-200 capitalize">
                          {label}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocks((l) => ({ ...l, [key]: !l[key] }));
                            setFinalized(false);
                          }}
                          className={`ml-2 text-lg rounded-full p-1 ${
                            locks[key]
                              ? "bg-cyan-900 text-cyan-300"
                              : "bg-zinc-700 text-zinc-400"
                          }`}
                          aria-label={
                            locks[key] ? `Unlock ${label}` : `Lock ${label}`
                          }
                        >
                          {locks[key] ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <input
                        type="color"
                        value={colors[key as keyof ColorRoles]}
                        onChange={(e) => {
                          setColors((c) => ({ ...c, [key]: e.target.value }));
                          setFinalized(false);
                        }}
                        disabled={locks[key]}
                        className="w-12 h-12 rounded shadow border-2 border-cyan-400 mb-1 cursor-pointer"
                      />
                      <span className="text-xs mt-1 text-cyan-300 font-mono">
                        {colors[key as keyof ColorRoles]}
                      </span>
                      {dragging === key && (
                        <span className="text-xs text-zinc-400 mt-2 italic">
                          Dragging…
                        </span>
                      )}
                      {dragOver === key && dragging !== key && (
                        <span className="text-xs text-cyan-400 mt-2">
                          Drop to swap with {label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl py-3 font-bold text-lg transition"
                  onClick={() => setStep("summary")}
                >
                  Continue
                </button>
                <div className="text-xs text-zinc-400 mt-2 text-center">
                  Drag colors to swap roles. Lock to prevent randomizing or
                  editing.
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === "summary" && (
              <div className="flex flex-col items-center gap-6">
                <div className="mb-2 font-semibold">Ready to Scaffold!</div>
                <div className="flex gap-3 mb-2">
                  {COLOR_ROLES.map(({ key, label }) => (
                    <div key={key} className="flex flex-col items-center gap-1">
                      <span
                        className="w-8 h-8 rounded-full border-2 border-cyan-400 inline-block"
                        style={{
                          backgroundColor: colors[key as keyof ColorRoles],
                        }}
                        title={label}
                      />
                      <span className="text-xs text-cyan-300">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 w-full mb-2 text-left relative">
                  <label className="block mb-2 text-zinc-400 text-xs font-semibold">
                    Terminal Command:
                  </label>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-all text-cyan-300 text-sm p-2 bg-zinc-900 rounded select-all pr-16">
                    {command}
                  </pre>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy command"
                    className={`absolute top-1 right-4 flex items-center px-2 py-1 rounded transition
                    ${
                      copied
                        ? "bg-green-700 text-white"
                        : "bg-zinc-700 text-cyan-300 hover:bg-cyan-800"
                    }
                  `}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <button
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl py-3 font-bold text-lg transition"
                  onClick={() =>
                    onLaunch(
                      projectName.toLowerCase().replace(/\s+/g, "-"),
                      colors
                    )
                  }
                >
                  Open Project
                </button>
              </div>
            )}
          </div>

          {step === "select" && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 shadow-xl">
              <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
                <strong>CodeMode</strong> helps you spin up modern,
                mobile-responsive React projects instantly. You can preview,
                customize, and export your code — or open it directly in
                CodeSandbox.
                <br />
                <br />
                It is all about quick scaffolding of new projects, complete with
                all the essential foundation items in place, so all the
                developer has to do is dive into the new stuff!
                <br />
                <br />
                This is an MVP version focused on Web Apps.
              </p>
            </div>
          )}
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
