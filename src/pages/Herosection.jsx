// import { useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import HeroContent from "../components/HeroContent.jsx";
// import Particles from "../components/Particles.jsx";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useMotionValue } from "framer-motion";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const wrapperRef  = useRef(null); // tall scroll container (300vh)
//   const stickyRef   = useRef(null); // pinned 100vh viewport
//   const cardRef     = useRef(null); // dark rounded card
//   const headerRef   = useRef(null); // top nav
//   const footerRef   = useRef(null); // bottom bar
//   const contentRef  = useRef(null); // hero text inside card


//   const scrollProgress = useMotionValue(0);


//   useEffect(() => {
//     // Small guard — make sure refs mounted
//     if (!wrapperRef.current) return;

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: wrapperRef.current,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: 1.2,
//     pin: stickyRef.current,
//     pinSpacing: false,
//     anticipatePin: 1,

//     onUpdate: (self) => {
//       scrollProgress.set(self.progress); // 🔥 sync GSAP → Framer
//     },
//   },
// });

//       // 1. Card grows to fill the entire viewport
//       //    (starts inset with padding + radius, ends flush full-screen)
//       tl.to(
//         cardRef.current,
//         {
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           borderRadius: 0,
//           ease: "none",
//           duration: 1,
//         },
//         0
//       );

//       // 2. Header slides off the top
//       tl.to(
//         headerRef.current,
//         {
//           yPercent: -130,
//           opacity: 0,
//           ease: "none",
//           duration: 0.65,
//         },
//         0
//       );

//       // 3. Footer slides off the bottom
//       tl.to(
//         footerRef.current,
//         {
//           yPercent: 130,
//           opacity: 0,
//           ease: "none",
//           duration: 0.65,
//         },
//         0
//       );

//       // 4. Hero content fades in once card is mostly expanded
//       tl.fromTo(
//         contentRef.current,
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, ease: "none", duration: 0.45 },
//         0.4  // starts at 40% of the scroll progress
//       );
//     }, wrapperRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     /**
//      * wrapperRef: 300 vh gives the scroll runway.
//      * stickyRef: sticky 100 vh — GSAP pins this for the duration.
//      */
//     <div ref={wrapperRef} style={{ height: "300vh" }}>
//       <div
//         ref={stickyRef}
//         id="home"
//         className="sticky top-0 w-full overflow-hidden flex flex-col"
//         style={{ height: "100vh", background: "#e8e8f0" }}
//       >
//         {/* ── TOP NAV BAR ── */}
//         <header
//           ref={headerRef}
//           className="relative z-20 flex items-start justify-between px-6 md:px-8 pt-6 pb-0 flex-shrink-0"
//           style={{ willChange: "transform, opacity" }}
//         >
//           {/* Logo */}
//           <div
//             className="text-black font-black uppercase"
//             style={{
//               fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
//               letterSpacing: "-0.02em",
//               fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//             }}
//           >
//             PORTFOLIO
//           </div>

//           {/* Centre tagline */}
//           <div
//             className="hidden md:block text-black/80 max-w-sm text-left"
//             style={{
//               fontSize: "clamp(1.7rem, 1.7vw, 1.7rem)",
//               lineHeight: 1.25,
//               fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//             }}
//           >
//             We help brands create digital experiences
            
//             that connect with their audience
//           </div>

//           {/* Right nav buttons */}
//           <div className="flex items-center gap-2">
//             <button
//               className="flex items-center justify-center rounded-full border border-black/20 bg-white/60 backdrop-blur-sm text-black hover:bg-white transition-colors"
//               style={{ width: 40, height: 40, fontSize: "1.1rem", fontWeight: 700 }}
//             >
//               −
//             </button>
//             <button
//               className="flex items-center gap-2 rounded-full bg-black text-white font-semibold px-5 py-2 hover:bg-zinc-800 transition-colors"
//               style={{
//                 fontSize: "0.78rem",
//                 letterSpacing: "0.06em",
//                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//               }}
//             >
//               LET'S TALK
//               <span className="inline-block w-2 h-2 rounded-full bg-white/70 flex-shrink-0" />
//             </button>
//             <button
//               className="flex items-center gap-2 rounded-full border border-black/20 bg-white/60 backdrop-blur-sm text-black font-semibold px-5 py-2 hover:bg-white transition-colors"
//               style={{
//                 fontSize: "0.78rem",
//                 letterSpacing: "0.06em",
//                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//               }}
//             >
//               MENU
//               <span className="flex gap-0.5">
//                 <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
//                 <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
//                 <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
//               </span>
//             </button>
//           </div>
//         </header>

//         {/* ── HERO CARD ── */}
//         {/**
//          * Positioned absolutely so GSAP can freely animate
//          * top / left / right / bottom / borderRadius.
//          *
//          * Initial state matches the padded layout:
//          *   top  = 16px  (pt-4)
//          *   left = 24px  (px-6)
//          *   right= 24px
//          *   bottom = footer height ≈ 52px
//          */}
//         <div className="flex-1 relative" style={{ minHeight: 0 }}>
//           <motion.div
//             ref={cardRef}
//             className="overflow-hidden flex items-center justify-center"
//             style={{
//               position: "absolute",
//               top: 16,
//               left: 24,
//               right: 24,
//               bottom: 0,
//               borderRadius: "1rem",
//               background: "#0d0d14",
//               willChange: "top, left, right, bottom, border-radius",
//             }}
//             initial={{ opacity: 0, scale: 0.98 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           >
//             {/* Particles canvas */}
//             <div className="absolute inset-0 z-0 w-full">
//               <Particles />
//             </div>

//             {/* Hero text — hidden until card is mostly expanded */}
//             <div
//               ref={contentRef}
//               className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[400vh]"
//               style={{ opacity: 0 }}
//             >
//               <HeroContent
//               scrollProgress={scrollProgress}
//                 tagline="UI Systems · React Architecture · Motion Interfaces"
//                 typeStrings={[
//                   "Welcome to my portfolio!",
//                   "Let's build experiences together.",
//                   "From motion to architecture — I do it all.",
//                 ]}
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* ── BOTTOM SCROLL BAR ── */}
//         <footer
//           ref={footerRef}
//           className="relative z-20 flex items-center justify-between px-6 md:px-8 py-4 flex-shrink-0"
//           style={{ willChange: "transform, opacity" }}
//         >
//           {["＋", "＋", "SCROLL TO EXPLORE", "＋", "＋"].map((item, i) =>
//             item === "SCROLL TO EXPLORE" ? (
//               <span
//                 key={i}
//                 className="text-black/50 uppercase tracking-widest"
//                 style={{
//                   fontSize: "0.6rem",
//                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//                   letterSpacing: "0.18em",
//                 }}
//               >
//                 {item}
//               </span>
//             ) : (
//               <span key={i} className="text-black/40" style={{ fontSize: "0.85rem" }}>
//                 {item}
//               </span>
//             )
//           )}
//         </footer>
//       </div>
//     </div>
//   );
// }




// // 'use client';
// // import Paragraph from '../components/Paragraph Animation/Paragraph';
// // import Word from '../components/Paragraph Animation/Word';
// // import Character from '../components/Paragraph Animation/Character.jsx';

// // const paragraph = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

// // export default function Home() {

// //   const words = paragraph.split(" ")
// //   return (
// //     <main>
// //         <div style={{height: "100vh"}}></div>
// //         <Paragraph paragraph={paragraph}/>
// //         <div style={{height: "100vh"}}></div>
// //         <Word paragraph={paragraph}/>
// //         <div style={{height: "100vh"}}></div>
// //         <Character paragraph={paragraph} />
// //         <div style={{height: "100vh"}}></div>
// //     </main>
// //   )
// // }












import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import HeroContent from "../components/HeroContent.jsx";
import Particles from "../components/Particles.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const wrapperRef     = useRef(null);
  const stickyRef      = useRef(null);
  const cardRef        = useRef(null);
  const headerRef      = useRef(null);
  const footerRef      = useRef(null);
  const contentRef     = useRef(null);

  const scrollProgress = useMotionValue(0);

  // Measure header/footer heights after mount so the card's
  // initial inset matches the actual rendered layout.
  useEffect(() => {
    if (!wrapperRef.current) return;

    const header = headerRef.current;
    const footer = footerRef.current;
    const card   = cardRef.current;

    // Snapshot the natural heights once the browser has painted.
    const headerH = header.getBoundingClientRect().height;
    const footerH = footer.getBoundingClientRect().height;

    // Set the card's starting position to match the gap left by
    // header (top) and footer (bottom), with the same side padding.
    const PAD = 24; // px  — matches px-6
    gsap.set(card, {
      top:    headerH,
      left:   PAD,
      right:  PAD,
      bottom: footerH,
      borderRadius: "1rem",
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => scrollProgress.set(self.progress),
        },
      });

      // 1. Card expands to fill the entire sticky viewport
      tl.to(
        card,
        {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 0,
          ease: "none",
          duration: 1,
        },
        0
      );

      // 2. Header slides off the top
      tl.to(
        header,
        { yPercent: -130, opacity: 0, ease: "none", duration: 0.65 },
        0
      );

      // 3. Footer slides off the bottom
      tl.to(
        footer,
        { yPercent: 130, opacity: 0, ease: "none", duration: 0.65 },
        0
      );

      // 4. Hero content fades in once card is mostly expanded
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", duration: 0.45 },
        0.4
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <div
        ref={stickyRef}
        id="home"
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh", background: "#e8e8f0", position: "relative" }}
      >
        {/* ── TOP NAV BAR ── */}
        <header
          ref={headerRef}
          className="relative z-20 flex items-start justify-between px-6 md:px-8 pt-6 pb-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            className="text-black font-black uppercase"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              letterSpacing: "-0.02em",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            PORTFOLIO
          </div>

          <div
            className="hidden md:block text-black/80 max-w-sm text-left"
            style={{
              fontSize: "clamp(1.7rem, 1.7vw, 1.7rem)",
              lineHeight: 1.25,
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            We help brands create digital experiences
            that connect with their audience
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-full border border-black/20 bg-white/60 backdrop-blur-sm text-black hover:bg-white transition-colors"
              style={{ width: 40, height: 40, fontSize: "1.1rem", fontWeight: 700 }}
            >
              −
            </button>
            <button
              className="flex items-center gap-2 rounded-full bg-black text-white font-semibold px-5 py-2 hover:bg-zinc-800 transition-colors"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              LET'S TALK
              <span className="inline-block w-2 h-2 rounded-full bg-white/70 flex-shrink-0" />
            </button>
            <button
              className="flex items-center gap-2 rounded-full border border-black/20 bg-white/60 backdrop-blur-sm text-black font-semibold px-5 py-2 hover:bg-white transition-colors"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              MENU
              <span className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
                <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
                <span className="w-1 h-1 rounded-full bg-black/60 inline-block" />
              </span>
            </button>
          </div>
        </header>

        {/* ── HERO CARD ──
            Positioned absolutely relative to stickyRef (the full 100vh container),
            NOT inside the flex-1 middle child. GSAP animates it from the
            header/footer-inset position to 0,0,0,0 — full bleed. */}
        <motion.div
          ref={cardRef}
          className="overflow-hidden flex items-center justify-center"
          style={{
            position: "absolute",
            // Initial values are set by gsap.set() in useEffect after measuring.
            // These are just fallback defaults in case the effect hasn't run yet.
            top: 80,
            left: 24,
            right: 24,
            bottom: 52,
            borderRadius: "1rem",
            background: "#0d0d14",
            willChange: "top, left, right, bottom, border-radius",
            zIndex: 10,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 z-0 w-full">
            <Particles />
          </div>

          <div
            ref={contentRef}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: 0 }}
          >
            <HeroContent
              scrollProgress={scrollProgress}
              tagline="UI Systems · React Architecture · Motion Interfaces"
              typeStrings={[
                "Welcome to my portfolio!",
                "Let's build experiences together.",
                "From motion to architecture — I do it all.",
              ]}
            />
          </div>
        </motion.div>

        {/* ── BOTTOM SCROLL BAR ── */}
        <footer
          ref={footerRef}
          className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-8 py-4"
          style={{ willChange: "transform, opacity" }}
        >
          {["＋", "＋", "SCROLL TO EXPLORE", "＋", "＋"].map((item, i) =>
            item === "SCROLL TO EXPLORE" ? (
              <span
                key={i}
                className="text-black/50 uppercase tracking-widest"
                style={{
                  fontSize: "0.6rem",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "0.18em",
                }}
              >
                {item}
              </span>
            ) : (
              <span key={i} className="text-black/40" style={{ fontSize: "0.85rem" }}>
                {item}
              </span>
            )
          )}
        </footer>
      </div>
    </div>
  );
}