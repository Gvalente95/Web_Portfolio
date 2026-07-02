import { isMobile, openPage } from "../../../../../../utils/navigation";
import type { ContentData } from "../../Carousel";

import "./style.css";

interface TrackOverlayProps {
  value: ContentData;
  projectKey: string;
  languages: string[];
  tags: string[];
  onPreviewClick: () => void;
  isActive: boolean;
}
export const TrackOverlay = ({ value, projectKey, languages, tags, onPreviewClick, isActive }: TrackOverlayProps) => {
  const hasUrl = value.url && value.url.length;
  const info = isMobile() && value.info_short ? value.info_short : value.info;

  return (
    <div className="overlay">
      <div className="project-header">
        <div className="project-title">
          <div className="label">{projectKey}</div>

          {isActive && (
            <div style={{ display: "flex", gap: "8px" }}>
              {hasUrl && (
                <button className="open-button" onClick={() => openPage(value.url!)}>
                  🌐 Visit Site
                </button>
              )}

              {value.video && (
                <button className="demo-button" onClick={onPreviewClick}>
                  ▶ View Demo
                </button>
              )}
            </div>
          )}
        </div>
        {!isMobile() && (
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
        )}
      </div>

      <p className="track-info">{info}</p>
    </div>
  );
};
