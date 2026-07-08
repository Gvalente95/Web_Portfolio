import GearIcon0 from "@/assets/svg/gear0.svg?react";
import GearIcon1 from "@/assets/svg/gear1.svg?react";
import GearIcon2 from "@/assets/svg/gear2.svg?react";
import GearIcon3 from "@/assets/svg/gear3.svg?react";
import GearIcon4 from "@/assets/svg/gear4.svg?react";
import GearIcon5 from "@/assets/svg/gear5.svg?react";
import GearIcon6 from "@/assets/svg/gear6.svg?react";
import GearIcon7 from "@/assets/svg/gear7.svg?react";
import GearIcon8 from "@/assets/svg/gear8.svg?react";
import GearIcon9 from "@/assets/svg/gear9.svg?react";
import GearIcon10 from "@/assets/svg/gear10.svg?react";
import GearIcon11 from "@/assets/svg/gear11.svg?react";
import GearIcon12 from "@/assets/svg/gear12.svg?react";
import GearIcon13 from "@/assets/svg/gear13.svg?react";
import GearIcon14 from "@/assets/svg/gear14.svg?react";
import GearIcon15 from "@/assets/svg/gear15.svg?react";
import GearIcon16 from "@/assets/svg/gear16.svg?react";
import GearIcon17 from "@/assets/svg/gear17.svg?react";
import GearIcon18 from "@/assets/svg/gear18.svg?react";

import "./style.css";
import { useSpinObject } from "@/hooks/useSpinObject";
import { useEffect, useState } from "react";
import { r_range_int } from "@/utils/math";

const icons = [
  GearIcon0,
  GearIcon1,
  GearIcon2,
  GearIcon3,
  GearIcon4,
  GearIcon5,
  GearIcon6,
  GearIcon7,
  GearIcon8,
  GearIcon9,
  GearIcon10,
  GearIcon11,
  GearIcon12,
  GearIcon13,
  GearIcon14,
  GearIcon15,
  GearIcon16,
  GearIcon17,
  GearIcon18,
];

const numIcons = 18;

interface GearProps {
  left?: number;
  top?: number;
  size: number;
  iconIdx?: number;
  color?: string;
  onSpinChange?: (rotation: number) => void;
  onSpinStop?: () => void;
  isReverse?: boolean;
  forcedRotation?: number | null | undefined;
  direction: number;
  rotationSpeed?: number;
}

export function ControllableGear({
  color = "var(--accent-strong)",
  forcedRotation,
  left = 0,
  top = 0,
  isReverse = false,
  size = 32,
  direction,
  rotationSpeed,
  iconIdx = r_range_int(0, numIcons),
  onSpinChange,
  onSpinStop,
}: GearProps) {
  const { ref, spinDelta } = useSpinObject({ axes: ["z"], drag: true, resetRotation: false });
  const Icon = icons[iconIdx % numIcons];
  const [isMoving, setIsMoving] = useState(false);

  const hasForcedRotation = forcedRotation !== null && forcedRotation !== undefined;

  useEffect(() => {
    onSpinChange?.(spinDelta.z);
    const currentlyMoving = Math.abs(spinDelta.dz) > 0.01;
    setIsMoving(currentlyMoving);
    if (!currentlyMoving) onSpinStop?.();
  }, [spinDelta, onSpinChange]);

  const className = `icon controllable gear-icon${isMoving || hasForcedRotation ? "" : " automated"}${isReverse ? " rev" : ""}`;

  return (
    <Icon
      ref={ref}
      style={
        {
          width: size,
          left,
          top,
          color,
          ...(hasForcedRotation && {
            "--gear-direction": direction,
            "--gear-rotation": `${forcedRotation}deg`,
          }),
          ...(!hasForcedRotation && {
            "--gear-rotation--speed": `${rotationSpeed}s`,
          }),
        } as React.CSSProperties
      }
      className={className}
    />
  );
}

export function AutomatedGear({
  rotationSpeed = 8,
  color = "var(--accent)",
  left = 0,
  top = 0,
  size = 32,
  forcedRotation,
  isReverse = false,
  iconIdx = r_range_int(0, numIcons),
  direction = 1,
}: GearProps) {
  const Icon = icons[iconIdx % numIcons];
  const hasForcedRotation = forcedRotation !== null && forcedRotation !== undefined;

  const style = {
    width: size,
    left,
    top,
    color,
    ...(hasForcedRotation && {
      "--gear-direction": direction,
      "--gear-rotation": `${forcedRotation}deg`,
    }),
    ...(!hasForcedRotation && {
      "--gear-rotation--speed": `${rotationSpeed}s`,
    }),
  } as React.CSSProperties;

  const className = `icon gear-icon${hasForcedRotation ? "" : " automated"}${isReverse ? " rev" : ""}`;

  return <Icon style={style} className={className} />;
}
