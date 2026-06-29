import skillsData from "../../../data/skills.json";

import "./style.css";

type SkillData = {
  image: string;
  stars: number;
};
export const Skills = () => {
  const skills = Object.entries(skillsData as Record<string, SkillData>);

  return (
    <section id="skills" className="skills-panel">
      {skills.map(([key, value]) => (
        <div className="skill" key={key}>
          <img src={value.image} alt={key} />
          <div className="skill-tooltip">
            <strong>{key}</strong>
            <span>{"★".repeat(value.stars)}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
