import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    // system preference fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="relative h-10 w-10 rounded-full border border-border bg-background/70 backdrop-blur flex items-center justify-center overflow-hidden group transition-colors hover:border-primary/60"
    >
      <Sun
        className="absolute h-5 w-5 text-amber-500 transition-all duration-500 group-active:scale-75 group-hover:rotate-12"
        style={{
          opacity: theme === "light" ? 1 : 0,
          transform: theme === "light" ? "scale(1) rotate(0deg)" : "scale(.4) rotate(-45deg)",
        }}
      />
      <Moon
        className="absolute h-5 w-5 text-indigo-300 transition-all duration-500 group-active:scale-75"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transform: theme === "dark" ? "scale(1) rotate(0deg)" : "scale(.4) rotate(45deg)",
        }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function HireMeButton() {
  return (
    <a
      href="mailto:me@abdulhajees.in?subject=Project%20Inquiry%20from%20Gallery"
      className="relative inline-flex items-center justify-center rounded-full px-5 h-10 text-sm font-medium bg-gradient-to-tr from-primary via-primary/80 to-primary/60 text-primary-foreground shadow hover:shadow-md transition-shadow group overflow-hidden"
    >
      <span className="relative z-10">Hire Me</span>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -inset-px rounded-full border border-white/20" />
    </a>
  );
}

export default function TopRightControls() {
  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex gap-3">
      <div className="pointer-events-auto flex gap-3">
        <ThemeToggle />
        <HireMeButton />
      </div>
    </div>
  );
}
