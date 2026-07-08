import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { LanguageDropdown } from "./LangDropdown/LangDropdown";

import "./style.css";
import { useAnimate } from "@/hooks/useAnimate";
import { useMemo } from "react";
import { useTextEffect } from "@/hooks/useTextEffect";

export function Header() {
  const { t } = useTranslation();
  const name = useTextEffect({ target: t("common.name"), type: "_", duration: 300, delay: 200 });

  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";
  const delays = useMemo(() => [0, 100, 600, 800, 1000], []);
  const timers = useAnimate({ delays });

  const pages = t("header.pages", { returnObjects: true });

  return (
    <header className={`${timers[0].done ? "ready" : ""}`}>
      <NavLink className={`home-button${timers[1].done ? " ready" : ""}`} to={`/${lang}/`}>
        {name.text}
      </NavLink>

      <div className="right-section">
        {Object.entries(pages).map(([key, value], _) => {
          const timer = timers[_ + 2];
          return (
            <NavLink key={key} to={`/${lang}/${key}`} className={({ isActive }) => `header-button${isActive ? " selected" : ""}${timer.done ? " ready" : ""}`}>
              <div> {value}</div>
            </NavLink>
          );
        })}
        <div className={`language-dropdown${timers[4].done ? " ready" : ""}`}>
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}
