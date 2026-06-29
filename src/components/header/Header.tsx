import { useEffect, useRef, useState } from "react";
import { SwitchButton } from "../../shared/ui/switchButton/SwitchButton";
import { openPage, scrollToSection } from "../../utils/navigation";
import darkModeOnIcon from "../../assets/icons/white/night.png";
import darkModeOffIcon from "../../assets/icons/black/sun.png";

import "./style.css";

const pages = ["Projects", "About", "Contact", "Resume"];

export const Header = ({ setIsDark, isDark }: { setIsDark: React.Dispatch<React.SetStateAction<boolean>>; isDark: boolean }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const clickSound = useRef(new Audio("audio/flashlight.wav"));

  const tryScrollTo = (page: string) => {
    if (page === "Resume") openPage("resume_gvalente.pdf");
    else scrollToSection(page);
  };

  const reloadPage = () => {
    window.location.href = "/";
  };

  const handleSwitchClick = (v: boolean) => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();

    setIsDark(v);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <div className={`header-content ${isScrolling ? "scrolling" : ""}`}>
        <div className="header-top">
          <div className="header-title" onClick={reloadPage}>
            <div> GV</div>
          </div>

          <div className="header-theme-toggle">
            <SwitchButton onSwitch={handleSwitchClick} state={isDark} on_url={darkModeOnIcon} off_url={darkModeOffIcon} />
          </div>
        </div>
        <nav>
          {pages.map((page) => (
            <button className="header-button" key={page} onClick={() => tryScrollTo(page)}>
              {page}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
