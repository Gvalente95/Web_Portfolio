import { lerpColor } from "@/utils/colors";

import "./style.css";

const Star = ({ fill, emptyFill, ratio, id }: { fill: string; emptyFill: string; ratio: number; id: string }) => {
  const percent = Math.max(0, Math.min(1, ratio)) * 100;

  return (
    <svg className="star-icon" viewBox="0 0 100 100">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${percent}%`} stopColor={fill} />
          <stop offset={`${percent}%`} stopColor={emptyFill} />
        </linearGradient>
      </defs>

      <path d="M50 5 L61 35 L95 35 L67 55 L78 90 L50 70 L22 90 L33 55 L5 35 L39 35 Z" fill={`url(#${id})`} stroke="black" strokeWidth={4} strokeLinejoin="round" />
    </svg>
  );
};

export const StarContainer = ({ amount, max }: { amount: number; max: number }) => {
  const colorA = "rgb(255, 219, 91)";
  const colorB = "rgb(255, 157, 37)";
  const emptyFill = "rgba(87, 55, 0, 0.98)";

  return (
    <span className="stars-container">
      {Array.from({ length: max }, (_, i) => {
        const ratio = amount / 100 - i;
        const fill = lerpColor(colorA, colorB, i / Math.max(1, max - 1));

        return <Star key={i} id={`star-${i}-${amount}`} ratio={ratio} fill={fill} emptyFill={emptyFill} />;
      })}
    </span>
  );
};
