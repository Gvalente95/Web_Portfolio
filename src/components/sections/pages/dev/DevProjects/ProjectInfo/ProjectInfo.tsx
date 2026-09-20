import GithubIcon from "@/assets/svg/github.svg?react";
import type { Project } from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils/navigation";
import { BadgesRow } from "./badgesRow/BadgesRow";

import "./style.css";

export function ProjectInfo({ name, project, language }: { name: string; project: Project; language: string | undefined }) {
  const { t } = useTranslation();

  const { frontend, backend, database, tags, lang } = project;

  const canPlayUrl = isMobile() ? project.mobile : true;
  const info = language === "fr" ? project.info.fr : language === "it" ? project.info.it : project.info.en;
  return (
    <div className="project-info">
      <h2>{name}</h2>
      {frontend?.length ? <BadgesRow label="Frontend" badges={frontend} /> : null}
      {backend?.length ? <BadgesRow label="Backend" badges={backend} /> : null}
      {database?.length ? <BadgesRow label="Database" badges={database} /> : null}
      {lang?.length ? <BadgesRow label="" badges={lang} /> : null}

      {tags && tags.length ? (
        <div className="project-tags tag">
          {tags.map((tag, _) => {
            return <span key={tag + _}>{tag} </span>;
          })}
        </div>
      ) : null}
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
