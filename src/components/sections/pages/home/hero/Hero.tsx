import { HeroInfo } from "./info/HeroInfo";
import { HeroImage } from "./image/HeroImage";
import { useIntersection } from "@/hooks/useIntersection";
import { isMobile } from "@/utils/navigation";
import { LinkRow } from "./info/linkChips/LinkRow";

import "./style.css";

export function Hero() {
  const { ref, isIntersecting } = useIntersection({ once: false });
  return (
    <section ref={ref} id="hero" className={`hero reveal${isIntersecting ? " in-view" : ""}`}>
      <HeroInfo />
      <HeroImage />
      {isMobile() && <LinkRow />}
    </section>
  );
}
