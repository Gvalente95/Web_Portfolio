import { useEffect, useRef } from "react";
import { clamp } from "../utils/math";

type dragReturn = { normX: number; normY: number };
interface useDragObjectProps {
  onDrag: (v: dragReturn) => void;
  onDown?: (v: dragReturn) => void;
  onUp?: (v: dragReturn) => void;
}

export function useDragObject({ onDrag, onDown, onUp }: useDragObjectProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handle = dragRef.current;
    if (!handle) return;

    function getNormCoord(e: PointerEvent) {
      const rect = handle!.getBoundingClientRect();
      const normX = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const normY = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      return { normX, normY };
    }

    function handleDown(e: PointerEvent) {
      draggingRef.current = true;
      handle!.setPointerCapture(e.pointerId);
      onDown?.(getNormCoord(e));
    }

    function handleMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      onDrag?.(getNormCoord(e));
    }

    function handleUp(e: PointerEvent) {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      handle!.releasePointerCapture(e.pointerId);
      onUp?.(getNormCoord(e));
    }

    handle.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      handle.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [onDown, onDrag, onUp]);

  return { dragRef };
}
