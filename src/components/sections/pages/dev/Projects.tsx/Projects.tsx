import { useRef } from "react";
import webApps from "../../../../../data/web-apps.json";
import games from "../../../../../data/games.json";
import audioApps from "../../../../../data/audio-apps.json";

type Project = {
  info: string;
  info_short: string;
  image: string;
  video?: string;
  url: string;
  language: string;
  tags: string;
};

type ProjectsData = {
  content: Record<string, Project>;
};

import "./style.css";

export function Projects() {
  const webAppEntries = Object.entries((webApps as ProjectsData).content);
  const gameEntries = Object.entries((games as ProjectsData).content);
  const audioEntries = Object.entries((audioApps as ProjectsData).content);

  const allEntries = [...audioEntries,...webAppEntries, ...gameEntries];
  return (
    <div className="projects">
      {allEntries.map(([name, project]) => (
        <ProjectCard key={name} name={name} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ name, project }: { name: string; project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="project"
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
      <h2>{name}</h2>
      <p>{project.info_short}</p>

      <img src={project.image} alt={name} />

      {project.video && project.video.length && <video ref={videoRef} src={project.video} muted loop playsInline />}
    </div>
  );
}
