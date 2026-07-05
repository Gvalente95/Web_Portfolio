import { Timeline } from "./timeline/Timeline";
import { Vitrine } from "./vitrine/Vitrine";

import "./style.css";

export function HomeContent() {
  return (
    <div className="home-content">
      <Timeline />
      <Vitrine />
    </div>
  );
}
