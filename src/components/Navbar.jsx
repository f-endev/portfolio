import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { name: "About",    href: "#about"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [active, setActive]     = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Darken navbar background after scrolling 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleClick = (href) => {
    setActive(href.slice(1));
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-2xl
          flex items-center justify-between px-5 py-3 transition-all duration-500
          ${scrolled
            ? "bg-[#06060f]/90 border border-indigo-500/20 shadow-[0_8px_40px_rgba(99,102,241,0.12)] backdrop-blur-xl"
            : "bg-[#06060f]/60 border border-white/5 backdrop-blur-md"
          }`}
      >
        {/* ── Logo / Brand ── */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          onClick={() => setActive("")}
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-xs font-black tracking-tighter group-hover:bg-indigo-600/50 transition-all duration-200">
            KN
          </span>
          <span className="hidden sm:block text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200 tracking-wide">
            Kushal<span className="text-indigo-400">.</span>
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-2 py-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleClick(link.href)}
                className="relative px-4 py-1.5 text-sm rounded-lg transition-colors duration-200 font-medium"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-indigo-600/25 border border-indigo-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-indigo-300" : "text-gray-400 hover:text-gray-200"}`}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* ── Right: Socials + CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://linkedin.com/in/kushal-nankani/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all duration-200"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="https://github.com/kushalnankani"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <FaGithub size={16} />
          </a>

          <a
            href="/Kushal_Nankani_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.03]"
          >
            Resume
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </motion.nav>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl
              bg-[#06060f]/95 border border-indigo-500/20 backdrop-blur-xl rounded-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${active === link.href.slice(1)
                      ? "text-indigo-300 bg-indigo-600/20 border border-indigo-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile socials + CTA */}
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com/in/kushal-nankani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-sky-400 hover:bg-sky-400/10 transition-all"
                  >
                    <FaLinkedin size={17} />
                  </a>
                  <a
                    href="https://github.com/kushalnankani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <FaGithub size={17} />
                  </a>
                </div>
                <a
                  href="/Kushal_Nankani_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}