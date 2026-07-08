import { useTranslation } from "react-i18next";
import { LinkChips } from "./linkChips/LinkButtons";
import resume from "/resume_gvalente.pdf";
import { useTextEffect } from "@/hooks/useTextEffect";

import "./style.css";
import { isMobile } from "@/utils/navigation";

export function HeroInfo() {
  const { t } = useTranslation();
  const { text, trigger } = useTextEffect({ target: t("common.name"), autoStart: false, type: "scramble", stepDuration: 5, duration: 500 });

  return (
    <div className="hero-info">
      <span className={"intro"}>Front-end developper</span>
      <div className="hero-greeting">
        <div className={"greeting"}>{t("hero.greeting")}</div>
        <strong onMouseEnter={trigger} onMouseLeave={trigger} className={"greeting"}>
          {text}
        </strong>
        <p className={"paragraph"}>
          {t("hero.brief.character")} | {t("hero.brief.spec")}
        </p>
        <div className={"link-row"}>
          <a href={resume} target="_blank" rel="noopener noreferrer">
            {t("hero.resume")}
          </a>
          <a href={resume} target="_blank" rel="noopener noreferrer">
            {t("hero.contact")}
          </a>
          {isMobile() && <LinkChips />}
        </div>
      </div>
    </div>
  );
}
