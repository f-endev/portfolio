export function MarqueeTicker() {
  const items = [
    { label: "Customer satisfaction rate", value: "100+" },
    { label: "Customer satisfaction rate", value: "97%" },
    { label: "Industry awards", value: "6" },
    { label: "Years of Experience", value: "15+" },
    { label: "Projects completed", value: "140+" },
  ];

  // Triple for extra smooth infinite loop
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {loopItems.map((item, i) => (
          <span key={i} className="marquee-item">
            <strong>{item.value}</strong>
            {item.label}
            <span className="divider">/</span>
          </span>
        ))}
      </div>

      <style>{`
        .marquee-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          pointer-events: none;
        }

        /* EDGE FADE (white-blue-ish subtle fade) */
        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          width: 120px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(
            to right,
            rgb(232, 232, 240),
            rgba(232, 232, 240, 0.7),
            rgba(232, 232, 240, 0)
          );
        }

        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(
            to left,
            rgb(232, 232, 240),
            rgba(232, 232, 240, 0.7),
            rgba(232, 232, 240, 0)
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding-right: 2rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 0.92rem;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.55);
        }

        .marquee-item strong {
          color: #000;
          font-weight: 700;
        }

        .divider {
          margin-left: 1rem;
          color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}