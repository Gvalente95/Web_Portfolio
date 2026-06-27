import { useEffect, useState } from "react";
import { CreativeCanvas } from "./components/creative_canvas/creative_canvas";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { About } from "./components/sections/about/About";
import { Contact } from "./components/sections/contact/Contact";
import { HeroSection } from "./components/sections/hero/Hero";
import { Projects } from "./components/sections/projects/Projects";
import { AsciiElements } from "./components/Ascii_Elements/AnimatedPlayer.tsx/AsciiElements";
import { WavyBackground } from "./components/creative_canvas/wavy-background/Wavy_background";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="App">
      <AsciiElements />
      <CreativeCanvas />

      <WavyBackground />

      <Header setIsDark={setIsDark} isDark={isDark} />

      <div className="page-content">
        <HeroSection />
        <Projects />
        <About />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
