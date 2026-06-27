import { useEffect, useRef, useState } from "react";

export function useScrollDistance() {
  const ref = useRef<HTMLElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = window.innerHeight / 2 + rect.height / 2;
      const t = Math.max(0, 1 - distance / maxDistance);
      setScrollDistance(t);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, scrollDistance };
}
