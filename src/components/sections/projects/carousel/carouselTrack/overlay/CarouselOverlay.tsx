import { openPage } from "../../../../../../utils/navigation";
import type { ProjectData } from "../../../Projects";

import "./style.css";

interface CarouselOverlayProps {
  value: ProjectData;
  projectKey: string;
  languages: string[];
  tags: string[];
  onPreviewClick: () => void;
}
export const CarouselOverlay = ({ value, projectKey, languages, tags, onPreviewClick }: CarouselOverlayProps) => {
  const hasUrl = value.url && value.url.length;

  return (
    <div className="overlay">
      <div className="project-header">
        <div className="project-title">
          <div className="label">{projectKey}</div>

          <div style={{ display: "flex", gap: "8px" }}>
            {hasUrl && (
              <button className="open-button" onClick={() => openPage(value.url!)}>
                🌐 Visit Site
              </button>
            )}

            {value.video && (
              <button className="demo-button" onClick={onPreviewClick}>
                ▶ Play Demo
              </button>
            )}
          </div>
        </div>

        <div className="project-tech">
          <div className="project-languages">
            {languages.map((language) => (
              <span key={language} className="pill language">
                {language}
              </span>
            ))}
          </div>

          {tags.length > 0 && (
            <div className="project-tags">
              {tags.map((tag) => (
                <span key={tag} className="pill tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p>{value.info}</p>
    </div>
  );
};
