import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { LanguageDropdown } from "./LangDropdown/LangDropdown";

import "./style.css";
import { AudioPlayer } from "./AudioPlayer.tsx/AudioPlayer";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";

  const { currentTrack } = useAudioPlayer();

  const pages = t("header.pages", { returnObjects: true });

  return (
    <header>
      <NavLink className="home" to={`/${lang}/`}>
        {t("common.name")}
      </NavLink>
      {currentTrack && <AudioPlayer />}

      <div className="right-section">
        {Object.entries(pages).map(([key, value]) => {
          return (
            <NavLink to={`/${lang}/${key}`} className={({ isActive }) => `header-button${isActive ? " selected" : ""}`}>
              <div> {value}</div>
            </NavLink>
          );
        })}
        <LanguageDropdown />
      </div>
    </header>
  );
}
