"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={label}
      className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
