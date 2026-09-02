import webApps from "@/data/web-apps.json";
import games from "@/data/games.json";
import audioApps from "@/data/audio-apps.json";
import { useParams } from "react-router-dom";
import { ProjectCard, type Project } from "./ProjectCard/ProjectCard";
import { ProjectInfo } from "./ProjectInfo/ProjectInfo";
import { useIntersection } from "@/hooks/useIntersection";

import "./style.css";

type ProjectsData = {
  content: Record<string, Project>;
};

export function ProjectContainer({ name, project, lang }: { name: string; project: Project; lang: string | undefined }) {
  const { ref, isIntersecting } = useIntersection({ once: true, enterThreshold: 0.1 });

  return (
    <div ref={ref} className={`dev-project-container reveal${isIntersecting ? " in-view" : ""}`}>
      <ProjectCard name={name} project={project} />
      <ProjectInfo name={name} project={project} lang={lang} />
    </div>
  );
}

export function DevProjects() {
  const webAppEntries = Object.entries((webApps as ProjectsData).content);
  const audioEntries = Object.entries((audioApps as ProjectsData).content);
  const gameEntries = Object.entries((games as ProjectsData).content);

  const allEntries = [...webAppEntries, ...audioEntries, ...gameEntries];
  const { lang } = useParams();

  return (
    <div className="dev-projects">
      {allEntries.map(([name, project]) => (
        <ProjectContainer key={name} name={name} project={project} lang={lang} />
      ))}
    </div>
  );
}
