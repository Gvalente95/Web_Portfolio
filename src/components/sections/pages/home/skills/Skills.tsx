import { useState } from "react";
import skillsData from "@/data/skills.json";
import { useParams } from "react-router-dom";
import { useTextCounter } from "@/hooks/useTextCounter";
import { Skill } from "./Skill/Skill";
import pointerIcon from "@/assets/png/ui/pointer.png";

import "./style.css";
import { useIntersection } from "@/hooks/useIntersection";

type SkillData = {
  image: string;
  stars?: number;
  info?: { en: string; fr: string; it: string };
  projectsCount: number;
};
export const Skills = () => {
  const skills = Object.entries(skillsData as Record<string, SkillData>);
  const [selectedSkill, setSelectedSkill] = useState("");
  const projectCounter = useTextCounter({ end: 0, duration: 800, curve: "ease-out" });
  const starCounter = useTextCounter({ end: 0, duration: 800, curve: "ease-out" });
  const [userInteracted, setuserInteracted] = useState(false);

  const { ref, isIntersecting } = useIntersection({
    once: false,
  });

  const { lang } = useParams();

  function onOpenSkill(key: string, projectsAmount: number, starAmount?: number | undefined) {
    projectCounter.start(projectsAmount);
    if (starAmount) starCounter.start(starAmount * 100);
    setSelectedSkill(key);
    setuserInteracted(true);
  }

  function onDeselectSkill() {
    setSelectedSkill("");
  }

  return (
    <section id="skills" className={`skills-panel reveal${isIntersecting ? " in-view" : ""}`} ref={ref}>
      {!userInteracted && <img className="pointer-image" src={pointerIcon} alt="click here icon" />}
      {skills.map(([key, value], _) => {
        const info = !value.info ? null : lang === "it" ? value.info.it : lang === "fr" ? value.info.fr : value.info.en;
        return (
          <Skill
            inView={isIntersecting}
            index={_}
            key={key}
            image={value.image}
            isSelected={selectedSkill === key}
            name={key}
            info={info}
            onDeselect={onDeselectSkill}
            onSelect={onOpenSkill}
            projectsAmount={value.projectsCount}
            currentProjectCount={projectCounter.count}
            currentStarsCount={starCounter.count}
            starsAmount={value.stars}
          />
        );
      })}
    </section>
  );
};
