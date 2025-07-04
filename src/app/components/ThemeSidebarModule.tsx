import React, { useState } from "react";
import { Lock, Unlock, Move } from "lucide-react";
import { COLOR_ROLES } from "../constants";
import { useTheme } from "../context/ThemeContext";

export function ThemeSidebarModule() {
  const {
    colors,
    setColors,
    locks,
    setLocks,
    finalized,
    setFinalized,
    randomizeColors,
  } = useTheme();

  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  function handleDrop(target: string) {
    if (!dragging || dragging === target) {
      setDragging(null);
      setDragOver(null);
      return;
    }

    setColors((c) => {
      const updated = { ...c };
      [
        updated[target as keyof typeof colors],
        updated[dragging as keyof typeof colors],
      ] = [
        updated[dragging as keyof typeof colors],
        updated[target as keyof typeof colors],
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

  return (
    <div className="relative">
      {!finalized && (
        <div className="absolute -top-10 right-0 left-0 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full shadow font-bold z-20 animate-pulse pointer-events-none text-center">
          DRAFT (edit or finalize)
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-between w-full">
          <span className="font-bold text-xs text-cyan-400">Theme Colors</span>

          <button
            onClick={randomizeColors}
            className="bg-cyan-700 text-white rounded px-2 py-1 font-bold flex items-center gap-2 text-xs"
            type="button"
          >
            <Move className="w-3 h-3" />
            Randomize
          </button>

          <button
            onClick={() => setFinalized(true)}
            className={`px-2 py-1 font-bold rounded text-xs transition ${
              finalized
                ? "bg-green-600 text-white"
                : "bg-zinc-700 text-cyan-200 hover:bg-green-700"
            }`}
            type="button"
          >
            Finalize
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          {COLOR_ROLES.map(({ key, label }) => (
            <div
              key={key}
              className={`flex flex-col items-center rounded-lg p-2 transition-all
                ${
                  dragOver === key && dragging !== key
                    ? "ring-2 ring-cyan-400 scale-105"
                    : ""
                }
                ${dragging === key ? "opacity-60" : "opacity-100"}
                bg-zinc-800 relative`}
              draggable
              onDragStart={() => setDragging(key)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(key);
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
                <span className="text-[10px] font-semibold text-cyan-200 capitalize">
                  {label}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocks((l) => ({ ...l, [key]: !l[key] }));
                    setFinalized(false);
                  }}
                  className={`ml-1 text-xs rounded-full p-1 ${
                    locks[key]
                      ? "bg-cyan-900 text-cyan-300"
                      : "bg-zinc-700 text-zinc-400"
                  }`}
                  aria-label={locks[key] ? `Unlock ${label}` : `Lock ${label}`}
                >
                  {locks[key] ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <Unlock className="w-3 h-3" />
                  )}
                </button>
              </div>
              <input
                type="color"
                value={colors[key as keyof typeof colors]}
                onChange={(e) => {
                  setColors((c) => ({ ...c, [key]: e.target.value }));
                  setFinalized(false);
                }}
                disabled={locks[key]}
                className="w-7 h-7 rounded shadow border-2 border-cyan-400 mb-1 cursor-pointer"
              />
              <span className="text-[10px] mt-1 text-cyan-300 font-mono">
                {colors[key as keyof typeof colors]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
