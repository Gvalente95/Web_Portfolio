import { useTranslation } from "react-i18next";
import { ArtistCatalogs } from "./ArtistCatalog/ArtistsCatalog";

import "./style.css";

export function MusicianPage() {
  const { t } = useTranslation();

  return (
    <div className="page musician-page">
      <div className="page-intro">
        <h3>{t("musician.intro")}</h3>
        <p>{t("musician.p0")}</p>
      </div>
      <ArtistCatalogs />
    </div>
  );
}
