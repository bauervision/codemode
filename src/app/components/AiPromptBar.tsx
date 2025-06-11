"use client";
import { useState } from "react";

export default function AiPromptBar({
  onPrompt,
  loading,
}: {
  onPrompt: (prompt: string) => void;
  loading?: boolean;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onPrompt(input.trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full bg-zinc-950 border-t border-zinc-800 px-6 py-4 sticky bottom-0 z-10"
    >
      <input
        type="text"
        className="flex-1 bg-zinc-800 text-cyan-200 px-4 py-2 rounded-lg focus:outline-none text-lg"
        placeholder='Try: Move the Login button to the left, darken the background, use the accent color for the text…'
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className={`px-6 py-2 rounded-lg font-bold bg-cyan-600 text-white transition disabled:opacity-60 ${
          loading ? "cursor-wait" : ""
        }`}
      >
        {loading ? "Thinking…" : "Update UI"}
      </button>
    </form>
  );
}
