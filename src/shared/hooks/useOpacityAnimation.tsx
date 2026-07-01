import { useEffect, useRef, useState } from "react";

type UseOpacityAnimationProps = {
  delay?: number;
  duration?: number;
  endOnScroll?: boolean;
  maxOpacity?: number;
  startOpacity?: number;
};

export const useOpacityAnimation = <T extends HTMLElement>({ delay = 0, duration = 1000, endOnScroll = false, maxOpacity = 1, startOpacity = 0 }: UseOpacityAnimationProps) => {
  const ref = useRef<T | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = String(startOpacity);
    }

    let frameId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;

    const stop = () => {
      stopped = true;

      setHasStarted(true);
      setHasEnded(true);
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }

      if (ref.current) {
        ref.current.style.opacity = String(maxOpacity);
      }
    };

    const animate = (start: number) => (time: number) => {
      if (stopped || !ref.current) return;

      const t = Math.min((time - start) / duration, 1);
      const opacity = startOpacity + (maxOpacity - startOpacity) * t;

      ref.current.style.opacity = String(opacity);

      if (t < 1) {
        setHasEnded(true);
        frameId = requestAnimationFrame(animate(start));
      }
    };

    if (endOnScroll) {
      window.addEventListener("scroll", stop, { once: true, passive: true });
    }

    timeoutId = setTimeout(() => {
      if (stopped) return;

      setHasStarted(true);

      const start = performance.now();
      frameId = requestAnimationFrame(animate(start));
    }, delay);

    return () => {
      stopped = true;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", stop);
    };
  }, [delay, duration, endOnScroll, maxOpacity, startOpacity]);

  return { ref, hasStarted, hasEnded };
};
