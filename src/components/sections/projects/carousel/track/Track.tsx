import { isMobile } from "../../../../../utils/navigation";
import { TrackOverlay } from "./overlay/TrackOverlay";
import closeIcon from "../../../../../assets/icons/white/close.png";

import { useEffect, useRef, useState } from "react";

import "./style.css";
import type { ContentData } from "../Carousel";

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
  items: [string, ContentData][];
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isHovered?: boolean;
}
export const CarouselTrack = ({ projectKey, value, index, activeIndex, transitionIndex, onMove, items, videoRef, isHovered = false }: CarouselTrackProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { handlePointerDown, handlePointerUp } = useCarouselPointers({ onMove: (v) => onMove(v) });
  const videoInteractionRef = useRef(false);

  const offset = index - activeIndex;
  const wrappedOffset = offset > items.length / 2 ? offset - items.length : offset < -items.length / 2 ? offset + items.length : offset;

  const isActive = wrappedOffset === 0;
  const absOffset = Math.abs(wrappedOffset);
  const stackScale = isActive ? 1 : Math.max(0.5, 1 - absOffset * 0.16);
  const stackGap = isActive ? 0 : Math.max(18, isHovered ? 64 - absOffset * 8 : 32 - absOffset * 8);
  const cardWidth = isActive ? "min(720px, 78vw)" : `calc(min(720px, 78vw) * ${stackScale.toFixed(2)})`;
  const cardHeight = isActive ? "450px" : `calc(450px * ${stackScale.toFixed(2)})`;
  const languages = splitList(value.language);
  const tags = splitList(value.tags);

  const stopVideoGesture = (e: React.SyntheticEvent) => {
    videoInteractionRef.current = true;
    e.stopPropagation();

    window.setTimeout(() => {
      videoInteractionRef.current = false;
    }, 250);
  };

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
      onClick={() => {
        if (videoInteractionRef.current) return;
        handleClick();
      }}
      onPointerDown={(e) => {
        if (videoInteractionRef.current) return;
        handlePointerDown(e);
      }}
      onPointerUp={(e) => {
        if (videoInteractionRef.current) return;
        handlePointerUp(e);
      }}
      className={`entry ${transitionIndex === index ? "transitioning" : ""} ${isActive ? "active" : ""} ${isVideoOpen ? "video-open" : ""}`}
      style={{
        transform: `translateX(${wrappedOffset * (isActive ? 0 : stackGap)}%) scale(${stackScale})`,
        width: cardWidth,
        height: cardHeight,
        filter: isActive ? "brightness(1)" : `brightness(${Math.max(0.28, 0.5 - absOffset * 0.08)})`,
        zIndex: 10 - absOffset,
      }}
    >
      {value.image && !value.video && <img src={value.image} alt={projectKey} />}

      {value.video && isVideoOpen ? (
        <video
          ref={isActive ? videoRef : null}
          className="entry-video"
          playsInline
          preload="metadata"
          controls={true}
          src={value.video}
          onClick={stopVideoGesture}
          onPointerDown={stopVideoGesture}
          onPointerUp={stopVideoGesture}
          onTouchStart={stopVideoGesture}
          onTouchEnd={stopVideoGesture}
        />
      ) : (
        <img src={value.image} />
      )}

      {!isVideoOpen && <TrackOverlay value={value} projectKey={projectKey} languages={languages} tags={tags} onPreviewClick={onPreviewClick} isActive={isActive} />}
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
