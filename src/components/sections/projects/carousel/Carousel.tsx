import { useEffect, useRef, useState } from "react";
import { CarouselTrack } from "./carouselTrack/CarouselTrack";
import type { ProjectData } from "../Projects";
import { isMobile, slugify } from "../../../../utils/navigation";

import "./style.css";

interface CarouselProps {
  title: string;
  description?: string;
  description_short?: string;
  items: [string, ProjectData][];
  titlePosition: "left" | "center" | "right";
}
export const Carousel = ({ title, description, description_short, items, titlePosition }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionIndex, setTransitionIndex] = useState(-1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const target_description = isMobile() ? description_short : description;

  const move = (dir: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveIndex((prev) => (prev + dir + items.length) % items.length);
  };

  useEffect(() => {
    setTransitionIndex(activeIndex);

    const timeout = window.setTimeout(() => {
      setTransitionIndex(-1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <section className="carousel-section" id={slugify(title)} key={title}>
      <div className={`sub-title title_one ${titlePosition}`}>{title}</div>
      {target_description && <div className={`carousel-description ${titlePosition}`}>{target_description}</div>}
      <div className="carousel-content">
        <div className="carousel-track">
          {items.map(([key, value], index) => {
            return <CarouselTrack key={key} videoRef={videoRef} projectKey={key} value={value} index={index} transitionIndex={transitionIndex} activeIndex={activeIndex} onMove={move} items={items} />;
          })}
        </div>
      </div>
    </section>
  );
};
