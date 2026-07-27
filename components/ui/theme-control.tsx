"use client";

import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "./theme-toggle";

export function ThemeControl() {
  const { darkMode, toggleTheme } = useTheme();
  return <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />;
}
