import { useEffect, useState } from "react";
import { CreativeCanvas } from "./components/creative_canvas/creative_canvas";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { About } from "./components/sections/about/About";
import { Contact } from "./components/sections/contact/Contact";
import { HeroSection } from "./components/sections/hero/Hero";
import { Projects } from "./components/sections/projects/Projects";
import { AsciiElements } from "./components/Ascii_Elements/AnimatedPlayer.tsx/AsciiElements";
import { useWaveData, WavyBackground } from "./components/wavy-background/Wavy_background";
import { SlidingElement } from "./components/wavy-background/SlidingElement/SlidingElement";
import { isMobile } from "./utils/navigation";
import { useOpacityAnimation } from "./shared/hooks/useOpacityAnimation";

function App() {
  const [isDark, setIsDark] = useState(true);
  const wave = useWaveData();

  const opacityAnim = useOpacityAnimation<HTMLDivElement>({
    delay: 1800,
    duration: 3000,
    endOnScroll: true,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="App">
      <AsciiElements />
      <div ref={opacityAnim.ref}>
        {!isMobile() && opacityAnim.hasStarted ? <CreativeCanvas /> : null} <SlidingElement paths={wave.paths} />
        <WavyBackground sections={wave.sections} totalHeight={wave.totalHeight} svgTop={wave.svgTop} padding={wave.padding} />
        <Header setIsDark={setIsDark} isDark={isDark} />
      </div>

      <div className="page-content">
        <HeroSection />
        <Projects />
        <About isDark={isDark} />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
