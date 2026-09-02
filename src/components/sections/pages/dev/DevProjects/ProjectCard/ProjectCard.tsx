import { useRef } from "react";
import PlayIcon from "@/assets/svg/play.svg?react";

import "./style.css";
import { isMobile } from "@/utils/navigation";

export type Project = {
  info: { it: string; en: string; fr: string };
  image: string;
  video?: string;
  preview?: string;
  url?: string;
  github?: string;
  language: string;
  tags: string;
  mobile?: boolean;
};

export function ProjectCard({ name, project }: { name: string; project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`project-card${project.video ? "" : " no-video"}`}
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

      {project.video && isMobile() && (
        <div className="play-overlay">
          <PlayIcon className="video-play-icon" />
        </div>
      )}

      {project.video && project.video.length && <video ref={videoRef} src={project.video} muted loop playsInline />}
    </div>
  );
}
