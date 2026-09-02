import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils/navigation";

import "./style.css";
import { useIntersection } from "@/hooks/useIntersection";
import { GearRow } from "@/components/floating/gears/GearRow";

export const About = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersection({
    once: false,
  });

  return (
    <section id="about" ref={ref} className={`about-section reveal${isIntersecting ? " in-view" : ""}`}>
      <GearRow
        colorA="rgb(61, 108, 63)"
        colorB="rgb(229, 172, 96)"
        left={isMobile() ? -55 : 400}
        top={-180}
        rotationSpeed={20}
        sizeRatios={isMobile() ? [1, 0.6, 1.1, 0.6, 0.71] : [1, 0.6, 1.1]}
        gearSize={isMobile() ? 120 : 128}
        amount={isMobile() ? 6 : 4}
        isHorizontal={true}
      />
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
