import { openPage } from "../../../../../../utils/navigation";
import type { ProjectData } from "../../../Projects";

import "./style.css";

interface CarouselOverlayProps {
  value: ProjectData;
  projectKey: string;
  languages: string[];
  tags: string[];
}
export const CarouselOverlay = ({ value, projectKey, languages, tags }: CarouselOverlayProps) => {
  const hasUrl = value.url && value.url.length;

  const handleLabelClick = () => {
    if (hasUrl) openPage(value.url!);
  };

  return (
    <div className="overlay">
      <div className="project-header">
        <div onClickCapture={handleLabelClick} className={`label${hasUrl ? " clickable" : ""}`}>
          {projectKey}
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
