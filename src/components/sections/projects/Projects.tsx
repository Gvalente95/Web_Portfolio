import { SpotifyContainer } from "./spotifyContainer/SpotifyContainer";
import { Carousel } from "./carousel/Carousel";
import { useRef } from "react";
import webAppsData from "../../../data/web-apps.json";
import audioAppsData from "../../../data/audio-apps.json";
import cAppsData from "../../../data/games.json";
import arrowGif from "/gif/arrow.gif";
import { scrollToSection } from "../../../utils/navigation";

import "./style.css";

export type ProjectData = {
  info: string;
  image?: string | null;
  url?: string | null;
  video?: string | null;
  language?: string;
  tags?: string;
};

export const Projects = () => {
  const webApps = Object.entries(webAppsData as Record<string, ProjectData>);
  const audioApps = Object.entries(audioAppsData as Record<string, ProjectData>);
  const cApps = Object.entries(cAppsData as Record<string, ProjectData>);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} id="projects" className="projects-section">
      <div onClick={() => scrollToSection("interactive-web-applications", 100)} className="projects-intro">
        <div className="projects-title">Explore</div>
        <img className="projects-arrow" src={arrowGif} alt="Scroll down" />
      </div>
      <div className="projects-content">
        <Carousel
          titlePosition="center"
          title="Interactive Web Applications"
          description="A collection of modern web applications built with a focus on performance, intuitive user experiences, and scalable architecture. These projects explore frontend engineering, backend services, real-time interactions, and creative web technologies."
          items={webApps}
        />
        <Carousel
          titlePosition="center"
          title="Audio Programs"
          description="Desktop and web-based audio software developed to explore digital signal processing, music production workflows, and interactive sound design. Many of these projects were inspired by professional DAW features and game audio techniques."
          items={audioApps}
        />
        <Carousel
          titlePosition="center"
          title="Games"
          description="A selection of games and game engines created across different technologies, ranging from terminal-based ASCII adventures to raycasting engines and Unity prototypes. These projects emphasize gameplay programming, graphics, AI, and engine architecture."
          items={cApps}
        />
        <SpotifyContainer />
      </div>
    </section>
  );
};
