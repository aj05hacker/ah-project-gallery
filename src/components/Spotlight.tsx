import { useEffect, useRef } from "react";

// Subtle pointer-following spotlight gradient
// Uses CSS variables --spot-x and --spot-y defined in index.css
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      ref.current.style.setProperty("--spot-x", x);
      ref.current.style.setProperty("--spot-y", y);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-90"
      style={{
        background:
          "radial-gradient(600px circle at var(--spot-x) var(--spot-y), hsl(var(--brand) / 0.15), transparent 80%)",
      }}
    />
  );
}
