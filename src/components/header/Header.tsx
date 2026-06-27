import { useEffect, useRef, useState } from "react";
import { SwitchButton } from "../../shared/ui/switchButton/SwitchButton";
import { openPage } from "../../utils/navigation";

import "./style.css";

const pages = ["Projects", "About", "Contact", "Resume"];

export const Header = ({ setIsDark, isDark }: { setIsDark: React.Dispatch<React.SetStateAction<boolean>>; isDark: boolean }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(window.scrollY);

  const scrollToSection = (page: string) => {
    if (page === "Resume") {
      openPage("/resume_gvalente.pdf");
      return;
    }
    document.getElementById(page.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const reloadPage = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScrollY.current);
      lastScrollY.current = current;
      if (delta < 40) return;
      setIsScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header>
      <div className={`header-content ${isScrolling ? "scrolling" : ""}`}>
        <div className="header-title" onClick={reloadPage}>
          Giulio Valente
        </div>
        <nav>
          {pages.map((page) => (
            <button key={page} onClick={() => scrollToSection(page)}>
              {page}
            </button>
          ))}
        </nav>
        <div className="header-theme-toggle">
          <SwitchButton onSwitch={setIsDark} state={isDark} />
        </div>
      </div>
    </header>
  );
};
