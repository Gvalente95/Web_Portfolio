import { useTranslation } from "react-i18next";
import { Projects } from "./Projects.tsx/Projects";

import "./style.css";

export function DevPage() {
  const { t } = useTranslation();
  return (
    <div className="page dev-page">
      <div className="dev-intro">
        <p>{t("dev.intro")}</p>
      </div>
      <Projects />
    </div>
  );
}
