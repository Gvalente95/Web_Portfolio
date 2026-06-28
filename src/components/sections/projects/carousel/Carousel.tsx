import { useEffect, useRef, useState } from "react";
import { CarouselTrack } from "./carouselTrack/CarouselTrack";
import type { ProjectData } from "../Projects";

import "./style.css";
import { slugify } from "../../../../utils/navigation";

interface CarouselProps {
  title: string;
  items: [string, ProjectData][];
  titlePosition: "left" | "center" | "right";
}
export const Carousel = ({ title, items, titlePosition }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionIndex, setTransitionIndex] = useState(-1);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section id={slugify(title)} key={title}>
      <div className={`sub-title title_one ${titlePosition}`}>{title}</div>
      <div className="carousel">
        <div className="carousel-track">
          {items.map(([key, value], index) => {
            return <CarouselTrack videoRef={videoRef} projectKey={key} value={value} index={index} transitionIndex={transitionIndex} activeIndex={activeIndex} onMove={move} items={items} />;
          })}
        </div>
      </div>
    </section>
  );
};
