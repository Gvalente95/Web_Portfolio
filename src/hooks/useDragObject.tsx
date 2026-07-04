import { useEffect, useRef } from "react";

export function useDragObject({ onDrag }: { onDrag: (v: number) => void }) {
  const dragRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handle = dragRef.current;

    function update(e: PointerEvent) {
      if (!dragRef.current) return;

      const rect = dragRef.current.getBoundingClientRect();
      const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      onDrag(normX);
    }

    function onDown(e: PointerEvent) {
      draggingRef.current = true;
      handle?.setPointerCapture(e.pointerId);
    }

    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      update(e);
    }

    function onUp(e: PointerEvent) {
      draggingRef.current = false;
      handle?.releasePointerCapture(e.pointerId);
    }

    dragRef.current?.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      handle?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onDrag]);

  return { dragRef };
}
