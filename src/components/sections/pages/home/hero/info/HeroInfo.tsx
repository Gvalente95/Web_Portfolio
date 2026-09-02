import { useTranslation } from "react-i18next";

import "./style.css";
import { isMobile } from "@/utils/navigation";
import { LinkRow } from "./linkChips/LinkRow";

export function HeroInfo() {
  const { t } = useTranslation();

  return (
    <div className="hero-info">
      <span className={"intro"}>Front-end developper</span>
      <div className="hero-greeting">
        <div className={"greeting"}>{t("hero.greeting")}</div>
        <strong  className={"greeting"}>
          {t("common.name")}
        </strong>
        <p className={"paragraph"}>
          {t("hero.brief.character")} | {t("hero.brief.spec")}
        </p>
        {!isMobile() && <LinkRow />}
      </div>
    </div>
  );
}
