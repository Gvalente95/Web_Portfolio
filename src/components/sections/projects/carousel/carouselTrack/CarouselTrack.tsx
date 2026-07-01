import { isMobile } from "../../../../../utils/navigation";
import type { ProjectData } from "../../Projects";
import { CarouselOverlay } from "./overlay/CarouselOverlay";
import closeIcon from "../../../../../assets/icons/white/close.png";

import { useEffect, useRef, useState } from "react";

import "./style.css";

interface useCarouselPointersProps {
  onMove: (offset: number) => void;
}
const useCarouselPointers = ({ onMove }: useCarouselPointersProps) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const SWIPE_THRESHOLD = 50;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile()) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile()) {
      return;
    }

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    const isHorizontalSwipe = Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy);
    if (isHorizontalSwipe) onMove(dx > 0 ? -1 : 1);
  };

  return { handlePointerDown, handlePointerUp };
};

const splitList = (value?: string) =>
  value
    ? value
        .split(/[, ]+/)
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

interface CarouselTrackProps {
  projectKey: string;
  value: any;
  index: number;
  activeIndex: number;
  transitionIndex: number;
  onMove: (wrappedOffset: number) => void;
  items: [string, ProjectData][];
  videoRef: React.RefObject<HTMLVideoElement | null>;
}
export const CarouselTrack = ({ projectKey, value, index, activeIndex, transitionIndex, onMove, items, videoRef }: CarouselTrackProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const { handlePointerDown, handlePointerUp } = useCarouselPointers({ onMove: (v) => onMove(v) });

  const offset = index - activeIndex;
  const wrappedOffset = offset > items.length / 2 ? offset - items.length : offset < -items.length / 2 ? offset + items.length : offset;

  const isActive = wrappedOffset === 0;
  const languages = splitList(value.language);
  const tags = splitList(value.tags);

  useEffect(() => {
    if (!isActive) {
      setIsVideoOpen(false);
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isActive) {
      onMove(wrappedOffset);
      return;
    }
  };

  const onPreviewClick = () => {
    if (!isActive) return;
    if (value.video) {
      setIsVideoOpen((prev) => !prev);
      setTimeout(() => {
        if (videoRef.current?.paused) videoRef.current?.play();
        else videoRef.current?.pause();
      }, 0);

      return;
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`entry ${transitionIndex === index ? "transitioning" : ""} ${isActive ? "active" : ""} ${isVideoOpen ? "video-open" : ""}`}
      style={{
        transform: `translateX(${wrappedOffset * 62}%) scale(${isActive ? 1 : 0.78})`,
        filter: isActive ? "brightness(1)" : "brightness(0.45)",
        zIndex: 10 - Math.abs(wrappedOffset),
      }}
    >
      {value.image && !value.video && <img src={value.image} alt={projectKey} />}

      {value.video && isVideoOpen ? (
        <video ref={isActive ? videoRef : null} className="entry-video" playsInline preload="metadata" controls={true} src={value.video} onClick={(e) => e.stopPropagation()} />
      ) : (
        <img src={value.image} />
      )}

      {!isVideoOpen && <CarouselOverlay value={value} projectKey={projectKey} languages={languages} tags={tags} onPreviewClick={onPreviewClick} />}
      {isVideoOpen && value.video && (
        <div className="right-corner">
          <img
            onClick={(e) => {
              e.stopPropagation();
              onPreviewClick();
            }}
            className="close-button"
            src={closeIcon}
            alt="Close"
          />
        </div>
      )}
    </div>
  );
};
