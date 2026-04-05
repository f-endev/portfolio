"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// export default function ScrollRevealText({ text, className, progress }) {
//   const container = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start 0.9", "start 0.3"], // tweak for feel
//   });

//   const words = text.split(" ");

//   return (
//     <p
//       ref={container}
//       className={`flex flex-wrap justify-center ${className}`}
//     >
//       {words.map((word, i) => {
//         const start = i / words.length;
//         const end = start + 1 / words.length;

//         return (
//           <Word key={i} progress={scrollYProgress} range={[start, end]}>
//             {word}
//           </Word>
//         );
//       })}
//     </p>
//   );
// }

export default function ScrollRevealText({ text, className, progress }) {
  const words = text.split(" ");

  return (
    <p className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}


const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]); // 🔥 premium touch

  return (
    <span className="relative mr-2 mt-2">
      {/* shadow layer */}
      <span className="absolute opacity-20">{children}</span>

      {/* animated layer */}
      <motion.span
        style={{
          opacity,
          filter: `blur(${blur}px)`,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};