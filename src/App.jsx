// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "./components/CountUp";
import A_Main from "./A_main";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .count-up-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 22vw, 280px);
          line-height: 0.85;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .count-up-text span {
          font-family: inherit;
        }

        .loader-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(13px, 1.5vw, 18px);
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .percent-sign {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 7vw, 100px);
          color: rgba(255,255,255,0.35);
          line-height: 0.85;
          align-self: flex-end;
          padding-bottom: 0.08em;
          margin-left: 6px;
        }
      `}</style>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {/* Bottom-left number block */}
            <div
              style={{
                position: 'absolute',
                bottom: '6vh',
                left: '5vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div className="loader-label">Loading</div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <CountUp
                  from={0}
                  to={100}
                  separator=""
                  direction="up"
                  duration={1.8}
                  delay={0.1}
                  className="count-up-text"
                />
                <span className="percent-sign">%</span>
              </div>
            </div>

            {/* Subtle progress bar at very bottom */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '2px',
                background: 'rgba(255,255,255,0.6)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <A_Main />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}