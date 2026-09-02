import { useState, useEffect, useCallback, useRef } from "react";

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
  onEnd?: () => void;
  onStart?: () => void;
}

export function useTextEffect({ target, start = target, delay = 0, duration = 2000, stepDuration = 0, type = "random", autoStart = true, onEnd, onStart }: TextEffectProps) {
  const [curStart, setCurStart] = useState(start);
  const [text, setText] = useState(start);
  const [curTarget, setCurTarget] = useState(target);
  const [runId, setRunId] = useState(0);

  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onStartRef.current = onStart;
  }, [onStart]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const trigger = useCallback(() => {
    setRunId((value) => value + 1);
  }, []);

  const changeTarget = useCallback(
    (newTarget: string) => {
      setCurStart(text);
      setCurTarget(newTarget);
      setRunId((value) => value + 1);
    },
    [text],
  );

  const reset = useCallback(() => {
    setText(curStart);
  }, [curStart]);

  useEffect(() => {
    if (!autoStart && runId === 0) return;

    let frame = 0;
    let timeout = 0;
    let stepTimeout = 0;
    let done = false;
    let ended = false;

    const startTime = performance.now() + delay;
    const letterStartRef = { current: startTime };
    const idx = { current: 0 };
    const lockedIndexes = { current: new Set<number>() };
    const unsortedIndexes = { current: [] as number[] };

    const durationPerLetter = curTarget.length > 0 ? duration / curTarget.length : 0;

    const scrambleResolveTimes = Array.from({ length: curTarget.length }, () => duration * (0.75 + Math.random() * 0.25));

    function finish() {
      if (ended || type === "loop") return;

      ended = true;
      done = true;
      onEndRef.current?.();
    }

    function getRandomChar(char: string) {
      const isLowercase = char.toLowerCase() === char;
      const chars = isLowercase ? "____aefhklmnprstuvwxyz" : "____AEFHKLMNPRSTUVWXYZ";

      return chars[Math.floor(Math.random() * chars.length)];
    }

    if (type === "shuffle") {
      unsortedIndexes.current = Array.from({ length: curTarget.length }, (_, index) => index);

      if (unsortedIndexes.current.length > 0) {
        idx.current = unsortedIndexes.current[r_range_int(0, unsortedIndexes.current.length)];
      }
    }

    if (type === "loop") {
      setText(curTarget);
    } else {
      setText(" ".repeat(curTarget.length));
    }

    const loop = () => {
      if (done) return;

      setText((previousText) => {
        const now = performance.now();
        const elapsed = now - startTime;

        if (type === "loop") {
          if (previousText.length === 0) return previousText;
          return previousText.slice(1) + previousText[0];
        }

        if (type === "scramble") {
          if (elapsed >= duration) {
            finish();
            return curTarget;
          }

          return curTarget
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (elapsed >= scrambleResolveTimes[index]) return char;
              return getRandomChar(char);
            })
            .join("");
        }

        if (idx.current >= curTarget.length) {
          finish();
          return curTarget;
        }

        if (now - letterStartRef.current >= durationPerLetter) {
          letterStartRef.current = now;

          if (type === "shuffle") {
            lockedIndexes.current.add(idx.current);

            unsortedIndexes.current = unsortedIndexes.current.filter((index) => index !== idx.current);

            if (unsortedIndexes.current.length === 0) {
              finish();
              return curTarget;
            }

            idx.current = unsortedIndexes.current[r_range_int(0, unsortedIndexes.current.length)];
          } else {
            idx.current += 1;

            if (idx.current >= curTarget.length) {
              finish();
              return curTarget;
            }
          }
        }

        return curTarget
          .split("")
          .map((char, index) => {
            if (type === "shuffle" && lockedIndexes.current.has(index)) {
              return char;
            }

            if (index < idx.current) return char;
            if (char === " ") return " ";
            if (index === idx.current && type === "_") return "_";

            if (type !== "scroll" && (index === idx.current || type === "shuffle")) {
              return getRandomChar(char);
            }

            return " ";
          })
          .join("");
      });

      if (!done) {
        stepTimeout = window.setTimeout(() => {
          frame = requestAnimationFrame(loop);
        }, stepDuration);
      }
    };

    timeout = window.setTimeout(() => {
      if (curTarget.length === 0 && type !== "loop") {
        setText("");
        finish();
        return;
      }

      onStartRef.current?.();
      frame = requestAnimationFrame(loop);
    }, delay);

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      clearTimeout(stepTimeout);
    };
  }, [autoStart, curTarget, delay, duration, runId, stepDuration, type]);

  return {
    text,
    trigger,
    reset,
    changeTarget,
  };
}
