export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function r_range_int(min: number, max: number) {
  return Math.floor(min + Math.random() * max - (max - min));
}

export function roll(chance: number) {
  return r_range_int(0, 100) > chance;
}
