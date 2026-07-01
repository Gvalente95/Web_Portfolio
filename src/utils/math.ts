export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function roll(chance: number) {
  return r_range_int(0, 100) > chance;
}

export function f_range(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function r_range_int(min: number, max: number) {
  return Math.floor(f_range(min, max));
}
