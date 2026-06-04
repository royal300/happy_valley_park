import React from 'react';

/* ─────────────────────────────────────────────
   SVG Icon Components  (stroke-only, no fill)
───────────────────────────────────────────── */

const FerrisWheelIcon = () => (
  <svg viewBox="0 0 100 118" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer rim */}
    <circle cx="50" cy="46" r="42" />
    {/* Hub */}
    <circle cx="50" cy="46" r="6" fill="currentColor" stroke="none" />
    {/* 4-axis spokes */}
    <line x1="50" y1="4"  x2="50" y2="88" />
    <line x1="8"  y1="46" x2="92" y2="46" />
    <line x1="20" y1="16" x2="80" y2="76" />
    <line x1="80" y1="16" x2="20" y2="76" />
    {/* Gondolas at spoke ends */}
    <rect x="46" y="1"  width="8" height="6" rx="1.5" />
    <rect x="46" y="85" width="8" height="6" rx="1.5" />
    <rect x="5"  y="43" width="8" height="6" rx="1.5" />
    <rect x="87" y="43" width="8" height="6" rx="1.5" />
    <rect x="16" y="12" width="8" height="6" rx="1.5" />
    <rect x="76" y="12" width="8" height="6" rx="1.5" />
    <rect x="16" y="74" width="8" height="6" rx="1.5" />
    <rect x="76" y="74" width="8" height="6" rx="1.5" />
    {/* Support legs */}
    <line x1="50" y1="88" x2="26" y2="114" />
    <line x1="50" y1="88" x2="74" y2="114" />
    <line x1="18" y1="114" x2="82" y2="114" />
  </svg>
);

const FrisbeeIcon = () => (
  <svg viewBox="0 0 100 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <ellipse cx="50" cy="32" rx="46" ry="17" />
    <ellipse cx="50" cy="32" rx="30" ry="10" />
    <ellipse cx="50" cy="22" rx="14" ry="9" />
    <path d="M4 32 Q30 16 50 16 Q70 16 96 32" strokeWidth="1.5" strokeDasharray="5 4" />
  </svg>
);

const RollerCoasterIcon = () => (
  <svg viewBox="0 0 112 62" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="7" width="102" height="29" rx="10" />
    <line x1="38" y1="7"  x2="38" y2="36" strokeWidth="1.5" />
    <line x1="66" y1="7"  x2="66" y2="36" strokeWidth="1.5" />
    {/* Safety bar */}
    <path d="M14 20 Q38 15 66 20 Q90 15 102 20" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="22" cy="50" r="9" />
    <circle cx="56" cy="50" r="9" />
    <circle cx="90" cy="50" r="9" />
    <circle cx="22" cy="50" r="3" fill="currentColor" stroke="none" />
    <circle cx="56" cy="50" r="3" fill="currentColor" stroke="none" />
    <circle cx="90" cy="50" r="3" fill="currentColor" stroke="none" />
  </svg>
);

const CarouselIcon = () => (
  <svg viewBox="0 0 90 118" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Canopy */}
    <polygon points="45,4 86,40 4,40" />
    <line x1="45" y1="4" x2="27" y2="40" strokeWidth="1" />
    <line x1="45" y1="4" x2="63" y2="40" strokeWidth="1" />
    {/* Top platform ellipse */}
    <ellipse cx="45" cy="40" rx="40" ry="9" />
    {/* Center pole */}
    <line x1="45" y1="8" x2="45" y2="110" strokeWidth="2.5" />
    {/* Base platform */}
    <ellipse cx="45" cy="110" rx="32" ry="7" />
    {/* Hanging horse ropes */}
    <line x1="45" y1="40" x2="15" y2="58" strokeDasharray="3 2" />
    <ellipse cx="10" cy="63" rx="9" ry="5.5" />
    <line x1="45" y1="40" x2="75" y2="58" strokeDasharray="3 2" />
    <ellipse cx="80" cy="63" rx="9" ry="5.5" />
    <line x1="45" y1="40" x2="45" y2="60" strokeDasharray="3 2" />
    <ellipse cx="45" cy="65" rx="9" ry="5.5" />
  </svg>
);

const BalloonIcon = () => (
  <svg viewBox="0 0 58 105" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <ellipse cx="29" cy="36" rx="26" ry="33" />
    <path d="M24 69 Q29 74 34 69" />
    <path d="M29 74 Q22 84 27 93" strokeWidth="1.5" />
    {/* Shine highlight */}
    <ellipse cx="19" cy="22" rx="5" ry="10" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const StarBurstIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polygon points="50,5 59,35 90,35 66,54 75,84 50,65 25,84 34,54 10,35 41,35" />
  </svg>
);

const WaterWaveIcon = () => (
  <svg viewBox="0 0 125 68" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 26 Q20 8 36 26 Q52 44 68 26 Q84 8 100 26 Q116 44 122 34" />
    <path d="M4 44 Q20 26 36 44 Q52 62 68 44 Q84 26 100 44 Q116 62 122 52" />
    {/* Splash drops */}
    <line x1="36" y1="10" x2="32" y2="3" strokeWidth="1.5" />
    <line x1="41" y1="8" x2="45" y2="2" strokeWidth="1.5" />
    <line x1="68" y1="10" x2="64" y2="3" strokeWidth="1.5" />
    <line x1="73" y1="8" x2="77" y2="2" strokeWidth="1.5" />
  </svg>
);

const TicketIcon = () => (
  <svg viewBox="0 0 112 58" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="5" width="104" height="48" rx="5" />
    <path d="M38 5 Q31 29 38 53" />
    <line x1="50" y1="29" x2="100" y2="29" strokeWidth="1.5" strokeDasharray="5 4" />
    <polygon points="19,22 22,30 30,30 24,35 26,43 19,38 12,43 14,35 8,30 16,30" strokeWidth="1.5" />
    <line x1="52" y1="17" x2="92" y2="17" strokeWidth="2" />
    <line x1="52" y1="40" x2="80" y2="40" strokeWidth="1.5" />
  </svg>
);

const WaterSlideIcon = () => (
  <svg viewBox="0 0 72 115" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {/* Person at top */}
    <circle cx="10" cy="6" r="5" />
    {/* Platform */}
    <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2.5" />
    {/* Slide curves */}
    <path d="M12 12 Q12 42 38 58 Q64 74 64 104" strokeWidth="2.5" />
    <path d="M6 12 Q6 44 32 60 Q58 76 58 104" strokeWidth="1.5" />
    <path d="M18 12 Q18 40 44 56 Q70 72 70 104" strokeWidth="1.5" />
    {/* Base */}
    <line x1="56" y1="104" x2="72" y2="104" strokeWidth="2.5" />
    <line x1="63" y1="90" x2="63" y2="104" strokeWidth="2" />
  </svg>
);

/* ─────────────────────────────────────────────
   Icon registry & scatter layout
───────────────────────────────────────────── */

const ICONS = [
  FerrisWheelIcon,    // 0
  FrisbeeIcon,        // 1
  RollerCoasterIcon,  // 2
  CarouselIcon,       // 3
  BalloonIcon,        // 4
  StarBurstIcon,      // 5
  WaterWaveIcon,      // 6
  TicketIcon,         // 7
  WaterSlideIcon,     // 8
];

// Deterministic scatter — 30 items spread across 0–100% of the page height
// top/left are percentages relative to the absolute container (inset-0 in main)
const ITEMS = [
  // ── Top band (0–15%) ──
  { type: 0, top: '1%',  left: '2%',  size: 92, rotate: -8,  opacity: 0.06 },
  { type: 1, top: '5%',  left: '88%', size: 74, rotate: 22,  opacity: 0.055 },
  { type: 4, top: '3%',  left: '62%', size: 56, rotate: 12,  opacity: 0.065 },
  { type: 5, top: '10%', left: '32%', size: 50, rotate: 30,  opacity: 0.06 },

  // ── Upper-mid band (15–32%) ──
  { type: 6, top: '16%', left: '18%', size: 88, rotate: -5,  opacity: 0.05 },
  { type: 7, top: '20%', left: '72%', size: 68, rotate: 0,   opacity: 0.05 },
  { type: 2, top: '27%', left: '8%',  size: 86, rotate: 4,   opacity: 0.055 },
  { type: 3, top: '30%', left: '84%', size: 92, rotate: -18, opacity: 0.05 },
  { type: 8, top: '25%', left: '46%', size: 70, rotate: 18,  opacity: 0.055 },

  // ── Mid band (32–50%) ──
  { type: 0, top: '36%', left: '60%', size: 82, rotate: 8,   opacity: 0.05 },
  { type: 1, top: '42%', left: '22%', size: 70, rotate: -28, opacity: 0.06 },
  { type: 4, top: '46%', left: '78%', size: 52, rotate: -12, opacity: 0.065 },
  { type: 6, top: '50%', left: '42%', size: 96, rotate: 0,   opacity: 0.045 },

  // ── Lower-mid band (50–68%) ──
  { type: 7, top: '54%', left: '5%',  size: 62, rotate: 6,   opacity: 0.05 },
  { type: 2, top: '60%', left: '68%', size: 80, rotate: 0,   opacity: 0.055 },
  { type: 5, top: '64%', left: '30%', size: 58, rotate: -18, opacity: 0.06 },
  { type: 3, top: '67%', left: '88%', size: 86, rotate: 22,  opacity: 0.05 },
  { type: 8, top: '62%', left: '52%', size: 66, rotate: -4,  opacity: 0.055 },

  // ── Lower band (68–85%) ──
  { type: 1, top: '72%', left: '14%', size: 68, rotate: -24, opacity: 0.06 },
  { type: 0, top: '76%', left: '55%', size: 90, rotate: -6,  opacity: 0.05 },
  { type: 4, top: '80%', left: '88%', size: 54, rotate: -6,  opacity: 0.065 },
  { type: 6, top: '84%', left: '36%', size: 92, rotate: -4,  opacity: 0.045 },

  // ── Bottom band (85–100%) ──
  { type: 7, top: '88%', left: '8%',  size: 64, rotate: 0,   opacity: 0.05 },
  { type: 5, top: '91%', left: '65%', size: 60, rotate: 28,  opacity: 0.06 },
  { type: 2, top: '94%', left: '80%', size: 82, rotate: -12, opacity: 0.055 },
  { type: 3, top: '96%', left: '24%', size: 88, rotate: 16,  opacity: 0.05 },
  { type: 8, top: '98%', left: '50%', size: 68, rotate: 0,   opacity: 0.055 },

  // ── Extra items between bands to fill gaps ──
  { type: 5, top: '13%', left: '55%', size: 46, rotate: -5,  opacity: 0.055 },
  { type: 7, top: '38%', left: '36%', size: 62, rotate: 10,  opacity: 0.05 },
  { type: 4, top: '58%', left: '22%', size: 50, rotate: 20,  opacity: 0.065 },
];

/* ─────────────────────────────────────────────
   ParkBackground Component
───────────────────────────────────────────── */

const ParkBackground = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 overflow-hidden pointer-events-none"
    style={{ zIndex: 0 }}
  >
    {ITEMS.map((item, i) => {
      const Icon = ICONS[item.type];
      return (
        <div
          key={i}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            opacity: item.opacity,
            transform: `rotate(${item.rotate}deg)`,
            color: '#b45309',   /* amber-700 — warm park brand tone */
          }}
        >
          <Icon />
        </div>
      );
    })}
  </div>
);

export default ParkBackground;
