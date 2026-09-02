import { Hero } from "./hero/Hero";
import { Skills } from "./skills/Skills";
import { About } from "./about/About";
import { Contact } from "./contact/Contact";
import { FeaturedWork } from "./featuredWork/FeaturedWork";

import "./style.css";

export function HomePage() {
  return (
    <div className="page home-page">
      <Hero />
      <About />
      <FeaturedWork />
      <Skills />
      <Contact />
    </div>
  );
}
