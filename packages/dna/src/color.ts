/**
 * Perceptual OKLCH <-> sRGB color engine & WCAG 2.2 contrast solver.
 * Zero external dependencies — deterministic across Node, browsers, and workers.
 */

export interface RgbColor {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
}

export interface OklchColor {
  l: number; // 0..1
  c: number; // 0..0.4
  h: number; // 0..360
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

export function normalizeHex(hex: string): string {
  const clean = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`.toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean.toLowerCase()}`;
  }
  throw new Error(`Invalid sRGB hex color: "${hex}"`);
}

export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex);
  return {
    r: parseInt(norm.slice(1, 3), 16),
    g: parseInt(norm.slice(3, 5), 16),
    b: parseInt(norm.slice(5, 7), 16),
  };
}

export function rgbToHex({r, g, b}: RgbColor): string {
  const toByte = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

export function withHexAlpha(hex: string, alpha01: number): string {
  const base = normalizeHex(hex);
  const byte = clamp(Math.round(alpha01 * 255), 0, 255)
    .toString(16)
    .padStart(2, '0');
  return `${base}${byte}`;
}

export function hexToRgbaCss(hex: string, alpha01: number): string {
  const {r, g, b} = hexToRgb(hex);
  const a = Number(clamp(alpha01, 0, 1).toFixed(3));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function mixHex(hexA: string, hexB: string, weightB: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const t = clamp(weightB, 0, 1);
  return rgbToHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

function srgbToLinear(channel255: number): number {
  const v = channel255 / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb255(v: number): number {
  const c = clamp(v, 0, 1);
  const s = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return clamp(Math.round(s * 255), 0, 255);
}

export function relativeLuminance(hex: string): number {
  const {r, g, b} = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

export function contrastRatio(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function hexToOklch(hex: string): OklchColor {
  const {r, g, b} = hexToRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.hypot(A, B);
  const H = C < 1e-6 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return {l: clamp(L, 0, 1), c: C, h: H};
}

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const rad = (h * Math.PI) / 180;
  const A = c * Math.cos(rad);
  const B = c * Math.sin(rad);

  const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
  const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
  const s_ = l - 0.0894841775 * A - 1.291485548 * B;

  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;

  return [
    +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
    -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
    -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
  ];
}

function inGamut([r, g, b]: [number, number, number]): boolean {
  return r >= -1e-4 && r <= 1.0001 && g >= -1e-4 && g <= 1.0001 && b >= -1e-4 && b <= 1.0001;
}

/** Gamut-clamped OKLCH -> #rrggbb sRGB hex via binary search on chroma. */
export function oklchToHex(l: number, c: number, h: number): string {
  const L = clamp(l, 0, 1);
  if (L <= 0.001) return '#000000';
  if (L >= 0.999) return '#ffffff';

  let low = 0;
  let high = Math.max(0, c);
  let rgb = oklchToLinearRgb(L, high, h);
  if (!inGamut(rgb)) {
    for (let i = 0; i < 18; i++) {
      const mid = (low + high) / 2;
      const test = oklchToLinearRgb(L, mid, h);
      if (inGamut(test)) {
        low = mid;
      } else {
        high = mid;
      }
    }
    rgb = oklchToLinearRgb(L, low, h);
  }
  return rgbToHex({
    r: linearToSrgb255(rgb[0]),
    g: linearToSrgb255(rgb[1]),
    b: linearToSrgb255(rgb[2]),
  });
}

/**
 * Adjusts `candidateHex` lightness in OKLCH space while preserving hue so it
 * achieves at least `minRatio` contrast against `bgHex`.
 */
export function ensureContrast(
  candidateHex: string,
  bgHex: string,
  minRatio: number,
  preferDirection?: 'darker' | 'lighter',
): string {
  if (contrastRatio(candidateHex, bgHex) >= minRatio) {
    return normalizeHex(candidateHex);
  }
  const {l, c, h} = hexToOklch(candidateHex);
  const bgLum = relativeLuminance(bgHex);
  const dir = preferDirection ?? (bgLum > 0.35 ? 'darker' : 'lighter');

  let best = normalizeHex(candidateHex);
  for (let step = 1; step <= 80; step++) {
    const delta = (step / 80) * (dir === 'darker' ? -l : 1 - l);
    const nextHex = oklchToHex(clamp(l + delta, 0.04, 0.97), c, h);
    best = nextHex;
    if (contrastRatio(nextHex, bgHex) >= minRatio) {
      return nextHex;
    }
  }
  return best;
}
