type WaveSection = {
  h: number;
  color: string;
  amp?: number;
  phase?: number;
};

type PositionedWaveSection = WaveSection & {
  top: number;
  bottom: number;
  topAmp: number;
  bottomAmp: number;
  topPhase: number;
  bottomPhase: number;
};

import "./style.css";

const getMaxAmp = (sections: WaveSection[]) => Math.max(...sections.map((section) => section.amp ?? 8));

const getSectionPositions = (sections: WaveSection[]): PositionedWaveSection[] => {
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
    };
  });
};

const waveLR = (y: number, amp = 8, phase = 0) => {
  const p = phase;

  return `
    M0,${y}
    C${20 + p},${y - amp} ${35 + p},${y + amp} 55,${y}
    C${75 + p},${y - amp} ${90 + p},${y + amp} 100,${y}
  `;
};

const waveBack = (y: number, amp = 8, phase = 0) => {
  const p = phase;

  return `
    C${90 + p},${y + amp} ${75 + p},${y - amp} 55,${y}
    C${35 + p},${y + amp} ${20 + p},${y - amp} 0,${y}
  `;
};

const waveSegment = (top: number, bottom: number, topAmp = 8, bottomAmp = 8, topPhase = 0, bottomPhase = 0) => `
  ${waveLR(top, topAmp, topPhase)}
  L100,${bottom}
  ${waveBack(bottom, bottomAmp, bottomPhase)}
  Z
`;

export const WavyBackground = () => {
  const y = 800;
  const sections: WaveSection[] = [
    { h: 160, color: "rgb(68, 217, 230)", amp: 32 },
    { h: 800, color: "rgb(53, 170, 181)", amp: 64 },

    { h: 840, color: "rgb(255, 184, 77)", amp: 32 },
    { h: 840, color: "rgb(61, 220, 151)", amp: 128 },
    { h: 1000, color: "rgb(165, 52, 207)", amp: 128 },
  ];

  const padding = getMaxAmp(sections);
  const positionedSections = getSectionPositions(sections);
  const contentHeight = sections.reduce((sum, section) => sum + section.h, 0);
  const totalHeight = contentHeight + padding * 2;

  return (
    <svg
      className="wave-bg"
      style={{
        top: y - padding,
        height: totalHeight,
      }}
      viewBox={`0 ${-padding} 100 ${totalHeight}`}
      preserveAspectRatio="none"
    >
      {positionedSections.map((section, index) => (
        <path key={index} fill={section.color} d={waveSegment(section.top, section.bottom, section.topAmp, section.bottomAmp, section.topPhase, section.bottomPhase)} />
      ))}
    </svg>
  );
};
