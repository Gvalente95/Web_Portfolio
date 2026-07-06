import sidebarIcon from "@/assets/svg/sidebar.svg";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { LanguageDropdown } from "../LangDropdown/LangDropdown";

import "./style.css";

export function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";
  const pages = t("header.pages", { returnObjects: true }) as Record<string, string>;

  function openMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      if (!headerRef.current) return;
      if (headerRef.current.contains(e.target as Node)) return;

      setOpen(false);
    }
    window.addEventListener("mouseup", handleGlobalClick);
    return () => window.removeEventListener("mouseup", handleGlobalClick);
  }, []);

  return (
    <div className={`header-mobile${open ? " open" : ""}`} ref={headerRef}>
      {!open && <img className="header-toggler" onClick={openMenu} src={sidebarIcon} />}

      <div className={`header-mobile${open ? " open" : ""}`} ref={headerRef}>
        {!open && <img className="header-toggler closed" onClick={openMenu} src={sidebarIcon} />}
        <div className="menu-panel">
          <div className="open-menu">
            <div className="header--top-bar">
              <LanguageDropdown />
              <img className="header-toggler" onClick={closeMenu} src={sidebarIcon} />
            </div>

            <NavLink onClick={closeMenu} end to={`/${lang}/`} className={({ isActive }) => `header-button--mobile${isActive ? " selected" : ""}`}>
              HOME
            </NavLink>

            {Object.entries(pages).map(([key, value]) => (
              <NavLink onClick={closeMenu} key={key} to={`/${lang}/${key}`} className={({ isActive }) => `header-button--mobile${isActive ? " selected" : ""}`}>
                {value}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
