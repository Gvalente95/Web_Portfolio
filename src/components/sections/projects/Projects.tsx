import { SpotifyContainer } from "./spotifyContainer/SpotifyContainer";
import { Carousel } from "./carousel/Carousel";
import webAppsData from "../../../data/web-apps.json";
import audioAppsData from "../../../data/audio-apps.json";
import cAppsData from "../../../data/games.json";
import arrowGif from "/gif/arrow.gif";
import { scrollToSection } from "../../../utils/navigation";
import { useOpacityAnimation } from "../../../shared/hooks/useOpacityAnimation";

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

  const opacityAnim = useOpacityAnimation({ delay: 2000, duration: 2000, endOnScroll: true });

  return (
    <section ref={opacityAnim.ref} id="projects" className="projects-section">
      <div id="explore-button" onClick={() => scrollToSection("interactive-web-applications", 80)} className="projects-intro">
        <div className="projects-title">Explore</div>
        <img className="projects-arrow" src={arrowGif} alt="Scroll down" />
      </div>
      {opacityAnim.hasEnded && (
        <div className="projects-content">
          <Carousel
            titlePosition="center"
            title="Interactive Web Applications"
            description="A collection of modern web applications built with a focus on performance, intuitive user experiences, and scalable architecture. These projects explore frontend engineering, backend services, real-time interactions, and creative web technologies."
            description_short="A collection of modern web applications."
            items={webApps}
          />
          <Carousel
            titlePosition="center"
            title="Audio Programs"
            description="Desktop and web-based audio software developed to explore digital signal processing, music production workflows, and interactive sound design. Many of these projects were inspired by professional DAW features and game audio techniques."
            description_short="Desktop and web-based audio software."
            items={audioApps}
          />
          <Carousel
            titlePosition="center"
            title="Games"
            description="A selection of games and game engines created across different technologies, ranging from terminal-based ASCII adventures to raycasting engines and Unity prototypes. These projects emphasize gameplay programming, graphics, AI, and engine architecture."
            description_short="A selection of games and game engines."
            items={cApps}
          />
          <SpotifyContainer title="My Music" />
        </div>
      )}
    </section>
  );
};
