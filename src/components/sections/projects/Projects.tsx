import { SpotifyContainer } from "./spotifyContainer/SpotifyContainer";
import { Carousel } from "./carousel/Carousel";
import webAppsData from "../../../data/web-apps.json";
import audioAppsData from "../../../data/audio-apps.json";
import cAppsData from "../../../data/games.json";
import arrowGif from "/gif/arrow.gif";
import { scrollToSection } from "../../../utils/navigation";
import { useOpacityAnimation } from "../../../shared/hooks/useOpacityAnimation";

import "./style.css";

export const Projects = () => {
  const opacityAnim = useOpacityAnimation({ delay: 2000, duration: 2000, endOnScroll: true });

  return (
    <section ref={opacityAnim.ref} id="projects" className="projects-section">
      <div id="explore-button" onClick={() => scrollToSection("interactive-web-applications", 40)} className="projects-intro">
        <div className="projects-title">Explore</div>
        <img className="projects-arrow" src={arrowGif} alt="Scroll down" />
      </div>
      {
        <div className="projects-content">
          <Carousel titlePosition="center" data={webAppsData} />
          <Carousel titlePosition="center" data={audioAppsData} />
          <Carousel titlePosition="center" data={cAppsData} />
          <SpotifyContainer title="My Music" />
        </div>
      }
    </section>
  );
};
