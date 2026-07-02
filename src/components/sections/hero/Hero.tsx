import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollToSection } from "../../../utils/navigation";

import "./style.css";
import { lerpColor } from "../../../utils/colors";

type ColorRange = {
  start: number;
  end?: number;
  colorA: string;
  colorB: string;
};

const splitChars = (text: string, range?: ColorRange) => (
  <span className="char-line">
    {text.split("").map((char, i, chars) => {
      let color: string | undefined;

      if (range && i >= range.start) {
        const end = range.end ?? chars.length - 1;
        const length = end - range.start;
        const t = length <= 0 ? 1 : Math.min((i - range.start) / length, 1);

        color = lerpColor(range.colorA, range.colorB, t);
      }

      return (
        <span key={i} className="char" style={color ? { color } : undefined}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    })}
  </span>
);

export const HeroSection = () => {
  const [animFinished, setAnimFinished] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4, onComplete: () => setAnimFinished(true) });

      gsap.set(".char", {
        opacity: 0,
        y: 80,
        scaleY: 0.2,
        rotateX: -90,
        transformOrigin: "bottom center",
      });

      tl.add("nameStart")
        .to(
          ".hero-name:nth-child(1) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.01,
            ease: "back.out(2.2)",
          },
          "+=0.1",
        )
        .to(
          ".hero-name:nth-child(2) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.65,
            ease: "back.out(2.2)",
          },
          "nameStart",
        )
        .to(
          ".hero-job:nth-child(1) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.3,
            stagger: 0.001,
            ease: "circ.out(1.8)",
          },
          "+=0.0001",
        )
        .to(
          ".hero-job:nth-child(2) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.3,
            stagger: 0.01,
            ease: "circ.out(1.8)",
          },
          "-=0.15",
        )
        .to(
          ".hero-job:nth-child(3) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.3,
            stagger: 0.01,
            ease: "circ.out(1.8)",
          },
          "-=0.15",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleJobClick = (page: string, offset: number) => {
    if (!animFinished) return;
    scrollToSection(page, offset);
  };

  const colorA = "#737feb";
  const colorB = "#ad8ff3";

  return (
    <section ref={heroRef} id="hero" className={`hero-section${animFinished ? "" : " animating"}`}>
      <div className="hero-content">
        <div className="left">
          <div className="hero-name">{splitChars("Hi! I'm Giulio Valente", { start: 8, colorA, colorB })}</div>
        </div>

        <div className="right">
          <div onClick={() => handleJobClick("interactive-web-applications", 40)} className="hero-job">
            {splitChars("Web Developer,")}
          </div>

          <div onClick={() => handleJobClick("audio-programs", 10)} className="hero-job">
            {splitChars("Audio Engineer,")}
          </div>

          <div onClick={() => handleJobClick("games", 5)} className="hero-job">
            {splitChars("Game Programmer")}
          </div>
        </div>
      </div>
    </section>
  );
};
