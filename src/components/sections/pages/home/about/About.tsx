import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils/navigation";

import "./style.css";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <div className="about-card">
        <div className="about-intro">
          <div className="about-text-block">
            <h2>{t("about.title")}</h2>
            <p>{t("about.p0")}</p>
            {!isMobile() && <p>{t("about.p1")}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
