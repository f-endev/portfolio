import React from "react";
import { motion } from "framer-motion";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/Herosection";       // ← use the upgraded hero
import AboutSection from "./pages/Aboutsection";
import SkillsSection from "./pages/Skillssection";
import ProjectsSection from "./pages/ProjectsSection";
import ConnectSection from "./pages/Connectsection";
import PhilosophySection from "./pages/Philosophysection";

export default function A_Main() {
  return (
    /**
     * IMPORTANT — Particles mouse interaction fix:
     * The Particles canvas must sit at z-0 with pointer-events-auto
     * and the content layers above it must use pointer-events-none on
     * the wrapper BUT pointer-events-auto on interactive children.
     * The `fixed inset-0` keeps particles behind everything while
     * still receiving mouse events from the browser (they aren't
     * blocked because the canvas itself has no pointer-events restriction).
     */
    <section className="relative min-h-screen text-gray-100 overflow-hidden bg-[#080810]">
      {/* ── Sticky Particle Background ── */}
      {/* pointer-events-none removed from this div so canvas receives mouse events */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      {/* ── Navbar ── */}
      <div className="relative z-20 flex justify-center">
        <Navbar />
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── About ── */}
      <div className="relative z-10">
        <AboutSection />
      </div>

      <SectionDivider />

      {/* ── Skills ── */}
      <div className="relative z-10">
        <SkillsSection />
      </div>

      <SectionDivider />

      {/* ── Projects ── */}
      <div className="relative z-10">
        <ProjectsSection />
      </div>

      <SectionDivider />

      {/* ── Engineering Philosophy ── */}
      <div className="relative z-10">
        <PhilosophySection />
      </div>

      <SectionDivider />

      {/* ── Connect / Social ── */}
      <div className="relative z-10">
        <ConnectSection />
      </div>
    </section>
  );
}

/** Thin gradient divider between sections */
function SectionDivider() {
  return (
    <div className="relative z-10 flex items-center justify-center py-2 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </div>
  );
}