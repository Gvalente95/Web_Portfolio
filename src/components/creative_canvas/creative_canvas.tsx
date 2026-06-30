import { useEffect, useState } from "react";
import { lerpColor } from "../../utils/colors";
import { useDocumentSize, useMarchingBlobs } from "./hooks";

export const CreativeCanvas = () => {
  const { size } = useDocumentSize();
  const { blobPath } = useMarchingBlobs({ size });

  const scrollYNorm = window.scrollY / document.body.scrollHeight;
  const curClr = lerpColor("rgba(255, 184, 77, 0.35)", "rgba(0, 255, 132, 0.35)", scrollYNorm);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    function increaseOpacity() {
      if (opacity >= 1) {
        setOpacity(1);
        return;
      }
      setOpacity((prev) => prev + 0.01);
      requestAnimationFrame(() => increaseOpacity());
    }
    setTimeout(() => {
      increaseOpacity();
    }, 0);
  }, []);

  return (
    <div className="creative-blur-zone">
      <div className="creative-layer" style={{ opacity, position: "absolute", width: "100%", height: "100%" }}>
        <svg className="creative-canvas" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
          <defs>
            <filter id="blob-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="soft" />
              <feGaussianBlur in="soft" stdDeviation="5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="soft" />
              </feMerge>
            </filter>
          </defs>
          <path d={blobPath} fill="none" stroke={curClr} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" filter="url(#blob-glow)" />
        </svg>
      </div>
    </div>
  );
};
