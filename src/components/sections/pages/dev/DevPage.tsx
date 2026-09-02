import { useTranslation } from "react-i18next";
import { DevProjects } from "./DevProjects/DevProjects";

import "./style.css";

export function DevIntro() {
  const { t } = useTranslation();

  return (
    <div className="dev-intro">
      <div className="dev-intro--left">
        <div className="dev-title">
          <h1>{t("dev.intro")}</h1>
        </div>
        <>
          <p>{t("dev.p0")}</p>
        </>
      </div>
    </div>
  );
}

export function DevPage() {
  return (
    <div className="page dev-page">
      <DevIntro />
      <DevProjects />
    </div>
  );
}
