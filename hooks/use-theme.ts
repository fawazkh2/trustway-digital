"use client";

import { useSyncExternalStore } from "react";

const themeChangeEvent = "trustway-theme-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => window.removeEventListener(themeChangeEvent, onStoreChange);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function useTheme() {
  const darkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggleTheme = () => {
    const nextTheme = !darkMode;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("trustway-theme", nextTheme ? "dark" : "light");
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return { darkMode, toggleTheme };
}
