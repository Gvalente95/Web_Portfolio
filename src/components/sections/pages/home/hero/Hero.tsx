import { HeroInfo } from "./info/HeroInfo";
import { HeroImage } from "./image/HeroImage";

import "./style.css";

export function Hero() {
  return (
    <section id="hero" className="hero">
      <HeroInfo />
      <HeroImage />
    </section>
  );
}
