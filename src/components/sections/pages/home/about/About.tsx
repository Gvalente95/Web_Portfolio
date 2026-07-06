import { useTranslation } from "react-i18next";
import { useTextEffect } from "@/hooks/useAnimatedText";

import "./style.css";

export const About = () => {
  const { t } = useTranslation();
  const { text } = useTextEffect({ target: t("about.title"), duration: 500, type: "_" });

  return (
    <section id="about" className="about-section">
      <div className="about-card">
        <div className="about-intro">
          <div className="about-text-block">
            <h2>{text}</h2>
            <p>{t("about.p0")}</p>
            <p>{t("about.p1")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
