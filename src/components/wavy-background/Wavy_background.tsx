export type SectionShapeType = "wave" | "zigzag" | "square";

type ShapeSection = {
  h: number;
  color: string;
  amp?: number;
  phase?: number;
  shape: SectionShapeType;
};

export type PositionedShapeSection = ShapeSection & {
  top: number;
  bottom: number;
  topAmp: number;
  bottomAmp: number;
  topPhase: number;
  bottomPhase: number;
  topShape: SectionShapeType;
  bottomShape: SectionShapeType;
};

export type PathData = {
  path: string;
  y: number;
  height: number;
  viewBoxMinY: number;
  viewBoxHeight: number;
  startY: number;
  endY: number;
  points: { x: number; y: number }[];
  color: string;
  shape: SectionShapeType;
};
export type WaveData = {
  sections: PositionedShapeSection[];
  paths: PathData[];
  svgTop: number;
  totalHeight: number;
  padding: number;
};

import { isMobile } from "../../utils/navigation";
import { bakePath, shapeLRSliding, shapeSegment } from "./path";

import "./style.css";

export const useWaveData = (): WaveData => {
  const mobile = isMobile();

  let y = 600;
  if (mobile) y += 160;

  let heights = [1090, 1000, 1000, 780, 0];
  if (mobile) heights = [750, 750, 750, 650, 0];

  const sections: ShapeSection[] = [
    { h: heights[0], color: "#2D9CB0", amp: 64, shape: "wave" },
    { h: heights[1], color: "#DFA245", amp: 64, shape: "wave" },
    { h: heights[2], color: "#34B97E", amp: 64, shape: "wave" },
    { h: heights[3], color: "#7444C4", amp: 64, shape: "wave" },
    { h: heights[4], color: "var(--contrast)", amp: 64, shape: "wave" },
  ];

  const padding = getMaxAmp(sections);
  const svgTop = y - padding;
  const positionedSections = getSectionPositions(sections);
  const contentHeight = sections.reduce((sum, section) => sum + section.h, 0);
  const totalHeight = contentHeight + padding * 2;

  const paths = positionedSections.map((section) => {
    const path = shapeLRSliding(section.topShape, section.top, section.topAmp, section.topPhase);
    return {
      path,
      y: svgTop,
      height: totalHeight,
      color: section.color,
      viewBoxMinY: -padding,
      viewBoxHeight: totalHeight,
      shape: section.shape,
      startY: svgTop + section.top,
      endY: svgTop + section.bottom,
      points: bakePath(path),
    };
  });

  return {
    sections: positionedSections,
    paths,
    svgTop: y - padding,
    totalHeight,
    padding,
  };
};

const getMaxAmp = (sections: ShapeSection[]) => Math.max(...sections.map((section) => section.amp ?? 8));

const getSectionPositions = (sections: ShapeSection[]): PositionedShapeSection[] => {
  let y = 0;

  return sections.map((section, index) => {
    const next = sections[index + 1];

    const top = y;
    const bottom = y + section.h;
    y = bottom;

    return {
      ...section,
      top,
      bottom,

      topAmp: section.amp ?? 8,
      bottomAmp: next?.amp ?? section.amp ?? 8,

      topPhase: section.phase ?? 0,
      bottomPhase: next?.phase ?? section.phase ?? 0,

      topShape: section.shape ?? "wave",
      bottomShape: next?.shape ?? section.shape ?? "wave",
    };
  });
};

interface WavybackgroundProps {
  sections: PositionedShapeSection[];
  svgTop: number;
  totalHeight: number;
  padding: number;
}
export const WavyBackground = ({ sections, svgTop, totalHeight, padding }: WavybackgroundProps) => {
  return (
    <svg
      className="wave-bg"
      style={{
        top: svgTop,
        height: totalHeight,
      }}
      viewBox={`0 ${-padding} 100 ${totalHeight}`}
      preserveAspectRatio="none"
    >
      {sections.map((section, index) => (
        <path key={index} fill={section.color} d={shapeSegment(section)} />
      ))}
    </svg>
  );
};
