import { Skills } from "../skills/Skills";
import "./style.css";

export const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-card">
        <div className="about-kicker">About me</div>

        <h2>Audio engineer turned creative web developer.</h2>

        <p>I build interactive web experiences with a strong focus on clean interfaces, motion, audio, and playful technical systems.</p>

        <p>My background in audio engineering gives me a creative approach to software: I like building tools, interfaces, and experiences that feel responsive, polished, and alive.</p>

        <Skills />
      </div>
    </section>
  );
};
