import { useEffect, useRef, useState } from "react";

export function useSelectionBox<T extends string>() {
  const ref = useRef<HTMLDivElement>(null);
  const selectionBoxRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef(new Map<T, HTMLDivElement>());

  const draggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const [selectedIcons, setSelectedIcons] = useState<T[]>([]);

  const registerIcon = (id: T) => (el: HTMLDivElement | null) => {
    if (el) iconRefs.current.set(id, el);
    else iconRefs.current.delete(id);
  };

  useEffect(() => {
    const el = ref.current;
    const box = selectionBoxRef.current;
    if (!el || !box) return;

    function getRect() {
      const r = box!.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    }

    function intersects(a: DOMRect, b: ReturnType<typeof getRect>) {
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }

    function updateSelection() {
      const selectionRect = getRect();
      const next: T[] = [];

      iconRefs.current.forEach((iconEl, id) => {
        if (intersects(iconEl.getBoundingClientRect(), selectionRect)) {
          next.push(id);
        }
      });

      setSelectedIcons(next);
    }

    function setBox(x: number, y: number, w: number, h: number) {
      box!.style.left = `${x}px`;
      box!.style.top = `${y}px`;
      box!.style.width = `${w}px`;
      box!.style.height = `${h}px`;
    }

    function onDown(e: PointerEvent) {
      if ((e.target as HTMLElement).closest(".computer-icon")) return;

      e.preventDefault();

      const rect = el!.getBoundingClientRect();
      draggingRef.current = true;

      startPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setSelectedIcons([]);
      box!.style.opacity = "1";
      setBox(startPosRef.current.x, startPosRef.current.y, 0, 0);

      el!.setPointerCapture(e.pointerId);
    }

    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;

      const rect = el!.getBoundingClientRect();

      const currentX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const currentY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const startX = startPosRef.current.x;
      const startY = startPosRef.current.y;

      setBox(Math.min(startX, currentX), Math.min(startY, currentY), Math.abs(currentX - startX), Math.abs(currentY - startY));

      updateSelection();
    }

    function onUp(e: PointerEvent) {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      box!.style.opacity = "0";

      if (el!.hasPointerCapture(e.pointerId)) {
        el!.releasePointerCapture(e.pointerId);
      }
    }

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return { ref, selectionBoxRef, selectedIcons, setSelectedIcons, registerIcon };
}
