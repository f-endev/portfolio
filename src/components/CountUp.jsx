import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

// Individual digit that animates upward on change
function AnimatedDigit({ digit }) {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [prevDigit, setPrevDigit] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (digit !== displayDigit) {
      setPrevDigit(displayDigit);
      setAnimating(true);
      // After animation, finalize
      const t = setTimeout(() => {
        setDisplayDigit(digit);
        setPrevDigit(null);
        setAnimating(false);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [digit]);

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: '1.1em',
        verticalAlign: 'bottom',
      }}
    >
      {/* Previous digit slides out upward */}
      {animating && prevDigit !== null && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            animation: 'digitSlideOut 0.18s cubic-bezier(0.4,0,0.2,1) forwards',
          }}
        >
          {prevDigit}
        </span>
      )}
      {/* New digit slides in from below */}
      <span
        style={{
          display: 'block',
          animation: animating
            ? 'digitSlideIn 0.18s cubic-bezier(0.4,0,0.2,1) forwards'
            : 'none',
        }}
      >
        {displayDigit}
      </span>
    </span>
  );
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const [displayValue, setDisplayValue] = useState(
    direction === 'down' ? to : from
  );

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart();
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);
      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === 'function') onEnd();
      }, delay * 1000 + duration * 1000);
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  // Split number into individual characters for per-digit animation
  const formatted = separator
    ? displayValue.toLocaleString('en-US').replace(/,/g, separator)
    : String(displayValue);

  const chars = formatted.split('');

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes digitSlideOut {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: translateY(-110%); opacity: 0; }
        }
        @keyframes digitSlideIn {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <span ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'flex-end' }}>
        {chars.map((char, i) =>
          /\d/.test(char) ? (
            <AnimatedDigit key={i} digit={char} />
          ) : (
            <span key={i} style={{ display: 'inline-block' }}>{char}</span>
          )
        )}
      </span>
    </>
  );
}