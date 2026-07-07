import { Hero } from "./hero/Hero";
import { Skills } from "./about/skills/Skills";
// import { Skillboard } from "./about/skillboard/Skillboard";
import { About } from "./about/About";

import "./style.css";
import { GearRow } from "@/components/gears/GearRow";
import { isMobile } from "@/utils/navigation";

export function HomePage() {
  return (
    <div className="page home-page">
      <Hero />
      <GearRow
        colorA="rgba(124, 184, 230, 0.67)"
        colorB="rgb(255, 255, 255)"
        left={isMobile() ? 0 : 400}
        top={0}
        rotationSpeed={20}
        sizeRatios={[1, 0.6, 1.1]}
        gearSize={isMobile() ? 120 : 128}
        amount={isMobile() ? 4 : 4}
        isHorizontal={true}
      />
      <About />
      <Skills />
      {/* <Skillboard /> */}
      {/* <HomeContent /> */}
    </div>
  );
}
