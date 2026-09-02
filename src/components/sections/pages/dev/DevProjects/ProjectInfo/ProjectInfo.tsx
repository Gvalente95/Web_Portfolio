import GithubIcon from "@/assets/svg/github.svg?react";
import type { Project } from "../ProjectCard/ProjectCard";

import "./style.css";
import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils/navigation";

export function ProjectInfo({ name, project, lang }: { name: string; project: Project; lang: string | undefined }) {
  const { t } = useTranslation();

  const canPlayUrl = isMobile() ? project.mobile : true;
  const info = lang === "fr" ? project.info.fr : lang === "it" ? project.info.it : project.info.en;
  return (
    <div className="project-info">
      <h2>{name}</h2>

      {project.tags.length ? (
        <div className="project-tags">
          <div className="project-tags-intro">Made With: </div>
          {project.language.split(" ").map((lang, _) => {
            return <span key={lang + "_"}>{lang} </span>;
          })}
        </div>
      ) : null}
      <div className="project-tags tag">
        {project.tags.split(" ").map((tag, _) => {
          return <span key={tag + _}>{tag} </span>;
        })}
      </div>

      <p>{info}</p>

      <div className="link-row">
        {project.github && (
          <a className="link-chip github" href={project.github} target="_blank" rel="noopener noreferrer">
            Github <GithubIcon className="project-icon" />
          </a>
        )}

        {project.url && canPlayUrl && (
          <a className="link-chip open" href={project.url} target="_blank" rel="noopener noreferrer">
            {t("dev.open")}
          </a>
        )}
      </div>
    </div>
  );
}
