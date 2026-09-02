import { isMobile } from "@/utils/navigation";

import "./style.css";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SkillTooltipProps {
  onDeselect: () => void;
  isSelected: boolean;
  image: string;
  name: string;
  starsAmount?: number;
  currentProjectCount: number;
  currentStarsCount: number;
  info?: string | null;
  anchorRect: DOMRect | null;
}

export function SkillTooltip({ onDeselect, isSelected, image, name, currentProjectCount, info, anchorRect }: SkillTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!isMobile()) return;

    const onScroll = () => onDeselect();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onDeselect]);

  useLayoutEffect(() => {
    if (!isMobile() || !anchorRect || !isSelected) return;

    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 140;
    const gap = 12;
    const margin = 16;

    const spaceAbove = anchorRect.top;
    const spaceBelow = window.innerHeight - anchorRect.bottom;

    const placeBelow = spaceBelow >= tooltipHeight + gap || spaceBelow > spaceAbove;

    const top = placeBelow ? anchorRect.bottom + gap : anchorRect.top - tooltipHeight - gap;

    setStyle({
      top: Math.max(margin, Math.min(top, window.innerHeight - tooltipHeight - margin)),
      transform: "translateX(-50%)",
    });
  }, [anchorRect, isSelected]);

  const element = (
    <div ref={tooltipRef} className={`tooltip ${isSelected ? "open" : ""}`} style={style}>
      <div className="tooltip--inner">
        <img className="tooltip-icon" src={image} alt={name} />

        <div className="tooltip-header">
          <h3>{name}</h3>

          <div className="tooltip-meta">
            <span>
              Used in <strong className="projects-count--container">{currentProjectCount}</strong> projects
            </span>

            {/* {starsAmount !== undefined && (
              <div className="tooltip-stars">
                <span>Expertise</span>
                <StarContainer amount={currentStarsCount} max={5} />
              </div>
            )} */}
          </div>
        </div>

        {info && <span className="tooltip-info">{info}</span>}
      </div>
    </div>
  );

  return isMobile() ? createPortal(element, document.body) : element;
}

interface SkillProps {
  onSelect: (key: string, projectsAmount: number, starAmount: number | undefined, touchTop: number) => void;
  onDeselect: () => void;
  name: string;
  isSelected: boolean;
  image: string;
  info: string | null | undefined;
  projectsAmount: number;
  currentProjectCount: number;
  currentStarsCount: number;
  starsAmount: number | undefined;
  inView: boolean;
  index: number;
}

export function Skill({ onSelect, onDeselect, name, isSelected, image, info, projectsAmount, currentProjectCount, starsAmount, currentStarsCount, inView, index }: SkillProps) {
  const cols = 5;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const snakeIndex = row % 2 === 0 ? row * cols + col : row * cols + (cols - 1 - col);
  const delays = [7, 2, 11, 0, 14, 4, 9, 1, 12, 6, 3, 13, 5, 10, 8];
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [wasInView, setWasInView] = useState(false);
  const hoverTimeout = useRef<number | null>(null);

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    hoverTimeout.current = window.setTimeout(() => {
      setAnchorRect(rect);
      onSelect(name, projectsAmount, starsAmount, rect.top);
    }, 50);
  }

  function handleMouseLeave() {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    onDeselect();
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current !== null) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) setWasInView(true);
  }, [inView]);
  const leavingView = wasInView && !inView;

  return (
    <div
      style={{
        animationDelay: `${delays[index] * 70}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`skill${isSelected ? " open" : ""}${inView ? " in-view" : ""}${leavingView ? " leaving-view" : ""}`}
      key={name}
    >
      <img
        style={{
          animationDelay: `${snakeIndex * 70}ms`,
        }}
        className={`skill-icon${isSelected ? " hidden open" : ""}`}
        src={image}
        alt={name}
      />
      <SkillTooltip
        onDeselect={onDeselect}
        starsAmount={starsAmount}
        image={image}
        name={name}
        isSelected={isSelected}
        info={info}
        currentProjectCount={currentProjectCount}
        currentStarsCount={currentStarsCount}
        anchorRect={anchorRect}
      />
    </div>
  );
}
