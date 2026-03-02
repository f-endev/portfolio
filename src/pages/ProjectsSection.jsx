import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contributions = [
  "Designed reusable DataTable components with dynamic sorting and filtering",
  "Built document upload, download, and deletion flows",
  "Developed driver photo upload with preview and API sync",
  "Created shared hooks for business logic abstraction",
  "Integrated REST APIs and handled async data states",
  "Debugged UI-API mapping inconsistencies",
  "Implemented loading, error, and toast feedback systems",
];

const impacts = [
  "Reduced repetitive code using modular component design",
  "Improved UI consistency across multiple modules",
  "Enhanced maintainability through structured architecture",
];

const tags = ["React.js", "Axios", "REST APIs", "Custom Hooks", "Tailwind CSS", "GSAP"];

export default function ProjectsSection() {
  const cardRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // GSAP: Card slides up with a nice ease on scroll
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // GSAP: Progress bars animate in
    const bars = progressRef.current?.querySelectorAll(".impact-bar");
    if (bars) {
      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="projects" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
      {/* Label */}
      <motion.p
        className="text-xs font-mono tracking-[0.4em] text-indigo-500 uppercase mb-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        03 / Projects
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
        Featured Work
      </motion.h2>

      <motion.p
        className="text-gray-500 text-center mb-16 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Production-level work built at IMS Nucleii
      </motion.p>

      {/* Project card */}
      <div
        ref={cardRef}
        className="opacity-0 rounded-3xl border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-sm overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Card header */}
        <div className="border-b border-indigo-500/15 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-indigo-500 tracking-widest uppercase mb-1">
              Production Project
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Transport Management System
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              React · IMS Nucleii · 2024–Present
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border border-indigo-500/25 text-indigo-300 bg-indigo-950/40"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card body */}
        <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-indigo-500/10">
          {/* Contributions */}
          <div className="p-8">
            <p className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-6">
              My Contributions
            </p>
            <ul className="space-y-3">
              {contributions.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <span className="mt-1 text-indigo-500 text-xs shrink-0">▸</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="p-8" ref={progressRef}>
            <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-6">
              Impact
            </p>
            <div className="space-y-6 mb-10">
              {impacts.map((item, i) => (
                <div key={i}>
                  <p className="text-gray-300 text-sm mb-2">{item}</p>
                  <div className="h-[2px] bg-indigo-950/60 rounded-full overflow-hidden">
                    <div
                      className="impact-bar h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-xl border border-indigo-500/15 bg-indigo-950/30 p-5">
              <p className="text-gray-400 text-sm leading-relaxed">
                A production-scale React application designed to manage drivers,
                vendors, documents, routes, and operational workflows — built for
                real-world complexity and maintainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}