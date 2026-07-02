import { useState } from "react";
import skillsData from "../../../data/skills.json";

import "./style.css";

export const Star = ({ fill }: { fill: string }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M50 5
           L61 35
           L95 35
           L67 55
           L78 90
           L50 70
           L22 90
           L33 55
           L5 35
           L39 35
           Z"
        fill={fill}
        stroke="black"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
};

type SkillData = {
  image: string;
  stars: number;
  image_dark?: string;
  info?: string;
};
export const Skills = ({ isDark }: { isDark: boolean }) => {
  const skills = Object.entries(skillsData as Record<string, SkillData>);
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <section id="skills" className="skills-panel">
      {skills.map(([key, value]) => (
        <div onMouseLeave={() => setSelectedSkill("")} onClick={() => setSelectedSkill(key)} className={`skill ${selectedSkill === key ? " open" : ""}`} key={key}>
          <img src={!isDark && value.image_dark ? value.image_dark : value.image} alt={key} />
          <div className={`tooltip ${selectedSkill === key ? "open" : ""}`}>
            <div className="tooltip--inner">
              <h3>{key}</h3>
              <span>{value.info}</span>
              <span className="stars-container">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} fill={i < value.stars ? "rgb(255, 174, 0)" : "rgba(0,0,0,0)"} />
                ))}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
