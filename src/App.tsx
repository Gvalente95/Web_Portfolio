import { useAppContext } from "./contexts/AppContext";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { About } from "./components/sections/about/About";
import { Contact } from "./components/sections/contact/Contact";
import { HeroSection } from "./components/sections/hero/Hero";
import { Projects } from "./components/sections/projects/Projects";
import { AsciiElements } from "./components/Ascii_Elements/AnimatedPlayer.tsx/AsciiElements";
import { useWaveData, WavyBackground } from "./components/wavy-background/Wavy_background";
import { SlidingElement } from "./components/wavy-background/SlidingElement/SlidingElement";
import { useOpacityAnimation } from "./shared/hooks/useOpacityAnimation";

import "./style/fonts.css";

function App() {
  const { isDark, setIsDark } = useAppContext();
  const wave = useWaveData();

  const opacityAnim = useOpacityAnimation<HTMLDivElement>({
    delay: 2000,
    duration: 1000,
    endOnScroll: true,
  });

  return (
    <div className="App">
      <AsciiElements />
      <div ref={opacityAnim.ref}>
        {/* {!isMobile() && opacityAnim.hasStarted ? <CreativeCanvas /> : null} */}
        <SlidingElement paths={[wave.paths[0], wave.paths[wave.paths.length - 1]]} />
        <WavyBackground sections={wave.sections} totalHeight={wave.totalHeight} svgTop={wave.svgTop} padding={wave.padding} />
        <Header setIsDark={setIsDark} isDark={isDark} />
      </div>

      <div className="page-content">
        <HeroSection />
        <Projects />
        <About isDark={isDark} />
        <Contact />
      </div>
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
