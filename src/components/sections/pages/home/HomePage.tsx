import { Hero } from "./hero/Hero";
import { HomeContent } from "./content/content";

export function HomePage() {
  return (
    <div className="page hero-page">
      <Hero />
      <HomeContent />
    </div>
  );
}
