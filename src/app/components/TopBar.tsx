"use client";
import { useState } from "react";

export default function TopBar() {
  const [learningMode, setLearningMode] = useState(false);

  return (
    <header className="w-full bg-zinc-950 border-b border-zinc-800 flex items-center px-6 py-4">
      <div className="font-black text-2xl tracking-wide text-cyan-400 mr-8">
        CodeMode
      </div>
      <button
        className={`ml-auto px-4 py-2 rounded ${learningMode ? "bg-cyan-600" : "bg-zinc-800"} transition`}
        onClick={() => setLearningMode(!learningMode)}
      >
        {learningMode ? "Learning Mode: ON" : "Learning Mode: OFF"}
      </button>
    </header>
  );
}
