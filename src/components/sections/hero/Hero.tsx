import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./style.css";

const splitChars = (text: string) => (
  <span className="char-line">
    {text.split("").map((char, i) => (
      <span key={i} className="char">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      gsap.set(".char", {
        opacity: 0,
        y: 80,
        scaleY: 0.2,
        rotateX: -90,
        transformOrigin: "bottom center",
      });

      tl.to(".hero-name:nth-child(1) .char", {
        opacity: 1,
        y: 0,
        scaleY: 1,
        rotateX: 0,
        duration: 0.65,
        stagger: 0.035,
        ease: "back.out(2.2)",
      })
        .to(
          ".hero-name:nth-child(2) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.65,
            stagger: 0.035,
            ease: "circ.out(2.2)",
          },
          "+=0.2",
        )
        .to(
          ".hero-job:nth-child(1) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.45,
            stagger: 0.018,
            ease: "circ.out(1.8)",
          },
          "+=0.45",
        )
        .to(
          ".hero-job:nth-child(2) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.45,
            stagger: 0.018,
            ease: "circ.out(1.8)",
          },
          "+=0.15",
        )
        .to(
          ".hero-job:nth-child(3) .char",
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: 0.45,
            stagger: 0.018,
            ease: "circ.out(1.8)",
          },
          "+=0.15",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="left">
        <div className="hero-name">{splitChars("Giulio")}</div>
        <div className="hero-name">{splitChars("Valente")}</div>
      </div>

      <div className="right">
        <div className="hero-job">{splitChars("Audio Engineer")}</div>
        <div className="hero-job">{splitChars("Web Developer")}</div>
        <div className="hero-job">{splitChars("Game Programmer")}</div>
      </div>
    </section>
  );
};
