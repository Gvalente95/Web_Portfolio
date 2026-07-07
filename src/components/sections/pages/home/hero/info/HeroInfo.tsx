import { useTranslation } from "react-i18next";
import { LinkChips } from "./linkChips/LinkButtons";
import resume from "/resume_gvalente.pdf";
import { useTextEffect } from "@/hooks/useTextEffect";

import "./style.css";

export function HeroInfo() {
  const { t } = useTranslation();
  const { text, trigger } = useTextEffect({ target: t("common.name"), autoStart: false, type: "scramble", stepDuration: 5, duration: 500 });
  return (
    <div className="hero-info">
      <span>Front-end developper</span>
      <div className="hero-greeting">
        <div className="greeting">{t("hero.greeting")}</div>
        <strong onMouseEnter={trigger} className="greeting">
          {text}
        </strong>
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
