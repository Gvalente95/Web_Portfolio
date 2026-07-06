import { useState, useRef, useEffect } from "react";

import { r_range_int } from "../utils/math";
type TextEffectType = "random" | "scroll" | "all" | "shuffle" | "_";
type TextEffectData = { target: string; start?: string; delay?: number; duration?: number; stepDuration?: number; type?: TextEffectType };
export function useTextEffect({ target, start = "", delay = 0, duration = 2000, stepDuration = 0, type = "random" }: TextEffectData) {
  const [text, setText] = useState(start);
  const letterStartRef = useRef(0);
  const idx = useRef(0);
  const durationPerLetter = duration / target.length;
  const lockedIndexes = useRef<Set<number>>(new Set());
  const unsortedIndexes = useRef<number[]>([]);
  function getRandomChar() {
    return String.fromCharCode(Math.floor(Math.random() * (126 - 32 + 1)) + 32);
  }
  useEffect(() => {
    let frame = 0;
    let timeout = 0;
    let done = false;
    if (type === "shuffle") {
      unsortedIndexes.current = Array.from({ length: target.length }, (_, i) => i);
      lockedIndexes.current = new Set();
      idx.current = unsortedIndexes.current[r_range_int(0, unsortedIndexes.current.length)];
    } else idx.current = 0;
    letterStartRef.current = performance.now();
    setText(" ".repeat(target.length));
    const loop = () => {
      if (done) return;
      setText(() => {
        const now = performance.now();
        if (idx.current >= target.length) {
          done = true;
          return target;
        }
        if (now - letterStartRef.current > durationPerLetter) {
          letterStartRef.current = now;
          if (type === "shuffle") {
            lockedIndexes.current.add(idx.current);
            unsortedIndexes.current = unsortedIndexes.current.filter((i) => i !== idx.current);
            if (unsortedIndexes.current.length === 0) {
              done = true;
              return target;
            }
            idx.current = unsortedIndexes.current[r_range_int(0, unsortedIndexes.current.length)];
          } else idx.current += 1;
        }
        return target
          .split("")
          .map((char, i) => {
            if (type === "shuffle" && lockedIndexes.current.has(i)) return char;
            if (type !== "shuffle" && i < idx.current) return char;
            if (char === " ") return " ";
            if (i === idx.current && type === "_") return "_";
            if (type !== "scroll" && (i === idx.current || type === "all" || type === "shuffle")) {
              return getRandomChar();
            }
            return " ";
          })
          .join("");
      });
      setTimeout(() => {
        frame = requestAnimationFrame(loop);
      }, stepDuration);
    };
    timeout = window.setTimeout(loop, delay);
    return () => {
      done = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [target, delay, duration]);
  return { text };
}
