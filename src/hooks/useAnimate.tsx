import { useEffect, useState } from "react";

interface UseAnimateProps {
  delays: number[];
  duration?: number;
  onReady?: () => void;
}

type TimerState = {
  started: boolean;
  done: boolean;
};

export function useAnimate({ delays, duration = 300, onReady }: UseAnimateProps) {
  const [timers, setTimers] = useState<TimerState[]>(() => delays.map(() => ({ started: false, done: false })));
  const delaysKey = delays.join(",");

  useEffect(() => {
    setTimers(delays.map(() => ({ started: false, done: false })));

    const timeouts = delays.flatMap((delay, index) => [
      setTimeout(() => {
        setTimers((prev) => prev.map((timer, i) => (i === index ? { ...timer, started: true } : timer)));
      }, delay),

      setTimeout(() => {
        setTimers((prev) => prev.map((timer, i) => (i === index ? { ...timer, done: true } : timer)));
      }, delay + duration),
    ]);

    const maxDelay = delays.length ? Math.max(...delays) + duration : 0;

    const readyTimeout = setTimeout(() => {
      onReady?.();
    }, maxDelay);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(readyTimeout);
    };
  }, [delaysKey, duration, onReady]);

  return timers;
}
