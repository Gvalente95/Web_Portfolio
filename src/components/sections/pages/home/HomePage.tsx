import { Hero } from "./hero/Hero";
import { HomeContent } from "./content/content";

import { Skills } from "./about/skills/Skills";

import "./style.css";
import { About } from "./about/About";
import { Skillboard } from "./about/skillboard/Skillboard";

export function HomePage() {
  return (
    <div className="page home-page">
      <Hero />
      <About />
      <Skills />
      <Skillboard />
      <HomeContent />
    </div>
  );
}
