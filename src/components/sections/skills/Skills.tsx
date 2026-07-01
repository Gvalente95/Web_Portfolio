import skillsData from "../../../data/skills.json";

import "./style.css";

type SkillData = {
  image: string;
  stars: number;
  image_dark?: string;
};
export const Skills = ({ isDark }: { isDark: boolean }) => {
  const skills = Object.entries(skillsData as Record<string, SkillData>);

  return (
    <section id="skills" className="skills-panel">
      {skills.map(([key, value]) => (
        <div className="skill" key={key}>
          <img src={!isDark && value.image_dark ? value.image_dark : value.image} alt={key} />
        </div>
      ))}
    </section>
  );
};
