import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { LanguageDropdown } from "./LangDropdown/LangDropdown";

import "./style.css";
import { isMobile } from "@/utils/navigation";

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";

  const pages = t("header.pages", { returnObjects: true });

  return (
    <header>
      <NavLink className="home" to={`/${lang}/`}>
        {t("common.name")}
      </NavLink>

      {!isMobile() && (
        <div className="right-section">
          {Object.entries(pages).map(([key, value]) => {
            return (
              <NavLink key={key} to={`/${lang}/${key}`} className={({ isActive }) => `header-button${isActive ? " selected" : ""}`}>
                <div> {value}</div>
              </NavLink>
            );
          })}
          <LanguageDropdown />
        </div>
      )}
    </header>
  );
}
