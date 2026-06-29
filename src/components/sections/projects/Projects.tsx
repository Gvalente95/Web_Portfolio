import { SpotifyContainer } from "./spotifyContainer/SpotifyContainer";
import { Carousel } from "./carousel/Carousel";
import { useRef } from "react";
import webAppsData from "../../../data/web-apps.json";
import audioAppsData from "../../../data/audio-apps.json";
import cAppsData from "../../../data/c_apps.json";
import arrowGif from "/gif/arrow.gif";

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
      <div className="projects-intro">
        <div className="projects-title">Explore</div>
        <img className="projects-arrow" src={arrowGif} alt="Scroll down" />
      </div>
      <div className="projects-content">
        <Carousel titlePosition="center" title="Interactive Web Applications" items={webApps} />
        <Carousel titlePosition="center" title="Audio Programs" items={audioApps} />
        <Carousel titlePosition="center" title="C Programming" items={cApps} />
        <SpotifyContainer />
      </div>
    </section>
  );
};
