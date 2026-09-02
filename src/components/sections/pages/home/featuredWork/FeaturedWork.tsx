import webApps from "@/data/web-apps.json";
import games from "@/data/games.json";
import audioApps from "@/data/audio-apps.json";
import type { Project } from "../../dev/DevProjects/ProjectCard/ProjectCard";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./style.css";

type ProjectsData = {
  content: Record<string, Project>;
};

export function FeaturedWork() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";

  const webAppEntries = Object.entries((webApps as ProjectsData).content);
  const gameEntries = Object.entries((games as ProjectsData).content);
  const audioEntries = Object.entries((audioApps as ProjectsData).content);

  const allEntries = [...webAppEntries, ...audioEntries, ...gameEntries];
  const loopEntries = [...allEntries, ...allEntries];

  return (
    <section className="vitrine">
      <div className="vitrine-glow" />
      <div className="vitrine-banner">
        <div className="vitrine-banner-title">
          <span>{t("vitrine.title_0")}</span>
          <strong>{t("vitrine.title_1")}</strong>
        </div>
      </div>
      <div className="vitrine-window">
        <div className="vitrine-track">
          {loopEntries.map(([key, project], index) => (
            <div
              key={`${key}-${index}`}
              className="vitrine-chip"
              style={
                {
                  //   "--chip-offset": `${[-18, 10, -6, 18, -12][index % 5]}px`,
                  //   "--chip-rotation": `${[-.7, 0.4, -0.3, 1, -0.6][index % 5]}deg`,
                  "--chip-delay": `${-(index % allEntries.length) * 0.7}s`,
                } as React.CSSProperties
              }
            >
              <div className="vitrine-chip--name">
                <p>{key}</p>
              </div>

              {project.preview ? <video src={project.preview} muted autoPlay loop playsInline preload="metadata" /> : <img src={project.image} alt="" />}

              <div className="vitrine-chip-shine" />
            </div>
          ))}
        </div>
      </div>
      <Link className="vitrine-button" to={`/${lang}/dev`}>
        {t("vitrine.action")}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
