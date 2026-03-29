import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // For initial render, if theme is 'system', we'll default to dark visually 
  // until the component mounts, but `theme` from context is enough here.
  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="relative inline-flex items-center rounded-full bg-slate-200 dark:bg-white/10 p-1">
      <button
        onClick={() => setTheme("light")}
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          !isDark ? "text-slate-900" : "text-gray-400 hover:text-white"
        }`}
        aria-label="Light mode"
      >
        <Sun size={14} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          isDark ? "text-white" : "text-slate-500 hover:text-slate-900"
        }`}
        aria-label="Dark mode"
      >
        <Moon size={14} />
      </button>
      <div
        className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white dark:bg-slate-800 shadow-sm transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </div>
  )
}
