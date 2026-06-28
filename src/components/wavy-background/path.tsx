import type { PositionedShapeSection, SectionShapeType } from "./Wavy_background";

export const shapeLR = (shape: SectionShapeType = "wave", y: number, amp = 8, phase = 0) => {
  if (shape === "zigzag") return zigzagLR(y, amp);
  if (shape === "square") return squareLR(y, amp);
  return waveLR(y, amp, phase);
};

export const shapeLRSliding = (shape: SectionShapeType = "wave", y: number, amp = 8, phase = 0) => {
  if (shape === "zigzag") return zigzagLRSliding(y, amp);
  if (shape === "square") return squareLRSliding(y, amp);
  return waveLRSliding(y, amp, phase);
};

const shapeBack = (shape: SectionShapeType = "wave", y: number, amp = 8, phase = 0) => {
  if (shape === "zigzag") return zigzagBack(y, amp);
  if (shape === "square") return squareBack(y, amp);
  return waveBack(y, amp, phase);
};

const zigzagLR = (y: number, amp = 8) => `
  M0,${y}
  L12.5,${y - amp}
  L25,${y + amp}
  L37.5,${y - amp}
  L50,${y + amp}
  L62.5,${y - amp}
  L75,${y + amp}
  L87.5,${y - amp}
  L100,${y}
`;

export const zigzagLRSliding = (y: number, amp = 8) => `
  M-12,${y}
  L0,${y}
  L12.5,${y - amp}
  L25,${y + amp}
  L37.5,${y - amp}
  L50,${y + amp}
  L62.5,${y - amp}
  L75,${y + amp}
  L87.5,${y - amp}
  L100,${y}
  L112,${y}
`;

const zigzagBack = (y: number, amp = 8) => `
  L87.5,${y - amp}
  L75,${y + amp}
  L62.5,${y - amp}
  L50,${y + amp}
  L37.5,${y - amp}
  L25,${y + amp}
  L12.5,${y - amp}
  L0,${y}
`;

export const squareLR = (y: number, amp = 8) => `
  M0,${y}
  L12.5,${y}
  L12.5,${y - amp}
  L25,${y - amp}
  L25,${y + amp}
  L37.5,${y + amp}
  L37.5,${y - amp}
  L50,${y - amp}
  L50,${y + amp}
  L62.5,${y + amp}
  L62.5,${y - amp}
  L75,${y - amp}
  L75,${y + amp}
  L87.5,${y + amp}
  L87.5,${y}
  L100,${y}
`;

export const squareLRSliding = (y: number, amp = 8) => `
  M-12,${y}
  L0,${y}
  L12.5,${y}
  L12.5,${y - amp}
  L25,${y - amp}
  L25,${y + amp}
  L37.5,${y + amp}
  L37.5,${y - amp}
  L50,${y - amp}
  L50,${y + amp}
  L62.5,${y + amp}
  L62.5,${y - amp}
  L75,${y - amp}
  L75,${y + amp}
  L87.5,${y + amp}
  L87.5,${y}
  L100,${y}
  L112,${y}
`;

const squareBack = (y: number, amp = 8) => `
  L87.5,${y}
  L87.5,${y + amp}
  L75,${y + amp}
  L75,${y - amp}
  L62.5,${y - amp}
  L62.5,${y + amp}
  L50,${y + amp}
  L50,${y - amp}
  L37.5,${y - amp}
  L37.5,${y + amp}
  L25,${y + amp}
  L25,${y - amp}
  L12.5,${y - amp}
  L12.5,${y}
  L0,${y}
`;

export const waveLR = (y: number, amp = 8, phase = 0) => {
  const p = phase;

  return `
	M0,${y}
	C${20 + p},${y - amp} ${35 + p},${y + amp} 55,${y}
	C${75 + p},${y - amp} ${90 + p},${y + amp} 100,${y}
  `;
};

export const waveLRSliding = (y: number, amp = 8, phase = 0) => {
  const p = phase;
  const edgeAmp = amp * 0.35;

  return `
	M-12,${y}
	C-8,${y - edgeAmp} -4,${y - edgeAmp} 0,${y}

	C${20 + p},${y - amp} ${35 + p},${y + amp} 55,${y}
	C${75 + p},${y - amp} ${90 + p},${y + amp} 100,${y}

	C104,${y + edgeAmp} 108,${y + edgeAmp} 112,${y}
  `;
};

export const waveBack = (y: number, amp = 8, phase = 0) => {
  const p = phase;

  return `
	C${90 + p},${y + amp} ${75 + p},${y - amp} 55,${y}
	C${35 + p},${y + amp} ${20 + p},${y - amp} 0,${y}
  `;
};

export const shapeSegment = (section: PositionedShapeSection) => `
  ${shapeLR(section.topShape, section.top, section.topAmp, section.topPhase)}
  L100,${section.bottom}
  ${shapeBack(section.bottomShape, section.bottom, section.bottomAmp, section.bottomPhase)}
  Z
`;

export const bakePath = (path: string, samples = 200) => {
  const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svgPath.setAttribute("d", path);

  const length = svgPath.getTotalLength();

  return Array.from({ length: samples }, (_, i) => {
    const t = i / (samples - 1);
    const point = svgPath.getPointAtLength(length * t);
    return { x: point.x, y: point.y };
  });
};
