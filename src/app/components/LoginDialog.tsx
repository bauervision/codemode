"use client";
import { useState } from "react";
import { ColorRoles } from "../types";
import chroma from "chroma-js";
import { createPortal } from "react-dom";

type LoginDialogProps = {
  colors?: ColorRoles;
  modalRoot: React.RefObject<HTMLDivElement | null>;
};

function getContrastAwareText(bg: string): string {
  try {
    return chroma.contrast(bg, "#ffffff") >= 4.5 ? "#ffffff" : "#111827";
  } catch {
    return "#111827";
  }
}

export default function LoginDialog({ colors, modalRoot }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    alert(`Login successful for: ${email}`);
    setOpen(false);
  };

  const accent = colors?.accent ?? "#06b6d4"; // default cyan-600
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

      {open &&
        modalRoot.current &&
        createPortal(
          <div className="absolute inset-0 z-50 flex items-center justify-center overflow-auto px-4 py-8 bg-black/90">
            <div
              className="w-full max-w-sm p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto"
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
          </div>,
          modalRoot.current
        )}
    </>
  );
}
