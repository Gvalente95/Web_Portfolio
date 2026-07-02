import { useEffect, useRef, useState } from "react";
import { CarouselTrack } from "./track/Track";
import { isMobile, slugify } from "../../../../utils/navigation";

import "./style.css";

export type CarouselData = {
  title: string;
  description: string;
  description_short: string;
  content: Record<string, ContentData> | [string, ContentData][];
};
export type ContentData = {
  info: string;
  info_short?: string;
  image?: string | null;
  url?: string | null;
  video?: string | null;
  language?: string;
  tags?: string;
};

interface CarouselProps {
  data: CarouselData;
  titlePosition: "left" | "center" | "right";
}
export const Carousel = ({ data, titlePosition }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionIndex, setTransitionIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hadUserAction, setHadUserAction] = useState(false);

  const title = data.title;
  const items = Array.isArray(data.content) ? data.content : Object.entries(data.content);
  const target_description = isMobile() ? data.description_short : data.description;

  const move = (dir: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveIndex((prev) => (prev + dir + items.length) % items.length);
    setHadUserAction(true);
  };

  useEffect(() => {
    if (isHovered) setHadUserAction(true);
  }, [isHovered]);

  useEffect(() => {
    setTransitionIndex(activeIndex);

    const timeout = window.setTimeout(() => {
      setTransitionIndex(-1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <section className="carousel-section" id={slugify(title)} key={title}>
      <div className="carousel-info">
        <div className="carousel-description--banner" />
        <h2 className={`sub-title title_one ${titlePosition}`}>{title}</h2>
        {target_description && <p className={`carousel-description ${titlePosition}`}>{target_description}</p>}
      </div>
      <div className="carousel-content" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="carousel-track">
          {items.map(([key, value], index) => {
            return (
              <CarouselTrack
                key={key}
                videoRef={videoRef}
                projectKey={key}
                value={value}
                index={index}
                transitionIndex={transitionIndex}
                activeIndex={activeIndex}
                onMove={move}
                items={items}
                isHovered={isHovered}
              />
            );
          })}
          {!hadUserAction && isMobile() && <iframe className="motivator" src="https://lottie.host/embed/c9b4a724-032f-47cc-a235-bd5a6cc1504f/UZdvGWNFXK.lottie"></iframe>}
        </div>
      </div>
    </section>
  );
};
