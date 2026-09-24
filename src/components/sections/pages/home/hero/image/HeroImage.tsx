import icon0 from "@/assets/png/photos/0.png";
import icon1 from "@/assets/png/photos/1.jpeg";
import icon2 from "@/assets/png/photos/2.jpg";
import icon3 from "@/assets/png/photos/3.jpg";
import icon4 from "@/assets/png/photos/4.png";

import "./style.css";
import { useState } from "react";

export function HeroImage() {
  const [index, setIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const icons = [icon0, icon1, icon2, icon3, icon4];

  const nextImage = () => {
    if (changing) return;

    setChanging(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % icons.length);
      setChanging(false);
    }, 180);
  };

  return (
    <div className={`hero-image`}>
      <div className={`image-container ${changing ? "changing" : ""}`} onClick={nextImage}>
        <img src={icons[index]} alt=""></img>
        <div className="image-switch-hint">
          <span>↻</span>
        </div>
      </div>
    </div>
  );
}
