import { useState } from "react";
import { AutomatedGear, ControllableGear } from "./Gear/Gear";
import { lerpColor } from "@/utils/colors";

import "./style.css";

interface GearArcProps {
  amount?: number;
  gearSize?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  left?: number | string;
  top?: number | string;
  sizeRatios?: number[];
  colorA?: string;
  colorB?: string;
  rotationSpeed?: number;
}

export function GearArc({
  colorA = "rgb(239, 132, 2)",
  colorB = "rgba(255, 255, 255, 1)",
  left = 0,
  top = 0,
  sizeRatios = [],
  amount = 10,
  gearSize,
  radius = 240,
  startAngle = 0,
  endAngle = 360,
  rotationSpeed = 8,
}: GearArcProps) {
  const [mainRot, setMainRot] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const ratios = Array.from({ length: amount }, (_, idx) => sizeRatios[idx % sizeRatios.length] ?? 1);
  const arcRad = ((endAngle - startAngle) * Math.PI) / 180;
  const isClosed = Math.abs(Math.abs(endAngle - startAngle) - 360) < 0.001;

  const spacingCount = isClosed ? amount : amount - 1;

  const ratioDistanceSum = Array.from({ length: spacingCount }, (_, idx) => {
    const a = ratios[idx];
    const b = ratios[(idx + 1) % amount];
    return (a + b) / 2;
  }).reduce((sum, v) => sum + v, 0);

  const baseSize = gearSize ?? (Math.abs(arcRad) * radius) / ratioDistanceSum;

  let currentAngle = (startAngle * Math.PI) / 180;

  return (
    <div className="gear-container" style={{ left, top }}>
      {Array.from({ length: amount }, (_, idx) => {
        const ratio = ratios[idx];
        const currentSize = baseSize * ratio;

        if (idx > 0) {
          const prevRatio = ratios[idx - 1];
          const centerDistance = baseSize * ((prevRatio + ratio) / 2);
          currentAngle += Math.sign(arcRad) * (centerDistance / radius);
        }

        const x = Math.cos(currentAngle) * radius - currentSize / 2;
        const y = Math.sin(currentAngle) * radius - currentSize / 2;

        let direction = idx % 2 === 0 ? -1 : 1;

        if (activeIdx !== null && activeIdx % 2 === 0) {
          direction = direction === 1 ? -1 : 1;
        }

        const t = amount <= 1 ? 0 : idx / (amount - 1);
        const color = lerpColor(colorA, colorB, t);
        const Component = activeIdx !== null && activeIdx !== idx ? AutomatedGear : ControllableGear;

        return (
          <Component
            color={color}
            key={idx}
            iconIdx={idx + 3}
            left={x}
            top={y}
            size={currentSize}
            direction={direction}
            forcedRotation={mainRot}
            isReverse={direction === 1}
            onSpinChange={(v) => {
              setMainRot(v);
              setActiveIdx(idx);
            }}
            onSpinStop={() => {
              setMainRot(null);
              setActiveIdx(null);
            }}
            rotationSpeed={rotationSpeed * ratio}
          />
        );
      })}
    </div>
  );
}
