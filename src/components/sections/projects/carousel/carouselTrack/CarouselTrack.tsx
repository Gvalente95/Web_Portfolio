import { openPage } from "../../../../../utils/navigation";
import type { ProjectData } from "../../Projects";
import { CarouselOverlay } from "./overlay/CarouselOverlay";
import playButtonImage from "../../../../../assets/play-button.png";

import "./style.css";

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

import { useEffect, useState } from "react";

export const CarouselTrack = ({ projectKey, value, index, activeIndex, transitionIndex, onMove, items, videoRef }: CarouselTrackProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const offset = index - activeIndex;
  const wrappedOffset = offset > items.length / 2 ? offset - items.length : offset < -items.length / 2 ? offset + items.length : offset;

  const isActive = wrappedOffset === 0;
  const languages = splitList(value.language);
  const tags = splitList(value.tags);

  useEffect(() => {
    if (!isActive) setIsVideoOpen(false);
  }, [isActive]);

  const handleClick = () => {
    if (!isActive) {
      onMove(wrappedOffset);
      return;
    }

    if (value.video) {
      setIsVideoOpen(true);

      setTimeout(() => {
        videoRef.current?.play();
      }, 0);

      return;
    }

    if (value.url) openPage(value.url);
  };

  return (
    <div
      onClick={handleClick}
      className={`entry ${transitionIndex === index ? "transitioning" : ""} ${isActive ? "active" : ""} ${isVideoOpen ? "video-open" : ""}`}
      style={{
        transform: `translateX(${wrappedOffset * 62}%) scale(${isActive ? 1 : 0.78})`,
        filter: isActive ? "brightness(1)" : "brightness(0.45)",
        zIndex: 10 - Math.abs(wrappedOffset),
      }}
    >
      {value.image && !value.video && <img src={value.image} alt={projectKey} />}

      {value.video && <video ref={isActive ? videoRef : null} className="entry-video" controls={isVideoOpen} src={value.video} onClick={(e) => e.stopPropagation()} />}

      {value.video && !isVideoOpen && <img className="play-button" src={playButtonImage} alt="Play" />}

      {!isVideoOpen && <CarouselOverlay value={value} projectKey={projectKey} languages={languages} tags={tags} />}
    </div>
  );
};
