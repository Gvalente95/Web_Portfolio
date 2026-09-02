import { useEffect, useState } from "react";

type CounterCurve = "linear" | "ease-in" | "ease-out" | "ease-in-out";

interface UseTextCounterProps {
  from?: number;
  end: number;
  duration?: number;
  curve?: CounterCurve;
  decimals?: number;
  autoStart?: boolean;
}

function easing(t: number, curve: CounterCurve) {
  switch (curve) {
    case "ease-in":
      return t * t;
    case "ease-out":
      return 1 - Math.pow(1 - t, 2);
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case "linear":
    default:
      return t;
  }
}

export function useTextCounter({ from = 0, end, duration = 1000, curve = "linear", decimals = 0, autoStart = true }: UseTextCounterProps) {
  const [value, setValue] = useState(from);
  const [running, setRunning] = useState(autoStart);
  const [to, setTo] = useState(end);

  useEffect(() => {
    if (!running) return;

    let frame = 0;
    let startTime: number | null = null;

    function update(time: number) {
      if (startTime === null) startTime = time;

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress, curve);
      const next = from + (to - from) * eased;

      setValue(Number(next.toFixed(decimals)));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setValue(to);
        setRunning(false);
      }
    }

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [from, to, duration, curve, decimals, running]);

  function start(to?: number) {
    if (to) setTo(to);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setValue(from);
  }

  return {
    count: value,
    start,
    stop,
    reset,
    running,
  };
}
