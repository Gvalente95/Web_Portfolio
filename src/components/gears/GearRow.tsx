import { useState } from "react";
import { ControllableGear, AutomatedGear } from "./Gear/Gear";
import { lerpColor } from "@/utils/colors";

import "./style.css";

interface GearRow {
  amount?: number;
  gearSize?: number;
  left?: number | string;
  top?: number | string;
  isHorizontal?: boolean;
  sizeRatios?: number[];
  rotationSpeed?: number;
  colorA?: string;
  colorB?: string;
}

export function GearRow({
  colorA = "rgb(239, 132, 2)",
  colorB = "rgba(255, 255, 255, 1)",
  rotationSpeed = 8,
  left = 0,
  top = 0,
  amount = 10,
  gearSize = 64,
  isHorizontal = true,
  sizeRatios = [],
}: GearRow) {
  let curCenter = 0;
  let prevRatio = sizeRatios[0] ?? 1;

  const [mainRot, setMainRot] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="gear-container" style={{ left, top }}>
      {Array.from({ length: amount }, (_, idx) => {
        const ratio = sizeRatios[idx % sizeRatios.length] ?? 1;
        const currentSize = gearSize * ratio;
        if (idx > 0) {
          const prevSize = gearSize * prevRatio;
          curCenter += (prevSize + currentSize) / 2;
        }
        prevRatio = ratio;
        const leftPos = isHorizontal ? curCenter - currentSize / 2 : (gearSize - currentSize) / 2;
        const topPos = isHorizontal ? (gearSize - currentSize) / 2 : curCenter - currentSize / 2;

        let direction = idx % 2 === 0 ? -1 : 1;
        if (activeIdx !== null && activeIdx % 2 === 0) direction = direction === 1 ? -1 : 1;
        const color = lerpColor(colorA, colorB, idx / amount);
        const Component = activeIdx !== null && activeIdx !== idx ? AutomatedGear : ControllableGear;

        return (
          <Component
            color={color}
            key={idx}
            iconIdx={idx + 0}
            left={leftPos}
            top={topPos}
            size={gearSize * ratio}
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
