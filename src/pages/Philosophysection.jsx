import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Reusability over Repetition",
    desc: "Every component is built to be consumed more than once. I design with abstraction in mind — if I'm writing the same logic twice, something's wrong with the architecture.",
    accent: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    number: "02",
    title: "Structure over Shortcuts",
    desc: "Fast code that breaks is slower than thoughtful code that scales. I invest in folder structure, naming conventions, and hook design before touching the first pixel.",
    accent: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    number: "03",
    title: "UX Clarity over Visual Clutter",
    desc: "A great interface disappears — the user never notices it because it just works. I cut anything that doesn't guide the user toward their goal.",
    accent: "from-sky-500 to-indigo-500",
    glow: "rgba(14,165,233,0.15)",
  },
];

export default function PhilosophySection() {
  const sectionRef  = useRef(null);
  const quoteRef    = useRef(null);
  const lineRef     = useRef(null);

  useEffect(() => {
    // Animate the vertical line downward
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.6, ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
        }
      );
    }

    // Cards stagger in from the right
    ScrollTrigger.batch(".philosophy-card", {
      onEnter: (els) =>
        gsap.fromTo(els,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.75, stagger: 0.15, ease: "power3.out" }
        ),
      start: "top 85%",
      once: true,
    });

    // Quote word-by-word reveal
    if (quoteRef.current) {
      const words = quoteRef.current.querySelectorAll(".word");
      gsap.fromTo(words,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  const quoteText = "Clean code isn't a preference — it's the foundation every scalable product is built on.";

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative z-10 py-28 px-6 max-w-6xl mx-auto"
    >
      {/* Section label */}
      <motion.p
        className="text-xs font-mono tracking-[0.4em] text-indigo-500 uppercase mb-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        04 / Philosophy
      </motion.p>

      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tight"
        style={{
          background: "linear-gradient(135deg, #fff 30%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        My Engineering Philosophy
      </motion.h2>

      <motion.p
        className="text-gray-500 text-center text-sm max-w-xl mx-auto mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        I approach frontend development as system design — not just UI assembly.
      </motion.p>

      {/* Main layout: left label column + right cards */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">

        {/* Left: sticky label + vertical line */}
        <div className="relative hidden md:flex flex-col items-start pt-2">
          <div
            ref={lineRef}
            className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent"
          />
          <div className="relative z-10 flex flex-col gap-10 pl-8">
            <div>
              <p className="text-white font-black text-lg leading-snug">
                Three principles I never compromise on.
              </p>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                These aren't guidelines I follow when convenient — they're the
                lens through which every line of code gets evaluated.
              </p>
            </div>
            {/* Mini code block decoration */}
            <div className="rounded-xl border border-indigo-500/15 bg-indigo-950/30 p-4 font-mono text-xs text-indigo-300/70 leading-relaxed">
              <span className="text-indigo-500">const</span>{" "}
              <span className="text-white">engineer</span> = {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-violet-400">mindset</span>:{" "}
              <span className="text-emerald-400">"systems"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-violet-400">output</span>:{" "}
              <span className="text-emerald-400">"scalable"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-violet-400">shortcuts</span>:{" "}
              <span className="text-red-400">false</span>,
              <br />
              {"}"}<span className="text-gray-600">;</span>
            </div>
          </div>
        </div>

        {/* Right: principle cards */}
        <div className="flex flex-col gap-5">
          {principles.map((p, i) => (
            <div
              key={i}
              className="philosophy-card opacity-0 group relative rounded-2xl border border-white/[0.07]
                bg-white/[0.02] backdrop-blur-sm p-6 overflow-hidden
                hover:border-indigo-500/30 transition-all duration-400 cursor-default"
              style={{
                boxShadow: `inset 0 0 0 0 ${p.glow}`,
                transition: "border-color 0.3s, box-shadow 0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `inset 0 0 60px ${p.glow}, 0 0 30px ${p.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `inset 0 0 0px ${p.glow}`;
              }}
            >
              {/* Top row */}
              <div className="flex items-center gap-4 mb-3">
                {/* Number badge */}
                <span
                  className={`text-xs font-black font-mono px-2.5 py-1 rounded-lg
                    bg-gradient-to-r ${p.accent} text-white/90 tracking-widest shrink-0`}
                >
                  {p.number}
                </span>
                <h4 className="text-white font-bold text-base tracking-tight">
                  {p.title}
                </h4>
              </div>

              {/* Gradient line under title */}
              <div className={`h-[1px] w-16 bg-gradient-to-r ${p.accent} rounded-full mb-4 opacity-60
                group-hover:w-full transition-all duration-500`}
              />

              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <div
        ref={quoteRef}
        className="mt-20 mx-auto max-w-2xl text-center"
      >
        <div className="inline-block text-xl md:text-2xl font-black tracking-tight leading-snug"
          style={{
            background: "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 60%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {quoteText.split(" ").map((word, i) => (
            <span key={i} className="word inline-block opacity-0 mr-[0.3em]">
              {word}
            </span>
          ))}
        </div>
        <motion.p
          className="text-gray-600 text-xs font-mono tracking-widest mt-4 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          — Kushal Nankani
        </motion.p>
      </div>
    </section>
  );
}