import { useTranslation } from "react-i18next";
import { LinkChips } from "./linkChips/LinkButtons";
import resume from "/resume_gvalente.pdf";

import "./style.css";

export function HeroInfo() {
  const { t } = useTranslation();

  return (
    <div className="hero-info">
      <span>Front-end developper</span>
      <div className="hero-greeting">
        <div className="greeting">{t("hero.greeting")}</div>
        <strong className="greeting">{t("common.name")}</strong>
        <p>
          {t("hero.brief.character")} | {t("hero.brief.spec")}
        </p>
        <div className="link-row">
          <LinkChips />
          <a href={resume} target="_blank" rel="noopener noreferrer">
            RESUME
          </a>
        </div>
      </div>
    </div>
  );
}
