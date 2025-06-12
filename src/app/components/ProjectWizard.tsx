"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCopy, Check } from "lucide-react";

const modes = [
  { key: "web", label: "Web", emoji: "🌐" },
  { key: "mobile", label: "Mobile", emoji: "📱" },
];

export default function ProjectWizard({
  onLaunch,
}: {
  onLaunch: (name: string) => void;
}) {
  const [step, setStep] = useState<"select" | "webName" | "summary">("select");
  const [projectName, setProjectName] = useState("My Next App");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  // Animations
  const dialogVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const command = `npx create-next-app@latest ${projectName
    .toLowerCase()
    .replace(/\s+/g, "-")} --typescript --tailwind`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={dialogVariants}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 shadow-xl w-[95vw] max-w-lg text-center relative">
          <div className="font-extrabold text-3xl mb-2 text-cyan-400 tracking-wider">
            BauerVision: CodeMode
          </div>
          <div className="text-zinc-400 mb-8">Jumpstart your next project</div>

          {step === "select" && (
            <>
              <div className="flex flex-col space-y-6">
                <div className="flex justify-center gap-4 mb-2">
                  {modes.map((mode) => (
                    <button
                      key={mode.key}
                      className="flex flex-col items-center bg-zinc-800 hover:bg-cyan-800/60 transition text-xl rounded-xl py-6 px-6 min-w-[110px] focus:outline-none"
                      onClick={() =>
                        mode.key === "web"
                          ? setStep("webName")
                          : alert("Only Web Mode is ready for MVP!")
                      }
                    >
                      <span className="text-3xl mb-2">{mode.emoji}</span>
                      {mode.label}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
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
                </div>
              </div>
            </>
          )}

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
                onClick={() => setStep("summary")}
              >
                Continue
              </button>
            </div>
          )}

          {step === "summary" && (
            <div className="flex flex-col items-center gap-6">
              <div className="mb-2 font-semibold">Ready to Scaffold!</div>
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
                  onLaunch(projectName.toLowerCase().replace(/\s+/g, "-"))
                }
              >
                Open Project
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
