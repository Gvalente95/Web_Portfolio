import { isMobile, openPage } from "../../../../../utils/navigation";
import type { ProjectData } from "../../Projects";
import { CarouselOverlay } from "./overlay/CarouselOverlay";
import playButtonImage from "../../../../../assets/icons/white/play-button.png";
import { useEffect, useRef, useState } from "react";

import "./style.css";

interface useCarouselPointersProps {
  onClick: () => void;
  onMove: (offset: number) => void;
}
const useCarouselPointers = ({ onClick, onMove }: useCarouselPointersProps) => {
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
      onClick();
      return;
    }

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    const isHorizontalSwipe = Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy);
    if (isHorizontalSwipe) onMove(dx > 0 ? -1 : 1);
    else onClick();
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
  const [showControls, setShowControls] = useState(false);

  const { handlePointerDown, handlePointerUp } = useCarouselPointers({ onClick: () => handleClick(), onMove: (v) => onMove(v) });

  const offset = index - activeIndex;
  const wrappedOffset = offset > items.length / 2 ? offset - items.length : offset < -items.length / 2 ? offset + items.length : offset;

  const isActive = wrappedOffset === 0;
  const languages = splitList(value.language);
  const tags = splitList(value.tags);

  useEffect(() => {
    if (!isActive) {
      setIsVideoOpen(false);
      setShowControls(false);
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isActive) {
      onMove(wrappedOffset);
      return;
    }
    if (value.video) {
      setIsVideoOpen(true);
      setShowControls(false);
      setTimeout(() => {
        videoRef.current?.play();
      }, 0);
      setTimeout(() => {
        setShowControls(true);
      }, 700);
      return;
    }
    if (value.url) openPage(value.url);
  };

  return (
    <div
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
        <video ref={isActive ? videoRef : null} className="entry-video" playsInline preload="metadata" controls={showControls} src={value.video} onClick={(e) => e.stopPropagation()} />
      ) : (
        <img src={value.image} />
      )}

      {value.video && !isVideoOpen && <img className="play-button" src={playButtonImage} alt="Play" />}

      {!isVideoOpen && <CarouselOverlay value={value} projectKey={projectKey} languages={languages} tags={tags} />}
    </div>
  );
};
