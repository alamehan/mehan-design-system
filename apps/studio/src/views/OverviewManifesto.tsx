import React, {useId} from 'react';
import {Badge} from '@astryxdesign/core';
import type {ResolvedMehanDna} from '@mehan/astryx/dna';
import {ArrowUpRight, Sparkles} from 'lucide-react';
import type {StudioLang} from '../studioState';

interface OverviewManifestoProps {
  lang: StudioLang;
  dna: ResolvedMehanDna;
  mode: 'light' | 'dark';
  activePresetName?: string;
  presetCount: number;
  uxChapterCount: number;
  onNavigateTab: (tab: string) => void;
  onOpenStory: () => void;
}

/**
 * 2.5D SceneForge (`tfscene: 1`) Kinetic Diorama:
 * - Beat 1 (0%–26%): Left Flat Unstyled UI Wireframe shudders & fires Stream 1
 * - Beat 2 (20%–48%): Center Meta Astryx (</> Emerald) × Mehan Craft (❖ Rose + Live Keycap)
 *                     Forge Press pulls open in anticipation (23%), slams flush at 31%
 *                     with squash-and-stretch, expanding shock-ring & 6 Amber Spark Capsules!
 * - Beat 3 (46%–74%): Live-accent Stream 2 ignites Right 2.5D Tactile Product Card inside
 *                     4-handle vector bounding rails, synced live to `dna.accent`!
 * - Beat 4 (58%–92%): 5 organic converging arrows (↘ ↘ ↓ ↙ ↙) fire chromatic pulses into
 *                     the 2.5D Faceted Craft Gem right above the Distillation Spine!
 */
function SceneForgeManifestoDiorama({
  isId,
  mode,
  accentHex,
  lipHex,
  moodLabel,
}: {
  isId: boolean;
  mode: 'light' | 'dark';
  accentHex: string;
  lipHex: string;
  moodLabel: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const idRawStage = `sf-raw-stage-${uid}`;
  const idForgeStage = `sf-forge-stage-${uid}`;
  const idCraftStage = `sf-craft-stage-${uid}`;
  const idRosFace = `sf-ros-face-${uid}`;
  const idGrnFace = `sf-grn-face-${uid}`;
  const idAmbFace = `sf-amb-face-${uid}`;
  const idSltFace = `sf-slt-face-${uid}`;
  const idHatch = `sf-hatch-${uid}`;

  const railStroke = mode === 'dark' ? '#475569' : '#cbd5e1';
  const railTip = mode === 'dark' ? '#94a3b8' : '#64748b';
  const captionMuted = mode === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <svg
      className="mh-sf-diorama"
      viewBox="0 0 680 298"
      width="100%"
      fill="none"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={
        {
          '--sf-accent': accentHex,
          '--sf-accent-lip': lipHex,
        } as React.CSSProperties
      }
    >
      <defs>
        {/* Solid 2.5D Stage Pedestal Discs — 100% Crisp in Both Light & Dark Modes */}
        <linearGradient id={idRawStage} x1="0.2" y1="0.06" x2="0.84" y2="0.95">
          <stop offset="0" stopColor="oklch(95.5% 0.014 255)" />
          <stop offset="0.65" stopColor="oklch(91.5% 0.024 14)" />
          <stop offset="1" stopColor="oklch(87.5% 0.038 14)" />
        </linearGradient>

        <linearGradient id={idForgeStage} x1="0.18" y1="0.05" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="oklch(96.2% 0.059 95.6)" />
          <stop offset="0.52" stopColor="oklch(94.2% 0.03 255.6)" />
          <stop offset="1" stopColor="oklch(95% 0.052 163)" />
        </linearGradient>

        <linearGradient id={idCraftStage} x1="0.18" y1="0.05" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="oklch(95.5% 0.025 255.6)" />
          <stop offset="0.65" stopColor="oklch(90.5% 0.052 254.1)" />
          <stop offset="1" stopColor="oklch(84.5% 0.088 252)" />
        </linearGradient>

        {/* Sculpted 2.5D Object Gradients */}
        <linearGradient id={idRosFace} x1="0.18" y1="0" x2="0.82" y2="1">
          <stop offset="0" stopColor="oklch(71.2% 0.194 13.4)" />
          <stop offset="0.5" stopColor="oklch(64.5% 0.246 16.4)" />
          <stop offset="1" stopColor="oklch(51.4% 0.222 16.9)" />
        </linearGradient>

        <linearGradient id={idGrnFace} x1="0.18" y1="0" x2="0.82" y2="1">
          <stop offset="0" stopColor="oklch(79.2% 0.209 151.7)" />
          <stop offset="0.5" stopColor="oklch(72.3% 0.219 149.6)" />
          <stop offset="1" stopColor="oklch(52.7% 0.154 150.1)" />
        </linearGradient>

        <linearGradient id={idAmbFace} x1="0.18" y1="0" x2="0.82" y2="1">
          <stop offset="0" stopColor="oklch(87.9% 0.169 91.6)" />
          <stop offset="0.5" stopColor="oklch(82.8% 0.189 84.4)" />
          <stop offset="1" stopColor="oklch(75% 0.188 70.1)" />
        </linearGradient>

        <linearGradient id={idSltFace} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#475569" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>

        <pattern
          id={idHatch}
          width="8"
          height="8"
          patternTransform="rotate(-45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="#93c5fd"
            strokeWidth="1.2"
            opacity="0.55"
          />
        </pattern>
      </defs>

      {/* =====================================================================
          1. LEFT STAGE (BEAT 1): FRAGILE GENERIC FLAT UI WIREFRAME
      ====================================================================== */}
      <circle cx="116" cy="94" r="60" fill="oklch(76% 0.08 14)" opacity="0.38" />
      <circle
        cx="116"
        cy="90"
        r="60"
        fill={`url(#${idRawStage})`}
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      <circle
        cx="116"
        cy="90"
        r="50"
        stroke="oklch(78% 0.07 14)"
        strokeWidth="1.2"
        strokeDasharray="3 6"
        opacity="0.72"
      />

      {/* Drifting Detached Wireframe Fragments */}
      <g className="mhsf-raw-fragments">
        <rect
          x="52"
          y="46"
          width="11"
          height="11"
          rx="2"
          transform="rotate(-16 57 51)"
          fill="oklch(64.5% 0.246 16.4)"
          opacity="0.85"
        />
        <rect
          x="164"
          y="106"
          width="10"
          height="10"
          rx="2"
          transform="rotate(22 169 111)"
          fill="#64748b"
          opacity="0.75"
        />
      </g>

      {/* Crooked Flat Unstyled UI Card */}
      <g className="mhsf-raw-card">
        <g transform="rotate(-3.5 116 86)">
          <rect
            x="62"
            y="53"
            width="108"
            height="68"
            rx="4"
            fill="#94a3b8"
            opacity="0.35"
          />
          <rect
            x="62"
            y="50"
            width="108"
            height="68"
            rx="4"
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="1.4"
          />
          {/* Flat Square Avatar + Uneven Skeleton Bars */}
          <rect x="70" y="58" width="16" height="16" rx="2" fill="#cbd5e1" />
          <rect x="92" y="59" width="46" height="6" rx="1.5" fill="#64748b" />
          <rect x="92" y="68" width="32" height="4.5" rx="1.5" fill="#94a3b8" />
          <rect
            x="144"
            y="59"
            width="18"
            height="10"
            rx="2"
            stroke="#cbd5e1"
            strokeWidth="1.1"
          />
          {/* Lifeless Thin Progress Line */}
          <rect x="70" y="81" width="92" height="4" rx="1" fill="#e2e8f0" />
          <rect x="70" y="81" width="54" height="4" rx="1" fill="#94a3b8" />
          {/* Flat Rectangular Bordered Button */}
          <rect
            x="70"
            y="92"
            width="92"
            height="18"
            rx="2.5"
            fill="#f1f5f9"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
          <line x1="96" y1="101" x2="136" y2="101" stroke="#64748b" strokeWidth="2.4" />
        </g>
      </g>

      {/* 2.5D Slate Hardware Pill Badge: RAW / FLAT */}
      <g className="mhsf-pill-raw">
        <rect x="72" y="140.5" width="88" height="24" rx="12" fill="#0f172a" />
        <rect
          x="72"
          y="137"
          width="88"
          height="24"
          rx="12"
          fill={`url(#${idSltFace})`}
          stroke="#ffffff"
          strokeWidth="1.2"
        />
        <circle cx="85" cy="149" r="3.4" fill="oklch(71.2% 0.194 13.4)" />
        <text
          x="121"
          y="153"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-family-heading), system-ui, sans-serif"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="0.05em"
        >
          {isId ? 'UI DATAR' : 'FLAT UI'}
        </text>
      </g>

      {/* =====================================================================
          2. CONNECTOR A: S-CURVE CONDUIT + COMET PULSE (LEFT -> CENTER)
      ====================================================================== */}
      <path
        d="M 186 90 C 210 76, 236 104, 262 90"
        stroke={railStroke}
        strokeWidth="2.4"
        strokeDasharray="4 5"
      />
      <path
        className="mhsf-stream-1"
        pathLength={1}
        d="M 186 90 C 210 76, 236 104, 262 90"
        stroke="oklch(64.5% 0.246 16.4)"
        strokeWidth="4"
      />
      <path
        d="M 255 84 L 264 90 L 255 96"
        stroke={railTip}
        strokeWidth="2.4"
      />

      {/* =====================================================================
          3. CENTER STAGE (BEAT 2): META ASTRYX × MEHAN CRAFT FORGE PRESS
      ====================================================================== */}
      <circle cx="340" cy="94" r="54" fill="oklch(82.8% 0.189 84.4)" opacity="0.34" />
      <circle
        cx="340"
        cy="90"
        r="54"
        fill={`url(#${idForgeStage})`}
        stroke="#ffffff"
        strokeWidth="1.6"
      />

      {/* Continuous 360deg Spinning OKLCH Chromatic Orbit Ring */}
      <g className="mhsf-orbit-spin">
        <circle
          cx="340"
          cy="90"
          r="45"
          stroke="#94a3b8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.55"
        />
        <circle cx="340" cy="45" r="3.4" fill="oklch(64.5% 0.246 16.4)" />
        <circle cx="385" cy="90" r="3.4" fill="oklch(72.3% 0.219 149.6)" />
        <circle cx="340" cy="135" r="3.4" fill="oklch(62.3% 0.214 259.8)" />
        <circle cx="295" cy="90" r="3.4" fill="oklch(76.9% 0.188 70.1)" />
      </g>

      {/* Climax Amber Shock-Ring on Clamp Impact (opacity="0" at 0%) */}
      <circle
        className="mhsf-press-ring"
        opacity="0"
        cx="340"
        cy="90"
        r="50"
        stroke="oklch(82.8% 0.189 84.4)"
        strokeWidth="2.8"
      />

      {/* 6 Signature 2.5D Amber Spark Ray Capsules (3 Top + 3 Bottom) */}
      <g className="mhsf-sparks">
        <g transform="translate(0 1.8)">
          <line x1="340" y1="28" x2="340" y2="15" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
          <line x1="312" y1="33" x2="302" y2="22" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
          <line x1="368" y1="33" x2="378" y2="22" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
          <line x1="340" y1="152" x2="340" y2="165" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
          <line x1="312" y1="147" x2="302" y2="158" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
          <line x1="368" y1="147" x2="378" y2="158" stroke="oklch(55.5% 0.163 49)" strokeWidth="5.2" />
        </g>
        <line x1="340" y1="28" x2="340" y2="15" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
        <line x1="312" y1="33" x2="302" y2="22" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
        <line x1="368" y1="33" x2="378" y2="22" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
        <line x1="340" y1="152" x2="340" y2="165" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
        <line x1="312" y1="147" x2="302" y2="158" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
        <line x1="368" y1="147" x2="378" y2="158" stroke={`url(#${idAmbFace})`} strokeWidth="5.2" />
      </g>

      {/* Interlocking Design-to-Code Forge Press + Central Live Mehan Keycap */}
      <g className="mhsf-forge-group">
        {/* Left 2.5D Rose Design Die (❖) */}
        <g className="mhsf-die-left">
          <rect
            x="284"
            y="65.5"
            width="44"
            height="52"
            rx="12"
            fill="oklch(45.5% 0.188 13.7)"
          />
          <rect
            x="284"
            y="62"
            width="44"
            height="52"
            rx="12"
            fill={`url(#${idRosFace})`}
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <polygon points="302,80 305.2,83.2 302,86.4 298.8,83.2" fill="#ffffff" />
          <polygon points="302,90 305.2,93.2 302,96.4 298.8,93.2" fill="#ffffff" />
          <polygon points="297,85 300.2,88.2 297,91.4 293.8,88.2" fill="#ffffff" />
          <polygon points="307,85 310.2,88.2 307,91.4 303.8,88.2" fill="#ffffff" />
        </g>

        {/* Right 2.5D Emerald Meta Astryx Code Die (</>) */}
        <g className="mhsf-die-right">
          <rect
            x="352"
            y="65.5"
            width="44"
            height="52"
            rx="12"
            fill="oklch(44.8% 0.119 151.3)"
          />
          <rect
            x="352"
            y="62"
            width="44"
            height="52"
            rx="12"
            fill={`url(#${idGrnFace})`}
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <polyline
            points="374,83 369.5,88 374,93"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <polyline
            points="385,83 389.5,88 385,93"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <line x1="381.2" y1="81.5" x2="377.8" y2="94.5" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* Center Crown: Sculpted 2.5D Mehan Keycap Synced to Live Theme Accent */}
        <g className="mhsf-keycap-core">
          <rect
            x="318"
            y="71.5"
            width="44"
            height="42"
            rx="12"
            style={{fill: 'var(--sf-accent-lip)'}}
          />
          <rect
            x="318"
            y="68"
            width="44"
            height="41"
            rx="12"
            style={{fill: 'var(--sf-accent)'}}
            stroke="#ffffff"
            strokeWidth="1.4"
          />
          <rect
            x="322"
            y="72"
            width="36"
            height="33"
            rx="8.5"
            fill="#090d16"
            fillOpacity="0.22"
          />
          {/* Articulated White "M" Monogram + Golden Jewel */}
          <rect x="327.5" y="79" width="5.2" height="19.5" rx="2.6" fill="#ffffff" />
          <rect x="347.3" y="79" width="5.2" height="13.5" rx="2.6" fill="#ffffff" />
          <path
            d="M 330.1 80.6 L 340 91.2 L 349.9 80.6"
            stroke="#ffffff"
            strokeWidth="4.8"
          />
          <circle cx="349.9" cy="98.2" r="2.6" fill="#fbbf24" />
        </g>
      </g>

      {/* =====================================================================
          4. CONNECTOR B: S-CURVE CONDUIT + LIVE-ACCENT PULSE (CENTER -> RIGHT)
      ====================================================================== */}
      <path
        d="M 416 90 C 442 104, 468 76, 492 90"
        stroke={railStroke}
        strokeWidth="2.4"
        strokeDasharray="4 5"
      />
      <path
        className="mhsf-stream-2"
        pathLength={1}
        d="M 416 90 C 442 104, 468 76, 492 90"
        style={{stroke: 'var(--sf-accent)'}}
        strokeWidth="4.2"
      />
      <path
        d="M 485 84 L 494 90 L 485 96"
        stroke={railTip}
        strokeWidth="2.4"
      />

      {/* =====================================================================
          5. RIGHT STAGE (BEAT 3): TACTILE 2.5D LIVE PRODUCT CARD + SNAP RAILS
      ====================================================================== */}
      <circle
        cx="564"
        cy="94"
        r="62"
        style={{fill: 'var(--sf-accent)'}}
        opacity="0.24"
      />
      <circle
        cx="564"
        cy="90"
        r="62"
        fill={`url(#${idCraftStage})`}
        stroke="#ffffff"
        strokeWidth="1.6"
      />

      {/* Expanding Live-Accent Shock-Ring on Crystallization (opacity="0" at 0%) */}
      <circle
        className="mhsf-crafted-ring"
        opacity="0"
        cx="564"
        cy="90"
        r="54"
        style={{stroke: 'var(--sf-accent)'}}
        strokeWidth="2.8"
      />

      {/* Blueprint Hatching + Vector Selection Bounding Frame + 4 Corner Handles */}
      <g className="mhsf-crafted-float">
        <g className="mhsf-crafted-card">
          <rect
            x="500"
            y="42"
            width="128"
            height="86"
            rx="10"
            fill={`url(#${idHatch})`}
          />
          <rect
            x="500"
            y="42"
            width="128"
            height="86"
            rx="10"
            style={{stroke: 'var(--sf-accent)'}}
            strokeWidth="1.6"
            strokeOpacity="0.55"
          />

          {/* 4 Sculpted 2.5D Corner Snap Handles */}
          <rect x="496" y="38" width="8" height="8" rx="2.2" fill="#ffffff" style={{stroke: 'var(--sf-accent)'}} strokeWidth="1.8" />
          <rect x="624" y="38" width="8" height="8" rx="2.2" fill="#ffffff" style={{stroke: 'var(--sf-accent)'}} strokeWidth="1.8" />
          <rect x="496" y="124" width="8" height="8" rx="2.2" fill="#ffffff" style={{stroke: 'var(--sf-accent)'}} strokeWidth="1.8" />
          <rect x="624" y="124" width="8" height="8" rx="2.2" fill="#ffffff" style={{stroke: 'var(--sf-accent)'}} strokeWidth="1.8" />

          {/* Tactile Porcelain Card Extruded Wall + Crisp White Face */}
          <rect
            x="506"
            y="50.5"
            width="116"
            height="73"
            rx="11"
            fill="#64748b"
            opacity="0.32"
          />
          <rect
            x="506"
            y="47"
            width="116"
            height="73"
            rx="11"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1.2"
          />

          {/* Tinted Round Avatar + Crisp Hierarchy + Emerald AA Pill */}
          <circle
            cx="521"
            cy="61"
            r="8"
            style={{fill: 'var(--sf-accent)'}}
            opacity="0.16"
          />
          <circle cx="521" cy="61" r="3.6" style={{fill: 'var(--sf-accent)'}} />
          <rect x="534" y="56" width="52" height="6" rx="3" fill="#0f172a" />
          <rect x="534" y="65" width="36" height="4.5" rx="2.2" fill="#64748b" />
          <rect x="594" y="55" width="20" height="10" rx="5" fill="#dcfce7" />
          <circle cx="604" cy="60" r="2.5" fill="#16a34a" />

          {/* Recessed Progress Track + Live-Accent Pill Fill */}
          <rect x="514" y="77" width="100" height="6.5" rx="3.2" fill="#e2e8f0" />
          <rect
            x="514"
            y="77"
            width="82"
            height="6.5"
            rx="3.2"
            style={{fill: 'var(--sf-accent)'}}
          />

          {/* True 2.5D Lipped Primary Action Button */}
          <rect
            x="514"
            y="92.5"
            width="100"
            height="20"
            rx="7"
            style={{fill: 'var(--sf-accent-lip)'}}
          />
          <rect
            x="514"
            y="89.5"
            width="100"
            height="19.5"
            rx="7"
            style={{fill: 'var(--sf-accent)'}}
          />
          <line x1="542" y1="99.2" x2="586" y2="99.2" stroke="#ffffff" strokeWidth="2.8" />
          {/* 4-Point Craft Spark Glint */}
          <path
            d="M 616 44 Q 617.2 50.8 624 52 Q 617.2 53.2 616 60 Q 614.8 53.2 608 52 Q 614.8 50.8 616 44 Z"
            fill="#fbbf24"
            stroke="#ffffff"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* 2.5D Live-Accent Hardware Pill Badge: READY / MEHAN UI */}
      <g className="mhsf-pill-crafted">
        <rect
          x="516"
          y="140.5"
          width="96"
          height="24"
          rx="12"
          style={{fill: 'var(--sf-accent-lip)'}}
        />
        <rect
          x="516"
          y="137"
          width="96"
          height="24"
          rx="12"
          style={{fill: 'var(--sf-accent)'}}
          stroke="#ffffff"
          strokeWidth="1.2"
        />
        <circle cx="530" cy="149" r="3.6" fill="#4ade80" />
        <text
          x="570"
          y="153"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-family-heading), system-ui, sans-serif"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="0.05em"
        >
          {isId ? 'SIAP RILIS' : 'MEHAN UI'}
        </text>
      </g>

      {/* Crisp Stage Captions Directly Below Left & Right Pedestals */}
      <text
        x="116"
        y="181"
        textAnchor="middle"
        fill={captionMuted}
        fontFamily="var(--font-family-body), system-ui, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        {isId ? 'Tanpa Mehan · UI generik' : 'Without Mehan · generic UI'}
      </text>
      <text
        x="564"
        y="181"
        textAnchor="middle"
        style={{fill: 'var(--color-text-accent)'}}
        fontFamily="var(--font-family-body), system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
      >
        {isId ? `Dengan Mehan · ${moodLabel}` : `With Mehan · ${moodLabel}`}
      </text>

      {/* =====================================================================
          6. LOWER STAGE (BEAT 4): 5 CONVERGING STREAM ARROWS (↘ ↘ ↓ ↙ ↙)
             FUNNELING INTO SCULPTED 2.5D FACETED CRAFT GEM
      ====================================================================== */}
      {/* Stream 1 (Far-Left ↘) */}
      <path
        d="M 164 196 C 158 214, 198 224, 218 238 C 232 248, 266 254, 294 263"
        stroke={railStroke}
        strokeWidth="2.1"
      />
      <path
        className="mhsf-funnel-pulse"
        pathLength={1}
        d="M 164 196 C 158 214, 198 224, 218 238 C 232 248, 266 254, 294 263"
        stroke="oklch(71.2% 0.194 13.4)"
        strokeWidth="3.6"
      />
      <path d="M 286 263 L 295 264 L 291 255" stroke={railTip} strokeWidth="2.1" />

      {/* Stream 2 (Mid-Left ↘) */}
      <path
        d="M 252 192 C 244 210, 272 224, 284 240 C 290 248, 304 254, 314 260"
        stroke={railStroke}
        strokeWidth="2.1"
      />
      <path
        className="mhsf-funnel-pulse"
        pathLength={1}
        d="M 252 192 C 244 210, 272 224, 284 240 C 290 248, 304 254, 314 260"
        stroke="oklch(70.2% 0.183 293.5)"
        strokeWidth="3.6"
      />
      <path d="M 306 259 L 315 261 L 313 252" stroke={railTip} strokeWidth="2.1" />

      {/* Stream 3 (Center Vertical ↓) */}
      <path
        d="M 340 186 C 336 206, 344 226, 340 250"
        stroke={railStroke}
        strokeWidth="2.2"
      />
      <path
        className="mhsf-funnel-pulse"
        pathLength={1}
        d="M 340 186 C 336 206, 344 226, 340 250"
        stroke="oklch(82.8% 0.189 84.4)"
        strokeWidth="3.8"
      />
      <path d="M 334.5 243 L 340 251.5 L 345.5 243" stroke={railTip} strokeWidth="2.2" />

      {/* Stream 4 (Mid-Right ↙) */}
      <path
        d="M 428 192 C 436 210, 408 224, 396 240 C 390 248, 376 254, 366 260"
        stroke={railStroke}
        strokeWidth="2.1"
      />
      <path
        className="mhsf-funnel-pulse"
        pathLength={1}
        d="M 428 192 C 436 210, 408 224, 396 240 C 390 248, 376 254, 366 260"
        stroke="oklch(79.2% 0.209 151.7)"
        strokeWidth="3.6"
      />
      <path d="M 367 252 L 365 261 L 374 259" stroke={railTip} strokeWidth="2.1" />

      {/* Stream 5 (Far-Right ↙) */}
      <path
        d="M 516 196 C 522 214, 482 224, 462 238 C 448 248, 414 254, 386 263"
        stroke={railStroke}
        strokeWidth="2.1"
      />
      <path
        className="mhsf-funnel-pulse"
        pathLength={1}
        d="M 516 196 C 522 214, 482 224, 462 238 C 448 248, 414 254, 386 263"
        style={{stroke: 'var(--sf-accent)'}}
        strokeWidth="3.6"
      />
      <path d="M 389 255 L 385 264 L 394 263" stroke={railTip} strokeWidth="2.1" />

      {/* Convergence Climax: 2.5D Faceted Craft Gem + Shock-Ring + Flanking Sparkles */}
      <circle
        className="mhsf-gem-ring"
        opacity="0"
        cx="340"
        cy="274"
        r="20"
        style={{stroke: 'var(--sf-accent)'}}
        strokeWidth="2.4"
      />
      <g className="mhsf-gem-sparks">
        <path
          d="M 308 265 Q 309.1 271.9 316 273 Q 309.1 274.1 308 281 Q 306.9 274.1 300 273 Q 306.9 271.9 308 265 Z"
          fill={`url(#${idAmbFace})`}
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        <path
          d="M 372 265 Q 373.1 271.9 380 273 Q 373.1 274.1 372 281 Q 370.9 274.1 364 273 Q 370.9 271.9 372 265 Z"
          fill={`url(#${idAmbFace})`}
          stroke="#ffffff"
          strokeWidth="0.8"
        />
      </g>
      <g className="mhsf-gem">
        <polygon
          transform="translate(0 3)"
          points="328,260 352,260 360,270 340,291 320,270"
          style={{fill: 'var(--sf-accent-lip)'}}
        />
        <polygon
          points="328,260 352,260 360,270 340,291 320,270"
          style={{fill: 'var(--sf-accent)'}}
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <polygon
          points="333,260 347,260 351,270 329,270"
          fill="#ffffff"
          opacity="0.88"
        />
        <line x1="320" y1="270" x2="360" y2="270" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
      </g>
    </svg>
  );
}

function SpineConnector({accentHex}: {accentHex: string}) {
  return (
    <svg
      className="mh-sf-tick"
      viewBox="0 0 16 26"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="24"
        stroke="currentColor"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        className="mh-sf-stream-down"
        x1="8"
        y1="2"
        x2="8"
        y2="24"
        stroke={accentHex}
        strokeWidth="2.2"
        strokeDasharray="6 12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OverviewManifesto({
  lang,
  dna,
  mode,
  activePresetName,
  presetCount,
  uxChapterCount,
  onNavigateTab,
  onOpenStory,
}: OverviewManifestoProps) {
  const isId = lang === 'id';
  const accentHex = dna.accent.accentLight;
  const lipHex = dna.accent.buttonLip;
  const moodLabel = activePresetName ?? dna.atmosphere.name;
  const moodsAndUxCount =
    presetCount === uxChapterCount
      ? `${presetCount}`
      : `${presetCount} · ${uxChapterCount}`;

  return (
    <section
      className="mh-effort-canvas"
      aria-labelledby="mh-effort-heading"
    >
      {/* Part A: 300% SceneForge (tfscene: 1) 2.5D Kinetic Diorama */}
      <SceneForgeManifestoDiorama
        isId={isId}
        mode={mode}
        accentHex={accentHex}
        lipHex={lipHex}
        moodLabel={moodLabel}
      />

      {/* Part B: Ultra-Clean Visual Compression Spine */}
      <div className="mh-thesis-compact">
        <Badge
          variant="purple"
          label={
            isId
              ? 'Meta Astryx × Presisi Desain Produk'
              : 'Meta Astryx × Product Design Craft'
          }
        />
        <h2 id="mh-effort-heading" className="mh-thesis-heading">
          {isId
            ? 'Fondasi raksasa & riset desain — dipadatkan jadi satu kit praktis.'
            : 'Years of engineering & design craft — distilled into one kit.'}
        </h2>
      </div>

      <div
        className="mh-distill-spine"
        role="list"
        aria-label={isId ? 'Ringkasan skala sistem Mehan' : 'Mehan system distillation'}
      >
        <div className="mh-distill-row" role="listitem">
          <div className="mh-distill-center">
            <div className="mh-funnel-number mh-stat-blue">13,000+</div>
            <div className="mh-funnel-label">
              {isId ? 'Aplikasi Teruji Meta Astryx' : 'Meta Astryx Proven Apps'}
            </div>
          </div>
        </div>

        <SpineConnector accentHex={accentHex} />

        <div className="mh-distill-row" role="listitem">
          <button
            type="button"
            className="mh-distill-center mh-distill-jump"
            onClick={() => onNavigateTab('components')}
          >
            <div className="mh-funnel-number mh-stat-green">135+</div>
            <div className="mh-funnel-label">
              <span>
                {isId ? 'Komponen UI & Ruang Kerja' : 'UI & Workspace Blocks'}
              </span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </button>
        </div>

        <SpineConnector accentHex={accentHex} />

        <div className="mh-distill-row has-side-note" role="listitem">
          <button
            type="button"
            className="mh-distill-center mh-distill-jump"
            onClick={() => onNavigateTab('ux')}
          >
            <div className="mh-funnel-number mh-stat-purple">{moodsAndUxCount}</div>
            <div className="mh-funnel-label">
              <span>
                {isId ? 'Suasana Taktil & Bab UX' : 'Tactile Moods & UX Guides'}
              </span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </button>

          <div className="mh-distill-side-pill">
            <Sparkles size={12} aria-hidden="true" />
            <span>
              {isId
                ? 'Font WOFF2 berlisensi siap offline'
                : 'Licensed offline WOFF2 fonts'}
            </span>
          </div>
        </div>

        <SpineConnector accentHex={accentHex} />

        <div className="mh-distill-row" role="listitem">
          <div className="mh-distill-center">
            <div className="mh-funnel-number mh-stat-accent">1</div>
            <div className="mh-funnel-label">
              {isId ? 'Sistem Siap Rilis' : 'Drop-In Design System'}
            </div>
            <div className="mh-distill-stack-pills">
              <span>AI Chat</span>
              <span>React</span>
              <span>HTML</span>
              <span>Figma</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mh-story-trigger-btn"
        onClick={onOpenStory}
      >
        <span>
          {isId
            ? 'Baca filosofi Meta Astryx & cerita 6 tahap perancangannya'
            : 'Read the Meta Astryx philosophy & 6-stage craft story'}
        </span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </button>
    </section>
  );
}
