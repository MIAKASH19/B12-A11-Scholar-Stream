import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle Dark Mode"
      className="relative w-16 h-8 rounded-full
        bg-zinc-800 dark:bg-zinc-200
        flex items-center px-1 transition-colors duration-300"
    >
      {/* Icons */}
      <div className="flex w-full justify-between items-center px-1 text-sm z-0">
        <FiMoon
          className={`transition-all duration-300
            ${dark
              ? "text-zinc-900 opacity-100"
              : "text-white opacity-100"
            }`}
        />
        <FiSun
          className={`transition-all duration-300
            ${dark
              ? "text-red-900 opacity-100"
              : "text-white opacity-100"
            }`}
        />
      </div>

      {/* Toggle Knob */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full
          bg-white dark:bg-zinc-800
          shadow-md z-10
          transform transition-transform duration-300
          ${dark ? "translate-x-8" : "translate-x-0"}`}
      />
    </button>
  );
};

export default DarkModeToggle;
