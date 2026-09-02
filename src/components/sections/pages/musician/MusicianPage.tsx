import { useTranslation } from "react-i18next";
import { ArtistCatalogs } from "./ArtistCatalog/ArtistsCatalog";

import "./style.css";

export function MusicianPage() {
  const { t } = useTranslation();

  return (
    <div className="page musician-page">
      <div className="musician-intro">
        <div className="musician-title">
          <h2>{t("musician.intro")}</h2>
        </div>
        <p>{t("musician.p0")}</p>
      </div>
      <ArtistCatalogs />
    </div>
  );
}
