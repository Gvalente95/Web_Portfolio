import { useEffect, useRef, useState } from "react";

interface UseIntersectionProps {
  enterThreshold?: number;
  leaveThreshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useIntersection<T extends HTMLElement = HTMLDivElement>({
  enterThreshold = 0.4,
  leaveThreshold = 0.3,
  root = null,
  rootMargin = "0px",
  once = false,
  onEnter,
  onLeave,
}: UseIntersectionProps = {}) {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const currentlyInside = isIntersectingRef.current;

        const next = currentlyInside ? ratio > leaveThreshold : ratio >= enterThreshold;

        if (currentlyInside === next) return;

        isIntersectingRef.current = next;
        setEntry(entry);
        setIsIntersecting(next);

        if (next) onEnter?.();
        else onLeave?.();

        if (once && next) observer.disconnect();
      },
      {
        threshold: [leaveThreshold, enterThreshold],
        root,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enterThreshold, leaveThreshold, root, rootMargin, once, onEnter, onLeave]);

  return {
    ref,
    isIntersecting,
    entry,
  };
}
