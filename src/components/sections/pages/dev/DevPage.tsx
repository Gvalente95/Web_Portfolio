import { Projects } from "./Projects.tsx/Projects";

import "./style.css";

export function DevPage() {
  return (
    <div className="page dev-page">
      <div className="dev-intro">
        <p>I Started my journey as a Developper in 2020, during Covid years, </p>
      </div>
      <Projects />
    </div>
  );
}
