import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText.jsx";
import TextType from "./TextType";
import ScrollRevealText from "./ScrollRevealText.jsx";
// import Particles from "./Particles";

/**
 * HeroContent
 *
 * Props:
 *  headline     — main h1 string
 *  tagline      — mono scramble line below headline
 *  typeStrings  — array of strings for the TextType cycling text
 */
export default function HeroContent({
  tagline,
  typeStrings,
  scrollProgress,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute w-full flex flex-col gap-4 items-center"
      style={{ zIndex: 10 }}
    >
      {/* Headline */}
       {/* <motion.h1
        className="flex items-centertext-[26px] md:text-[30px] lg:text-[34px] text-left font-thin leading-tight tracking-tight text-center w-[500px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.1 }}
      >
        <span
          style={{
            background:
              "linear-gradient(150deg, #020c4d 0%, #525778 40%, #080c2b 70%, #0b0d1c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          I help brands create digital experiences that connect with their audience
        </span>
      </motion.h1> */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <ScrollRevealText
  text="I help brands create digital experiences that connect with their audience"
  progress={scrollProgress}
  className="text-[26px] md:text-[30px] lg:text-[34px] font-thin leading-tight tracking-tight text-center w-[500px]"
/>
</motion.div>

      {/* Tagline scramble */}
      <div className="flex justify-start w-full pt-10">
      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      >
        <ScrambleText
          text={tagline}
          className="font-mono text-[11px] md:text-xs text-indigo-400/80 tracking-[0.3em] uppercase"
          delay={850}
        />
      </motion.p> */}
</div>
      {/* Typewriter */}
        {/* <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative w-full h-[320px] w-full md:h-[420px] lg:h-[500px] bg-black rounded-[20px] overflow-hidden flex justify-center items-center"
        >
            <Particles />
            <div
                className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 relative z-10 text-center px-6"
                style={{ minHeight: "2.5rem", position: "absolute", top: "47%", left: "28%"}}
            >
                <TextType
                text={typeStrings}
                typingSpeed={70}
                pauseDuration={1600}
                showCursor={true}
                cursorCharacter="|"
                />
            </div>
        </motion.div> */}

        {/* <motion.div
        className="relative flex items-center justify-center gap-4 w-full"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-indigo-400/70 text-base">✦</span>
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">scroll</span>
        <span className="text-indigo-400/70 text-base">✦</span>
      </motion.div> */}

      {/* Decorative rule */}
      {/* <motion.div
        className="w-full h-px mt-8"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 40%, rgba(139,92,246,0.2) 70%, transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2, ease: "easeInOut" }}
      /> */}
    </motion.div>
  );
}