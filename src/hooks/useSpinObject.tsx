import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils/math";

type SpinAxis = "x" | "y" | "z";

type UseSpinObjectProps = {
  axes?: SpinAxis[];
  sensitivity?: number;
  drag?: boolean;
  friction?: number;
  onSpin?: (spinDelta: SpinDelta) => void;
  onSpinStart?: () => void;
  onSpinEnd?: () => void;
  onSpinMove?: () => void;
  resetRotation?: boolean;
  clampAxes?: { x: number; y: number; z: number };
};

type SpinDelta = {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
};

export function useSpinObject({
  axes = ["z"],
  sensitivity = 0.5,
  drag = false,
  friction = 0.95,
  onSpin,
  onSpinStart,
  onSpinEnd,
  onSpinMove,
  resetRotation = true,
  clampAxes = { x: Infinity, y: Infinity, z: Infinity },
}: UseSpinObjectProps = {}) {
  const ref = useRef<any>(null);

  const spinDeltaRef = useRef<SpinDelta>({ x: 0, y: 0, z: 0, dx: 0, dy: 0, dz: 0 });
  const [spinDelta, setSpinDelta] = useState(spinDeltaRef.current);
  const stateFrame = useRef(0);
  const moving = useRef(false);
  const dragging = useRef(false);
  const isResetting = useRef(false);
  const axesKey = axes.join(",");

  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0, z: 0 });
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const frame = useRef(0);

  function syncSpinState() {
    cancelAnimationFrame(stateFrame.current);
    stateFrame.current = requestAnimationFrame(() => {
      setSpinDelta({ ...spinDeltaRef.current });
    });
  }

  const applyTransform = () => {
    if (!ref.current) return;

    const clampedX = clamp(rotation.current.x, -clampAxes.x, clampAxes.x);
    const clampedY = clamp(rotation.current.y, -clampAxes.y, clampAxes.y);
    const clampedZ = clamp(rotation.current.z, -clampAxes.z, clampAxes.z);

    ref.current.style.transform = `
  rotateX(${clampedX}deg)
  rotateY(${clampedY}deg)
  rotateZ(${clampedZ}deg)
`;

    ref.current.style.setProperty("--spin-x", String(clampedX));
    ref.current.style.setProperty("--spin-y", String(clampedY));
    ref.current.style.setProperty("--spin-z", String(clampedZ));

    spinDeltaRef.current = { x: clampedX, y: clampedY, z: clampedZ, dx: velocity.current.x, dy: velocity.current.y, dz: velocity.current.z };
    syncSpinState();
  };

  const animateMomentum = () => {
    if (!drag || dragging.current) return;

    const resetStrength = 0.03; // tweak

    rotation.current.x += velocity.current.x;
    rotation.current.y += velocity.current.y;
    rotation.current.z += velocity.current.z;

    if (resetRotation) {
      rotation.current.x -= rotation.current.x * resetStrength;
      rotation.current.y -= rotation.current.y * resetStrength;
      rotation.current.z -= rotation.current.z * resetStrength;
    }

    velocity.current.x *= friction;
    velocity.current.y *= friction;
    velocity.current.z *= friction;

    applyTransform();

    const stillMoving = Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01 || Math.abs(velocity.current.z) > 0.01;

    moving.current = stillMoving;

    if (stillMoving) {
      frame.current = requestAnimationFrame(animateMomentum);
    } else if (resetRotation) {
      isResetting.current = true;
      frame.current = requestAnimationFrame(animateMomentum);
    } else onSpinEnd?.();
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const activeAxes = axesKey.split(",") as SpinAxis[];

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();

      dragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };

      velocity.current = { x: 0, y: 0, z: 0 };
      cancelAnimationFrame(stateFrame.current);
      onSpinStart?.();
    };

    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault();
      if (!dragging.current || !ref.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      const nextVelocity = { x: 0, y: 0, z: 0 };

      if (activeAxes.includes("x")) nextVelocity.x = dy * sensitivity;
      if (activeAxes.includes("y")) nextVelocity.y = dx * sensitivity;
      if (activeAxes.includes("z")) nextVelocity.z = dx * sensitivity;

      rotation.current.x += nextVelocity.x;
      rotation.current.y += nextVelocity.y;
      rotation.current.z += nextVelocity.z;

      spinDeltaRef.current = { x: rotation.current.x, y: rotation.current.y, z: rotation.current.z, dx: velocity.current.x, dy: velocity.current.y, dz: velocity.current.z };

      velocity.current = nextVelocity;

      applyTransform();

      onSpin?.(spinDeltaRef.current);

      lastPos.current = { x: e.clientX, y: e.clientY };
      moving.current = true;
      onSpinMove?.();
    };

    const handlePointerUp = () => {
      dragging.current = false;

      if (drag) {
        frame.current = requestAnimationFrame(animateMomentum);
      } else if (onSpinEnd) onSpinEnd();
    };

    el.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(stateFrame.current);
    };
  }, [axesKey, sensitivity, drag, friction]);

  return { ref, isDragging: dragging.current, moving: moving.current, spinDelta };
}
