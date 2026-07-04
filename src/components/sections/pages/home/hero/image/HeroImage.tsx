import meIcon from "@assets/png/photos/me.png";

import "./style.css";

export function HeroImage() {
  return (
    <div className="hero-image">
      <img src={meIcon} />
    </div>
  );
}
