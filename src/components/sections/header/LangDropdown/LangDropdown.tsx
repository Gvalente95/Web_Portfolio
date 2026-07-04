import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import worldIcon from "@assets/svg/world.svg";

import "./style.css";

export function LanguageDropdown() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSelected(false);
      }
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const languages = t("header.languages", {
    returnObjects: true,
  });

  useEffect(() => {
    document.body.classList.toggle("dropdown-open", selected);
    return () => {
      document.body.classList.remove("dropdown-open");
    };
  }, [selected]);

  return (
    <div ref={ref} className={`lang-dropdown${selected ? " active" : ""}`}>
      <button onClickCapture={() => setSelected((prev) => !prev)}>
        <img src={worldIcon} alt="world"></img>
        {`${t("language")} ▼`}
      </button>

      {selected && (
        <div className="content">
          {Object.entries(languages).map(([key, value]) => (
            <NavLink className={`${value === t("language") ? "active" : ""}`} key={key} to={pathname.replace(t("langPath"), `/${key}`)}>
              {value}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
