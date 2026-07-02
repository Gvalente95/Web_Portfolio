import { lerpColor } from "../../utils/colors";
import { isMobile } from "../../utils/navigation";
import { useMarchingBlobs } from "./hooks";

export const CreativeCanvas = () => {
  const size = { width: window.innerWidth, height: window.innerHeight };
  const strokeWidth = 8;
  const resolution = isMobile() ? 64 : 16;
  const { blobPath } = useMarchingBlobs({ size, resolution });

  const scrollYNorm = window.scrollY / 200;
  const curClr = lerpColor("rgba(0, 255, 132, 0.2)", "rgba(255, 184, 77, 0.1)", scrollYNorm);
  //   const curClr = "var(--text)";

  return (
    <div className="creative-blur-zone">
      <div className="creative-layer" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <svg className="creative-canvas" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
          <defs>
            <filter id="blob-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="soft" />
              <feGaussianBlur in="soft" stdDeviation="20" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="soft" />
              </feMerge>
            </filter>
          </defs>
          <path d={blobPath} fill={curClr} stroke={curClr} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
