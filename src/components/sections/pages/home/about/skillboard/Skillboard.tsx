import data from "@/data/skills.json";
import { useEffect, useRef, useState } from "react";

import "./style.css";

type SkillData = {
  image: string;
  stars: number;
  info?: string;
  projectsCount: number;
};

const maxProjectCount = 40;

export function Skillboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const skills = Object.entries(data as Record<string, SkillData>);
  const sumProjects = skills.reduce((sum, [, value]) => sum + value.projectsCount, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  function calculateWidth(count: number): string {
    return `${Math.min((count / maxProjectCount) * 100, 100)}%`;
  }

  return (
    <div ref={ref} className={`skills-board${visible ? " visible" : ""}`}>
      <div className="skills-board-header">
        <span>Skills</span>
        <span>{sumProjects} projects</span>
      </div>

      {skills.map(([key, value], i) => (
        <div className="skill-row" key={key} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
          <img src={value.image} alt={key} />

          <div className="skill-main">
            <div className="skill-top">
              <span>{key}</span>
              <span>{value.projectsCount}</span>
            </div>

            <div className="skill-track">
              <div
                className="skill-bar"
                style={
                  {
                    "--target-width": calculateWidth(value.projectsCount),
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
