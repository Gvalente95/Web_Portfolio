import { Hero } from "./hero/Hero";
import { Skills } from "./about/skills/Skills";
// import { Skillboard } from "./about/skillboard/Skillboard";
import { About } from "./about/About";

import "./style.css";
import { GearRow } from "@/components/floating/gears/GearRow";
import { isMobile } from "@/utils/navigation";

export function HomePage() {
  return (
    <div className="page home-page">
      <Hero />
      <GearRow
        colorA="rgb(99, 146, 183)"
        colorB="rgb(229, 172, 96)"
        left={isMobile() ? -55 : 400}
        top={0}
        rotationSpeed={20}
        sizeRatios={isMobile() ? [1, 0.6, 1.1, .6, 0.71] : [1, 0.6, 1.1]}
        gearSize={isMobile() ? 120 : 128}
        amount={isMobile() ? 6 : 4}
        isHorizontal={true}
      />
      <About />
      <Skills />
      {/* <Skillboard /> */}
      {/* <HomeContent /> */}
    </div>
  );
}
