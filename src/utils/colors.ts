import { lerp } from "./math";

function getRGB(color: string): { r: number; g: number; b: number } {
  const m = String(color)
    .trim()
    .match(/^\s*rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*[\d.]+)?\)\s*$/i);
  if (!m) return { r: 255, g: 255, b: 255 };
  const rgb = [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
  if (rgb.some((v) => v < 0 || v > 255)) return { r: 255, g: 255, b: 255 };
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

function getRGBA(color: string): { r: number; g: number; b: number; a: number } {
  const m = color.trim().match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (!m) return { r: 255, g: 255, b: 255, a: 1 };
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  const a = m[4] !== undefined ? Number(m[4]) : 1;
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
    return { r: 255, g: 255, b: 255, a: 1 };
  }
  return { r, g, b, a };
}

export function setAlpha(color: string, alpha: number): string {
  const { r, g, b } = getRGB(color);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function getRainbowColor(frame: number, speed = 0.002): string {
  const r = Math.floor(127 * Math.sin(speed * frame + 0) + 128);
  const g = Math.floor(127 * Math.sin(speed * frame + 2) + 128);
  const b = Math.floor(127 * Math.sin(speed * frame + 4) + 128);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getTimeColor(frame: number): string {
  let phase = 50;
  let t = frame;
  let tr = t % 255;
  let tg = (t + phase) % 255;
  let tb = (t + phase * 2) % 255;
  return `rgb(${tr}, ${tg}, ${tb})`;
}

export function getRandomColor(): string {
  const randValue = () => {
    return Math.floor(Math.random() * 255);
  };
  return `rgb(${randValue}, ${randValue}, ${randValue})`;
}

export function setBrightness(color: string, minLuminance = 150): string | number[] {
  let r, g, b;
  let returnAsString = false;
  if (typeof color === "string") {
    const matches = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!matches) return color;
    r = parseInt(matches[1]);
    g = parseInt(matches[2]);
    b = parseInt(matches[3]);
    returnAsString = true;
  } else if (Array.isArray(color)) {
    r = color[0];
    g = color[1];
    b = color[2];
  } else return color;
  let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  if (luminance < minLuminance && luminance > 0) {
    const scale = minLuminance / luminance;
    r = Math.min(255, Math.round(r * scale));
    g = Math.min(255, Math.round(g * scale));
    b = Math.min(255, Math.round(b * scale));
  }
  if (returnAsString) return `rgb(${r}, ${g}, ${b})`;
  return [r, g, b];
}

export function lerpColor(c1: string, c2: string, t: number) {
  const a = getRGBA(c1);
  const b = getRGBA(c2);
  return `rgba(
    ${Math.round(lerp(a.r, b.r, t))},
    ${Math.round(lerp(a.g, b.g, t))},
    ${Math.round(lerp(a.b, b.b, t))},
    ${lerp(a.a, b.a, t)}
  )`;
}
