import { Hero } from "./hero/Hero";
import { HomeContent } from "./content/content";

import { Skills } from "./about/skills/Skills";

import "./style.css";

export function HomePage() {
  return (
    <div className="page home-page">
      <Hero />
      <Skills />
      <HomeContent />
    </div>
  );
}
