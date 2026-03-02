import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: "LinkedIn",
    handle: "kushal-nankani",
    href: "https://linkedin.com/in/kushal-nankani/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "text-sky-400",
    border: "border-sky-500/25 hover:border-sky-400/50",
    bg: "hover:bg-sky-950/30",
    desc: "Professional profile & career updates",
  },
  {
    name: "GitHub",
    handle: "kushalnankani",
    href: "https://github.com/kushalnankani",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "text-gray-300",
    border: "border-gray-500/25 hover:border-gray-400/50",
    bg: "hover:bg-gray-900/30",
    desc: "Open source projects & code portfolio",
  },
];

export default function ConnectSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".connect-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 py-28 px-6 max-w-6xl mx-auto text-center"
    >
      {/* Label */}
      <motion.p
        className="text-xs font-mono tracking-[0.4em] text-indigo-500 uppercase mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        04 / Connect
      </motion.p>

      <motion.h2
        className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
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
        Let's Work Together
      </motion.h2>

      <motion.p
        className="text-gray-400 max-w-lg mx-auto mb-16 text-base leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        I'm open to frontend engineering roles, freelance projects, or just a
        good conversation about building great interfaces.
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`connect-card opacity-0 group flex items-center gap-5 p-6 rounded-2xl border ${s.border} ${s.bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] text-left min-w-[260px]`}
          >
            <span className={`${s.color} transition-transform group-hover:scale-110 duration-200`}>
              {s.icon}
            </span>
            <div>
              <p className="text-white font-bold text-base">{s.name}</p>
              <p className="text-gray-500 text-xs font-mono">@{s.handle}</p>
              <p className="text-gray-400 text-xs mt-1">{s.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Footer line */}
      <motion.div
        className="border-t border-white/5 pt-10 text-gray-600 text-xs font-mono tracking-widest"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        KUSHAL NANKANI · FRONTEND ENGINEER · {new Date().getFullYear()}
      </motion.div>
    </section>
  );
}