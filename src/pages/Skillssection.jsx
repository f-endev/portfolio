import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coreSkills = [
  {
    icon: "⬡",
    title: "React Architecture",
    desc: "Modular components, reusable patterns, custom hooks",
    color: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/30",
    accent: "text-indigo-400",
  },
  {
    icon: "◈",
    title: "State Management",
    desc: "Controlled components, async data handling, lifecycle optimization",
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
    accent: "text-violet-400",
  },
  {
    icon: "◇",
    title: "UI Engineering",
    desc: "Tailwind CSS, responsive systems, design-to-code precision",
    color: "from-sky-500/20 to-sky-600/5",
    border: "border-sky-500/30",
    accent: "text-sky-400",
  },
  {
    icon: "⬙",
    title: "API Integration",
    desc: "REST APIs, Axios, error handling, loading states",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
  },
  {
    icon: "◈",
    title: "Motion & Interaction",
    desc: "Framer Motion, GSAP, WebGL particle systems",
    color: "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/30",
    accent: "text-pink-400",
  },
  {
    icon: "⬡",
    title: "Performance Optimization",
    desc: "Memoization, re-render reduction, component refactoring",
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
    accent: "text-amber-400",
  },
];

const techBadges = [
  "React.js", "JavaScript (ES6+)", "HTML5", "CSS3",
  "Tailwind CSS", "Bootstrap", "GSAP", "Framer Motion",
  "Axios", "REST APIs", "Git / GitHub", "Bitbucket",
  "Responsive Design", "SOLID Principles", "Custom Hooks",
];

export default function SkillsSection() {
  const barRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP: stagger animate the skill cards border glow on scroll
    ScrollTrigger.batch(".skill-card", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      },
      start: "top 85%",
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 py-28 px-6 max-w-6xl mx-auto"
    >
      {/* Label */}
      <motion.p
        className="text-xs font-mono tracking-[0.4em] text-indigo-500 uppercase mb-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        02 / Skills
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
        Core Expertise
      </motion.h2>

      <motion.p
        className="text-gray-500 text-center mb-16 max-w-xl mx-auto text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Technologies and disciplines I use to build production-grade frontend systems.
      </motion.p>

      {/* Core skill cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {coreSkills.map((skill, i) => (
          <div
            key={i}
            className={`skill-card opacity-0 rounded-2xl border ${skill.border} bg-gradient-to-br ${skill.color} backdrop-blur-sm p-6 hover:scale-[1.02] transition-all duration-300 cursor-default`}
          >
            <div className={`text-2xl mb-3 ${skill.accent}`}>{skill.icon}</div>
            <h4 className="text-white font-bold text-base mb-2">{skill.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs font-mono tracking-[0.3em] text-gray-600 uppercase mb-6">
          Technologies
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {techBadges.map((badge, i) => (
            <motion.span
              key={i}
              className="bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-default"
              whileHover={{ scale: 1.08, borderColor: "rgba(99,102,241,0.6)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}