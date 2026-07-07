import { useRef } from "react";
import webApps from "@/data/web-apps.json";
import games from "@/data/games.json";
import audioApps from "@/data/audio-apps.json";
import GithubIcon from "@/assets/svg/github.svg?react";

type Project = {
  info: { it: string; en: string; fr: string };
  image: string;
  video?: string;
  url?: string;
  github?: string;
  language: string;
  tags: string;
};

type ProjectsData = {
  content: Record<string, Project>;
};

import "./style.css";
import { useParams } from "react-router-dom";

export function Projects() {
  const webAppEntries = Object.entries((webApps as ProjectsData).content);
  const gameEntries = Object.entries((games as ProjectsData).content);
  const audioEntries = Object.entries((audioApps as ProjectsData).content);
  const allEntries = [...audioEntries, ...webAppEntries, ...gameEntries];

  const { lang } = useParams();

  return (
    <div className="projects">
      {allEntries.map(([name, project]) => (
        <>
          <div className="project-info">
            <div className="link-row">
              <h2>{name}</h2>
              {project.github && (
                <a className="link-chip github" href={project.github} target="_blank" rel="noopener noreferrer">
                  Github <GithubIcon className="project-icon" />
                </a>
              )}
              {project.url && (
                <a className="link-chip open" href={project.url} target="_blank" rel="noopener noreferrer">
                  Open
                </a>
              )}
            </div>
            <p>{lang === "fr" ? project.info.fr : lang === "it" ? project.info.it : project.info.en}</p>

            <ProjectCard key={name} name={name} project={project} />
          </div>
        </>
      ))}
    </div>
  );
}

function ProjectCard({ name, project }: { name: string; project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
	
  return (
    <div
      className={`project${project.video ? "" : " no-video"}`}
      onMouseEnter={() => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        video.play();
      }}
      onMouseLeave={() => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;
      }}
    >
      <img src={project.image} alt={name} />

      {project.video && project.video.length && <video ref={videoRef} src={project.video} muted loop playsInline />}
    </div>
  );
}
