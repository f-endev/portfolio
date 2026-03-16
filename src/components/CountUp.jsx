import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

// Individual digit that animates upward on change
function AnimatedDigit({ digit, index = 0 }) {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [prevDigit, setPrevDigit] = useState(null);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (digit !== displayDigit) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setPrevDigit(displayDigit);
      setAnimating(true);

      timeoutRef.current = setTimeout(() => {
        setDisplayDigit(digit);
        setPrevDigit(null);
        setAnimating(false);
      }, 250);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [digit]);

  // Stagger delay per digit position so numbers "ripple" right-to-left
  const staggerDelay = `${index * 18}ms`;

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: '1em',
        lineHeight: '1em',
        verticalAlign: 'baseline',
      }}
    >
      {/* Previous digit slides out upward */}
      {animating && prevDigit !== null && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            animation: `digitSlideOut 0.35s cubic-bezier(0.16,1,0.3,1) ${staggerDelay} forwards`,
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
            ? `digitSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) ${staggerDelay} forwards`
            : 'none',
          ...(animating && { opacity: 0 }),
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

  const damping = 10 + 10 * (1 / duration);
  const stiffness = 50 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
    // Fine-grained so every integer is visited, not just multiples of 10
    restDelta: 0.01,
    restSpeed: 0.01,
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1200);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === 'function') onEnd();
      }, delay * 1200 + duration * 1200);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  // Split number into individual characters for per-digit animation
  const formatted = separator
    ? displayValue.toLocaleString('en-US').replace(/,/g, separator)
    : String(displayValue);

  const chars = formatted.split('');

  // Reverse-index so rightmost digit (ones place) gets delay=0
  const digitTotal = chars.filter((c) => /\d/.test(c)).length;
  let digitCount = 0;

  return (
    <>
      <style>{`
        @keyframes digitSlideOut {
          from { transform: translateY(0);     opacity: 1; }
          to   { transform: translateY(-120%); opacity: 0; }
        }
        @keyframes digitSlideIn {
          from { transform: translateY(120%);  opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      `}</style>
      <span
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {chars.map((char, i) => {
          if (/\d/.test(char)) {
            const staggerIndex = digitTotal - 1 - digitCount;
            digitCount++;
            return <AnimatedDigit key={i} digit={char} index={staggerIndex} />;
          }
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                verticalAlign: 'baseline',
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </>
  );
}