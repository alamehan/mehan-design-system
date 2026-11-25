import React, {useId} from 'react';

interface MehanLogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Builds an encoded SVG data URI for `<link rel="icon">` matching the active
 * Mehan 2.5D tactile keycap accent and 3D bottom lip.
 */
export function buildMehanFaviconDataUri(
  accentHex = '#2563eb',
  lipHex = '#1e40af',
): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='4 4 88 88'><rect x='4' y='8' width='88' height='84' rx='22' fill='${lipHex}'/><rect x='4' y='4' width='88' height='83' rx='22' fill='${accentHex}'/><rect x='11' y='11' width='74' height='69' rx='16' fill='#090d16' fill-opacity='.22'/><rect x='21.5' y='25' width='11.2' height='44.5' rx='5.6' fill='#fff'/><rect x='63.3' y='25' width='11.2' height='31.5' rx='5.6' fill='#fff'/><path d='M27.1 28L48 50.8L68.9 28' fill='none' stroke='#fff' stroke-width='10.8' stroke-linecap='round' stroke-linejoin='round'/><circle cx='68.9' cy='68.8' r='5.3' fill='#fbbf24'/></svg>`;
  return `data:image/svg+xml,${svg.replace(/#/g, '%23')}`;
}

/**
 * Hand-crafted 2.5D kinetic brand emblem for Mehan Design System.
 * Sculpted tactile hardware keycap adapting live to the active Mehan accent,
 * framing 3 articulated 2.5D porcelain pillars & bridge arch ("M") plus the
 * signature @alamehan jewel orb & 4-point craft spark.
 */
export function MehanLogoMark({size = 32, className}: MehanLogoMarkProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pTop = `mh-ptop-${rawId}`;
  const pWall = `mh-pwall-${rawId}`;
  const sheen = `mh-sheen-${rawId}`;
  const well = `mh-well-${rawId}`;
  const jewel = `mh-jewel-${rawId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4 4 88 88"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={`mh-crafted-logo ${className ?? ''}`}
    >
      <defs>
        <linearGradient id={sheen} x1="12" y1="6" x2="84" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={well} x1="14" y1="12" x2="82" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#090d16" stopOpacity="0.34" />
          <stop offset="1" stopColor="#090d16" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={pTop} x1="22" y1="22" x2="72" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#faf7f2" />
          <stop offset="1" stopColor="#e9e2d8" />
        </linearGradient>
        <linearGradient id={pWall} x1="22" y1="26" x2="74" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#cbd5e1" stopOpacity="0.92" />
          <stop offset="1" stopColor="#64748b" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id={jewel} x1="63" y1="63" x2="74" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* 1. 2.5D Sculpted Tactile Keycap Base (Live Theme Accent + 3D Bottom Lip) */}
      <rect
        x="4"
        y="8"
        width="88"
        height="84"
        rx="22"
        style={{fill: 'var(--mehan-primary-lip, #1e40af)'}}
      />
      <rect
        x="4"
        y="4"
        width="88"
        height="83"
        rx="22"
        style={{fill: 'var(--color-accent, #2563eb)'}}
      />
      <rect x="4" y="4" width="88" height="83" rx="22" fill={`url(#${sheen})`} />
      <rect
        x="10.5"
        y="10.5"
        width="75"
        height="70"
        rx="16.5"
        fill={`url(#${well})`}
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="1.1"
      />
      <path
        d="M22 6.2H74"
        stroke="#ffffff"
        strokeOpacity="0.52"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 2. Articulated 2.5D Porcelain "M" Monogram (3 Relay Channels) */}
      {/* Left Pillar */}
      <g className="mh-logo-p1">
        <rect x="21.5" y="27.8" width="11.2" height="44.5" rx="5.6" fill={`url(#${pWall})`} />
        <rect x="21.5" y="24.8" width="11.2" height="44.5" rx="5.6" fill={`url(#${pTop})`} />
      </g>

      {/* Right Pillar (shortened gracefully above the craft jewel) */}
      <g className="mh-logo-p2">
        <rect x="63.3" y="27.8" width="11.2" height="31.5" rx="5.6" fill={`url(#${pWall})`} />
        <rect x="63.3" y="24.8" width="11.2" height="31.5" rx="5.6" fill={`url(#${pTop})`} />
      </g>

      {/* Sculpted Bridge Chevron */}
      <g className="mh-logo-arch">
        <path
          d="M27.1 30.8L48 53.6L68.9 30.8"
          stroke={`url(#${pWall})`}
          strokeWidth="10.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.1 27.8L48 50.6L68.9 27.8"
          stroke={`url(#${pTop})`}
          strokeWidth="10.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 3. Signature Golden Craft Jewel + Ripple Halo + 4-Point Spark */}
      <circle
        cx="68.9"
        cy="68.8"
        r="5.8"
        stroke="#fef3c7"
        strokeWidth="1.9"
        className="mh-logo-ring"
      />
      <circle cx="68.9" cy="71" r="5.3" fill="#090d16" opacity="0.34" />
      <g className="mh-logo-orb">
        <circle cx="68.9" cy="68.8" r="5.3" fill={`url(#${jewel})`} />
        <circle cx="67.2" cy="67.1" r="1.7" fill="#ffffff" opacity="0.9" />
      </g>
      <path
        d="M75.8 58.2L76.8 60.9L79.5 61.9L76.8 62.9L75.8 65.6L74.8 62.9L72.1 61.9L74.8 60.9Z"
        fill="#ffffff"
        className="mh-logo-spark"
      />
    </svg>
  );
}
