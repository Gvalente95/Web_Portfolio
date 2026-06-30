import { useEffect, useRef } from "react";
import type { PathData } from "../Wavy_background";
import { clamp } from "../../../utils/math";

import "./style.css";

export const useSlidingPosition = ({ pathsData, ballRef, ballRadius }: { pathsData: PathData[]; ballRef: React.RefObject<HTMLDivElement | null>; ballRadius: number }) => {
  const rotationRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastScrollRef = useRef(0);
  const prevIndex = useRef(-1);

  const updateBall = () => {
    if (!ballRef.current) return;

    const viewportTrigger = window.scrollY + window.innerHeight * 0.99;

    const index = pathsData.findIndex((path, i) => {
      const isLast = i === pathsData.length - 1;
      const endY = isLast ? path.endY + window.innerHeight : path.endY;

      return viewportTrigger >= path.startY && viewportTrigger < endY;
    });

    if (index === -1) {
      ballRef.current.style.opacity = "0";
      return;
    }

    const data = pathsData[index];

    if (!data.points.length) return;

    const isLastSection = index === pathsData.length - 1;
    const referenceHeight = isLastSection ? window.innerHeight : data.endY - data.startY;
    const sectionProgress = clamp((viewportTrigger - data.startY) / referenceHeight, 0, 1);
    const inner = ballRef.current.firstElementChild as HTMLDivElement | null;

    const scrollDelta = window.scrollY - lastScrollRef.current;
    const isRevScroll = scrollDelta < 0;

    let reverse = index % 2 !== 0;

    if (index !== prevIndex.current) {
      if (isRevScroll) reverse = !reverse;
      if (inner) {
        let nextColor = index > 0 ? pathsData[index - 1].color : "white";
        inner.style.background = data.color;
        document.getElementById("bar0")!.style.background = nextColor;
        document.getElementById("bar1")!.style.background = nextColor;
      }
    }

    const progress = reverse ? 1 - sectionProgress : sectionProgress;

    const pointIndex = Math.min(data.points.length - 1, Math.max(0, Math.floor(progress * (data.points.length - 1))));

    const point = data.points[pointIndex];

    const normalizedY = (point.y - data.viewBoxMinY) / data.viewBoxHeight;
    const pageY = data.y + normalizedY * data.height;

    const pagePoint = {
      x: (point.x / 100) * window.innerWidth,
      y: pageY - ballRadius,
    };

    const lastPoint = lastPointRef.current;

    if (lastPoint) {
      const dx = pagePoint.x - lastPoint.x;
      const dy = pagePoint.y - lastPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 32;
      const degrees = (distance / radius) * (180 / Math.PI);
      rotationRef.current += degrees * (reverse ? -1 : 1) * (isRevScroll ? -1 : 1);
    }

    lastPointRef.current = pagePoint;

    if (inner) {
      //   inner.style.backgroundColor = data.color;
      inner.style.transform = `rotate(${rotationRef.current}deg)`;
      inner.style.borderRadius = "50%";
    }

    ballRef.current.style.opacity = ".8";
    ballRef.current.style.transform = `translate(${point.x}vw, ${pagePoint.y}px) translate(-50%, -50%)`;
    lastScrollRef.current = window.scrollY;
    prevIndex.current = index;
  };

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateBall);
    };

    updateBall();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateBall);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBall);
    };
  }, [pathsData]);
};
export const SlidingElement = ({ paths }: { paths: PathData[] }) => {
  const ballRef = useRef<HTMLDivElement | null>(null);

  useSlidingPosition({
    pathsData: paths,
    ballRef,
    ballRadius: 32,
  });

  return (
    <div ref={ballRef} className="sliding-element">
      <div className="sliding-element-inner">
        <div id="bar0" className="bar_0"></div>
        <div id="bar1" className="bar_1"></div>
      </div>
    </div>
  );
};
