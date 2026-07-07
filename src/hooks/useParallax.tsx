import { useEffect, useRef } from "react";

export function useParallax({ speed }: { speed: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;

      if (!ref.current) return;

      ref.current.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    }

    function onScroll() {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    }

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
