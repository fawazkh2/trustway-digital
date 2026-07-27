"use client";

import { Icon } from "./icon";

export function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return <button type="button" className="ui-theme-toggle" onClick={onToggle} aria-label={darkMode ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}><Icon name={darkMode ? "moon" : "sun"} size={15} /></button>;
}
