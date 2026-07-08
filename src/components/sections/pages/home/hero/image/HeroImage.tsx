import meIcon from "@/assets/png/photos/me.png";

import "./style.css";

export function HeroImage() {
  return (
    <div className={`hero-image`}>
      <div className="image-container">
        <img src={meIcon}></img>
      </div>
    </div>
  );
}
