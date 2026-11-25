import React from 'react';
import {Badge} from '@astryxdesign/core';
import type {ResolvedMehanDna} from '@mehan/astryx/dna';
import {ArrowUpRight, Sparkles} from 'lucide-react';
import {MehanLogoMark} from '../components/MehanLogoMark';
import type {StudioLang} from '../studioState';

interface OverviewManifestoProps {
  lang: StudioLang;
  dna: ResolvedMehanDna;
  activePresetName?: string;
  presetCount: number;
  onNavigateTab: (tab: string) => void;
  onOpenStory: () => void;
}

/**
 * Tactile 2.5D SceneForge-inspired horizontal light-stream bridge connecting
 * the unstyled generic UI card to the live Mehan-crafted UI card.
 */
function SceneForgeBridge({accentHex}: {accentHex: string}) {
  return (
    <div className="mh-sf-bridge" aria-hidden="true">
      <svg
        className="mh-sf-bridge-rail is-left"
        viewBox="0 0 64 32"
        fill="none"
      >
        <path
          d="M2 16 H62"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.28"
          strokeLinecap="round"
        />
        <path
          className="mh-sf-stream"
          d="M2 16 H62"
          stroke={accentHex}
          strokeWidth="2.2"
          strokeDasharray="10 18"
          strokeLinecap="round"
        />
      </svg>

      <div className="mh-sf-keycap">
        <MehanLogoMark size={30} />
      </div>

      <svg
        className="mh-sf-bridge-rail is-right"
        viewBox="0 0 64 32"
        fill="none"
      >
        <path
          d="M2 16 H56 M50 10 L58 16 L50 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="mh-sf-stream"
          d="M2 16 H56"
          stroke={accentHex}
          strokeWidth="2.2"
          strokeDasharray="10 18"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Clean 3-stream geometric convergence funnel (SceneForge DNA, zero hand-drawn squiggles).
 */
function SceneForgeConverge({accentHex}: {accentHex: string}) {
  return (
    <svg
      className="mh-sf-converge"
      viewBox="0 0 260 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M36 4 C 52 24, 108 24, 130 42"
        stroke="currentColor"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M130 2 V 42"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M224 4 C 208 24, 152 24, 130 42"
        stroke="currentColor"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="mh-sf-stream-down"
        d="M130 2 V 42"
        stroke={accentHex}
        strokeWidth="2"
        strokeDasharray="8 14"
        strokeLinecap="round"
      />
      <circle cx="130" cy="42" r="3.5" fill={accentHex} />
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
        strokeWidth="2"
        strokeDasharray="6 12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OverviewManifesto({
  lang,
  dna,
  activePresetName,
  presetCount,
  onNavigateTab,
  onOpenStory,
}: OverviewManifestoProps) {
  const isId = lang === 'id';
  const accentHex = dna.accent.accentLight;
  const moodLabel = activePresetName ?? dna.atmosphere.name;

  return (
    <section
      className="mh-effort-canvas"
      aria-labelledby="mh-effort-heading"
    >
      {/* Part A: Real Product Mini-Screen Comparison (Same UI Content, Raw vs Mehan) */}
      <div className="mh-compare-stage">
        <div className="mh-tilt-col">
          <div className="mh-mini-screen mh-mini-screen-raw" aria-hidden="true">
            <div className="mh-mini-head">
              <span className="mh-mini-avatar is-raw">SR</span>
              <div className="mh-mini-titles">
                <strong className="mh-mini-title-raw">
                  {isId ? 'Rilis Produk v2.4' : 'Product Release v2.4'}
                </strong>
                <span className="mh-mini-sub">
                  {isId ? 'Sinkronisasi Desain & Web' : 'Design & Web Sync'}
                </span>
              </div>
              <span className="mh-mini-chip-raw">84%</span>
            </div>

            <div className="mh-mini-meter-raw">
              <span style={{width: '84%'}} />
            </div>

            <div className="mh-mini-tags-raw">
              <span>React</span>
              <span>HTML</span>
              <span>Figma</span>
            </div>

            <div className="mh-mini-btn-raw">
              {isId ? 'Terbitkan Pembaruan' : 'Publish Update'}
            </div>
          </div>
          <span className="mh-compare-caption">
            {isId ? 'UI datar generik' : 'Generic flat UI'}
          </span>
        </div>

        <SceneForgeBridge accentHex={accentHex} />

        <div className="mh-tilt-col">
          <div className="mh-mini-screen mh-mini-screen-crafted" aria-hidden="true">
            <div className="mh-mini-head">
              <span className="mh-mini-avatar is-crafted">SR</span>
              <div className="mh-mini-titles">
                <strong className="mh-mini-title-crafted">
                  {isId ? 'Rilis Produk v2.4' : 'Product Release v2.4'}
                </strong>
                <span className="mh-mini-sub">
                  {isId ? 'Sinkronisasi Desain & Web' : 'Design & Web Sync'}
                </span>
              </div>
              <span className="mh-mini-chip-crafted">84%</span>
            </div>

            <div className="mh-mini-meter-crafted">
              <span style={{width: '84%'}} />
            </div>

            <div className="mh-mini-tags-crafted">
              <span>React</span>
              <span>HTML</span>
              <span>Figma</span>
            </div>

            <div className="mh-mini-btn-crafted">
              {isId ? 'Terbitkan Pembaruan' : 'Publish Update'}
            </div>
          </div>
          <span className="mh-compare-caption is-accent">
            {isId ? `Dengan Mehan · ${moodLabel}` : `With Mehan · ${moodLabel}`}
          </span>
        </div>
      </div>

      <SceneForgeConverge accentHex={accentHex} />

      {/* Part B: Ultra-Clean Visual Compression Spine (Big Numbers + 2–4 Word Labels Only!) */}
      <div className="mh-thesis-compact">
        <Badge
          variant="purple"
          label={
            isId
              ? 'Meta Astryx × Sentuhan Desain Produk'
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
            <div className="mh-funnel-number mh-stat-purple">{presetCount}</div>
            <div className="mh-funnel-label">
              <span>
                {isId ? 'Tema Taktil & Bab UX' : 'Tactile Moods & UX Guides'}
              </span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </button>

          <div className="mh-distill-side-pill">
            <Sparkles size={12} aria-hidden="true" />
            <span>
              {isId
                ? '10+ font berlisensi siap offline'
                : '10+ licensed offline fonts'}
            </span>
          </div>
        </div>

        <SpineConnector accentHex={accentHex} />

        <div className="mh-distill-row" role="listitem">
          <div className="mh-distill-center">
            <div className="mh-funnel-number mh-stat-accent">1</div>
            <div className="mh-funnel-label">
              {isId ? 'Sistem Siap Pakai' : 'Drop-In Design System'}
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
