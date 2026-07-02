import { Skills } from "../skills/Skills";
import meImage from "@assets/me.png";

import "./style.css";

export const About = ({ isDark }: { isDark: boolean }) => {
  return (
    <section id="about" className="about-section">
      <div className="about-card">
        <div className="about-intro">
          <div className="about-text-block">
            <h2>
              <span>Audio engineer turned creative web developer.</span>
            </h2>
            <p>I build interactive web experiences with a strong focus on clean interfaces, motion, audio, and playful technical systems.</p>
            <p>My background in audio engineering gives me a creative approach to software: I like building tools, interfaces, and experiences that feel responsive, polished, and alive.</p>
          </div>
          <img src={meImage} className="profile-image" alt="Giulio Valente" />
        </div>

        <Skills isDark={isDark} />
      </div>
    </section>
  );
};
