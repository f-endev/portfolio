import { useEffect, useRef } from "react";

/**
 * ScrambleText
 *
 * Props:
 *  text      — the string to reveal
 *  className — Tailwind/CSS classes for styling
 *  delay     — ms before scramble starts (default 0)
 *  speed     — how fast characters reveal (default 0.6, higher = faster)
 */
export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  speed = 0.6,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";
    let iterations = 0;
    let iv;

    const start = () => {
      iv = setInterval(() => {
        el.textContent = text
          .split("")
          .map((char, i) => {
            if (i < iterations)               return text[i];
            if (char === " " || char === "·") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        iterations += speed;
        if (iterations >= text.length) clearInterval(iv);
      }, 32);
    };

    const timeout = setTimeout(start, delay);
    return () => { clearTimeout(timeout); clearInterval(iv); };
  }, [text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}