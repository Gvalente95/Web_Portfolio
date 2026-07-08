import { useState, useEffect, useCallback } from "react";

import { r_range_int } from "../utils/math";
type TextEffectType = "random" | "scroll" | "scramble" | "shuffle" | "_" | "loop";

interface TextEffectProps {
  target: string;
  start?: string;
  delay?: number;
  duration?: number;
  stepDuration?: number;
  type?: TextEffectType;
  autoStart?: boolean;
}
export function useTextEffect({ target, start = target, delay = 0, duration = 2000, stepDuration = 0, type = "random", autoStart = true }: TextEffectProps) {
  const [text, setText] = useState(start);
  const [runId, setRunId] = useState(0);

  const trigger = useCallback(() => {
    setRunId((v) => v + 1);
  }, []);

  useEffect(() => {
    if (!autoStart && runId === 0) return;

    let frame = 0;
    let timeout = 0;
    let stepTimeout = 0;
    let done = false;

    const startTime = performance.now();
    const letterStartRef = { current: performance.now() };
    const idx = { current: 0 };
    const lockedIndexes = { current: new Set<number>() };
    const unsortedIndexes = { current: [] as number[] };

    const durationPerLetter = duration / target.length;

    const scrambleResolveTimes = Array.from({ length: target.length }, () => {
      return duration * (0.75 + Math.random() * 0.25);
    });

    function getRandomChar(c: string) {
      const isMin = c.toLowerCase() === c;
      const chars = isMin ? "____aefhklmnprstuvwxyz" : "____AEFHKLMNPRSTUVWXYZ";
      return chars[Math.floor(Math.random() * chars.length)];
    }

    if (type === "shuffle") {
      unsortedIndexes.current = Array.from({ length: target.length }, (_, i) => i);
      idx.current = unsortedIndexes.current[r_range_int(0, unsortedIndexes.current.length)];
    }

    if (type === "loop") setText(target);
    else setText(" ".repeat(target.length));

    const loop = () => {
      if (done) return;

      setText((prev) => {
        const now = performance.now();
        const elapsed = now - startTime;

        if (type === "loop") {
          return prev.slice(1) + prev[0];
        }

        if (type === "scramble") {
          const next = target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (elapsed >= scrambleResolveTimes[i]) return char;
              return getRandomChar(char);
            })
            .join("");

          if (elapsed >= duration) {
            done = true;
            return target;
          }

          return next;
        }

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
          } else {
            idx.current += 1;
          }
        }

        return target
          .split("")
          .map((char, i) => {
            if (type === "shuffle" && lockedIndexes.current.has(i)) return char;
            if (i < idx.current) return char;
            if (char === " ") return " ";
            if (i === idx.current && type === "_") return "_";

            if (type !== "scroll" && (i === idx.current || type === "shuffle")) {
              return getRandomChar(char);
            }

            return " ";
          })
          .join("");
      });

      stepTimeout = window.setTimeout(() => {
        frame = requestAnimationFrame(loop);
      }, stepDuration);
    };

    timeout = window.setTimeout(loop, delay);

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      clearTimeout(stepTimeout);
    };
  }, [target, delay, duration, stepDuration, type, runId, autoStart]);

  return { text, trigger };
}
