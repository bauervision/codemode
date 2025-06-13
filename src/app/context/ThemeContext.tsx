// src/context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ColorRoles } from "../types";
import { generateRandomPalette } from "../utils/color";

const defaultColors: ColorRoles = {
  primary: "#06b6d4",
  secondary: "#64748b",
  accent: "#eab308",
  background: "#f1f5f9",
  surface: "#ffffff",
  text: "#222222",
};

const defaultLocks = {
  primary: false,
  secondary: false,
  accent: false,
  background: false,
  surface: false,
  text: false,
};

interface ThemeContextType {
  colors: ColorRoles;
  setColors: React.Dispatch<React.SetStateAction<ColorRoles>>;
  locks: Record<string, boolean>;
  setLocks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  finalized: boolean;
  setFinalized: (val: boolean) => void;
  randomizeColors: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ColorRoles>(defaultColors);
  const [locks, setLocks] = useState<Record<string, boolean>>(defaultLocks);
  const [finalized, setFinalized] = useState(false);

  function randomizeColors() {
    setColors((old) => {
      // Lock support: only randomize unlocked!
      const randoms = generateRandomPalette();
      const next: ColorRoles = { ...old };
      (Object.keys(randoms) as (keyof ColorRoles)[]).forEach((key) => {
        if (!locks[key]) next[key] = randoms[key];
      });
      return next;
    });
    setFinalized(false);
  }

  return (
    <ThemeContext.Provider
      value={{
        colors,
        setColors,
        locks,
        setLocks,
        finalized,
        setFinalized,
        randomizeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}
