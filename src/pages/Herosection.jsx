import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import TextType from "../components/TextType";

export default function HeroSection() {
  const taglineRef = useRef(null);
  const glowRef    = useRef(null);
  const glow2Ref   = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    // Grid lines draw in
    const lines = gridRef.current?.querySelectorAll(".grid-line");
    if (lines?.length) {
      gsap.fromTo(lines,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.06, duration: 2.5, stagger: 0.1,
          ease: "power3.inOut", transformOrigin: "left center" }
      );
    }

    // Primary glow float
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        y: -32, x: 16, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }

    // Secondary glow float (opposite direction)
    if (glow2Ref.current) {
      gsap.to(glow2Ref.current, {
        y: 24, x: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
        delay: 1.5,
      });
    }

    // Scramble tagline
    const el = taglineRef.current;
    if (el) {
      const chars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";
      const original = el.textContent;
      let iterations = 0;
      const iv = setInterval(() => {
        el.textContent = original
          .split("")
          .map((char, i) => {
            if (i < iterations) return original[i];
            if (char === " " || char === "·") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        iterations += 0.6;
        if (iterations >= original.length) clearInterval(iv);
      }, 32);
      return () => clearInterval(iv);
    }
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Primary glow (indigo, top-center) ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.1) 50%, transparent 72%)",
          filter: "blur(48px)",
        }}
      />

      {/* ── Secondary glow (violet, bottom-right) ── */}
      <div
        ref={glow2Ref}
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", right: "10%",
          width: 380, height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
      />

      {/* ── Horizontal grid lines ── */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="grid-line absolute left-0 right-0 border-t border-indigo-300/50"
            style={{ top: `${8 + i * 8}%`, opacity: 0 }}
          />
        ))}
      </div>

      {/* ── Corner brackets ── */}
      {[
        "top-6 left-6 border-t-2 border-l-2",
        "top-6 right-6 border-t-2 border-r-2",
        "bottom-6 left-6 border-b-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 ${cls} border-indigo-500/30 pointer-events-none`} />
      ))}

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-28 pb-16"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full
            border border-indigo-500/30 bg-indigo-950/50 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-indigo-300 tracking-[0.25em] uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          className="text-sm md:text-base font-mono text-indigo-400/80 tracking-[0.35em] uppercase mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.7 }}
        >
          Kushal Nankani
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="pb-2 text-[clamp(3rem,9vw,6rem)] font-black mb-4 leading-[1.02] tracking-tight"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            background:
              "linear-gradient(150deg, #ffffff 0%, #e0e7ff 35%, #a5b4fc 65%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Design-Driven
          <br />
          Frontend Engineer
        </motion.h1>

        {/* Scramble tagline */}
        <motion.p
          ref={taglineRef}
          className="font-mono text-[11px] md:text-xs text-indigo-400/60 tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          UI Systems · React Architecture · Motion Interfaces
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-8 text-lg md:text-xl text-indigo-300/90 font-light min-h-[2rem]"
        >
          <TextType
            text={[
              "Welcome to my portfolio!",
              "Let's build amazing experiences together.",
              "From motion to architecture — I do it all.",
            ]}
            typingSpeed={70}
            pauseDuration={1600}
            showCursor={true}
            cursorCharacter="|"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl text-gray-400 text-base md:text-lg mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          I craft scalable React applications that blend design precision with
          engineering discipline. From motion-driven interfaces to
          API-integrated systems — I build experiences that are not just
          beautiful, but{" "}
          <span className="text-indigo-300 font-medium">
            structured, performant, and production-ready.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-3 rounded-full
              bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm
              tracking-wide transition-all duration-300 hover:scale-105
              hover:shadow-[0_0_32px_rgba(99,102,241,0.55)]"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="/Kushal_Nankani_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3 rounded-full
              border border-indigo-500/40 text-indigo-300 hover:border-indigo-400
              hover:text-white text-sm font-semibold tracking-wide
              transition-all duration-300 hover:scale-105 hover:bg-indigo-600/10 backdrop-blur-sm"
          >
            Download CV
          </a>

          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3 rounded-full
              border border-white/10 text-gray-400 hover:text-white hover:border-white/25
              text-sm font-semibold tracking-wide transition-all duration-300
              hover:scale-105 backdrop-blur-sm"
          >
            View Projects
          </a>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/5 w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {[
            { value: "1+",     label: "Year Experience" },
            { value: "10+",    label: "Modules Shipped" },
            { value: "React",  label: "Primary Stack"   },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="text-[11px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-1.5 opacity-40"
        >
          <span className="text-[9px] font-mono tracking-[0.4em] text-gray-500 uppercase">
            scroll
          </span>
          <ChevronDown className="w-5 h-5 text-indigo-400 animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  );
}