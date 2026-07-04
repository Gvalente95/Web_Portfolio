import { useEffect, useRef, useState } from "react";

type SpinAxis = "x" | "y" | "z";

type UseSpinObjectProps = {
  axes?: SpinAxis[];
  sensitivity?: number;
  drag?: boolean;
  friction?: number;
  restorePosition?: boolean;
  restoreSpeed?: number;
};

export function useSpinObject({ axes = ["z"], sensitivity = 0.5, drag = true, friction = 0.95, restorePosition = false, restoreSpeed = 0.08 }: UseSpinObjectProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  const draggingRef = useRef(false);
  const movingRef = useRef(false);
  const restoringRef = useRef(false);

  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0, z: 0 });
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const frame = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const setMoving = (value: boolean) => {
    movingRef.current = value;
    setIsMoving(value);
  };

  const applyTransform = () => {
    if (!ref.current) return;

    ref.current.style.transform = `
      rotateX(${rotation.current.x}deg)
      rotateY(${rotation.current.y}deg)
      rotateZ(${rotation.current.z}deg)
    `;
  };

  const restoreRotation = () => {
    if (draggingRef.current) return;

    restoringRef.current = true;

    rotation.current.x += (0 - rotation.current.x) * restoreSpeed;
    rotation.current.y += (0 - rotation.current.y) * restoreSpeed;
    rotation.current.z += (0 - rotation.current.z) * restoreSpeed;

    applyTransform();

    const closeEnough = Math.abs(rotation.current.x) < 0.05 && Math.abs(rotation.current.y) < 0.05 && Math.abs(rotation.current.z) < 0.05;

    if (closeEnough) {
      rotation.current = { x: 0, y: 0, z: 0 };
      velocity.current = { x: 0, y: 0, z: 0 };
      restoringRef.current = false;
      setMoving(false);
      applyTransform();
      return;
    }

    frame.current = requestAnimationFrame(restoreRotation);
  };

  const animateMomentum = () => {
    if (!drag || draggingRef.current) return;

    rotation.current.x += velocity.current.x;
    rotation.current.y += velocity.current.y;
    rotation.current.z += velocity.current.z;

    velocity.current.x *= friction;
    velocity.current.y *= friction;
    velocity.current.z *= friction;

    applyTransform();

    const stillMoving = Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01 || Math.abs(velocity.current.z) > 0.01;

    if (stillMoving) {
      setMoving(true);
      frame.current = requestAnimationFrame(animateMomentum);
      return;
    }

    if (restorePosition) {
      frame.current = requestAnimationFrame(restoreRotation);
      return;
    }

    setMoving(false);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();

      draggingRef.current = true;
      restoringRef.current = false;

      setIsDragging(true);
      setMoving(true);

      lastPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0, z: 0 };

      cancelAnimationFrame(frame.current);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      const nextVelocity = { x: 0, y: 0, z: 0 };

      if (axes.includes("x")) nextVelocity.x = dy * sensitivity;
      if (axes.includes("y")) nextVelocity.y = dx * sensitivity;
      if (axes.includes("z")) nextVelocity.z = dx * sensitivity;

      rotation.current.x += nextVelocity.x;
      rotation.current.y += nextVelocity.y;
      rotation.current.z += nextVelocity.z;

      velocity.current = nextVelocity;

      applyTransform();

      lastPos.current = { x: e.clientX, y: e.clientY };
      setMoving(true);
    };

    const handlePointerUp = () => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      setIsDragging(false);

      if (drag) {
        frame.current = requestAnimationFrame(animateMomentum);
      } else if (restorePosition) {
        frame.current = requestAnimationFrame(restoreRotation);
      } else {
        setMoving(false);
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(frame.current);
    };
  }, [axes, sensitivity, drag, friction, restorePosition, restoreSpeed]);

  return { ref, isDragging, isMoving };
}
