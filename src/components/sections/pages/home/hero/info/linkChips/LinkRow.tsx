import { isMobile } from "@/utils/navigation";
import { useTranslation } from "react-i18next";
import { LinkChips } from "./LinkChips/LinkButtons";
import resume from "/resume_gvalente.pdf";

import "./style.css";

export function LinkRow() {
  const { t } = useTranslation();
  return (
    <div className={"link-row"}>
      {isMobile() && <LinkChips />}
      <a className="link-button" href={resume} target="_blank" rel="noopener noreferrer">
        {t("hero.resume")}
      </a>
      <button onClick={() => window.scrollTo({ top: 99999, behavior: "auto" })} className="link-button">
        {t("hero.contact")}
      </button>
    </div>
  );
}
