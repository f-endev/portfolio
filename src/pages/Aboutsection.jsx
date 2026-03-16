import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const traits = [
  { label: "Scalable Component Systems", icon: "⬡" },
  { label: "Reusable Hook Architecture", icon: "⬡" },
  { label: "Complex State Debugging", icon: "⬡" },
  { label: "Motion & Micro-interactions", icon: "⬡" },
];

export default function AboutSection() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP: Draw the vertical accent line on scroll
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
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
        01 / About
      </motion.p>

      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tight"
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
        About Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Text block with vertical accent */}
        <div className="relative pl-8">
          {/* GSAP animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent"
          />

          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            I am a frontend developer who believes that{" "}
            <span className="text-indigo-300 font-semibold">
              great interfaces are engineered
            </span>{" "}
            — not just designed.
          </motion.p>

          <motion.p
            className="text-gray-400 text-base leading-relaxed mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Over the past year, I've built production-level React applications
            handling full lifecycle development — from UI design and reusable
            component architecture to API integration, custom hooks, and
            performance optimization.
          </motion.p>

          <motion.p
            className="text-gray-400 text-base leading-relaxed mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I enjoy solving real-world frontend challenges:
          </motion.p>

          <motion.div
            className="space-y-3 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {traits.map((t, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 text-gray-300 text-sm"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                <span className="text-indigo-400 text-base">{t.icon}</span>
                {t.label}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-indigo-300 font-semibold text-base italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            "Build frontend systems that are clean, maintainable, and
            future-ready."
          </motion.p>
        </div>

        {/* Right: Stats / identity cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "1+", label: "Year Professional Experience" },
            { value: "10+", label: "Production Modules Built" },
            { value: "React", label: "Primary Stack" },
            { value: "GSAP", label: "Animation Engine" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-indigo-400/40 transition-all duration-300 hover:bg-indigo-950/50"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <p
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #fff, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}