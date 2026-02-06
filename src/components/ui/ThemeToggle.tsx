"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-10 w-20 rounded-full border border-slate-300 bg-white/80 shadow-sm dark:border-slate-700 dark:bg-slate-900/60" />
    );

  const currentTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-20 items-center rounded-full border border-slate-300 bg-white/80 px-1 text-xs text-slate-700 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
      aria-label="Toggle dark mode"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow transition dark:bg-slate-950 dark:text-white ${
          currentTheme === "dark"
            ? "translate-x-10"
            : "translate-x-0 bg-white text-slate-900"
        }`}
      />
      <span className="z-10 mr-8">
        {currentTheme === "dark" ? "dark Icon" : "Light Icon"}
      </span>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
