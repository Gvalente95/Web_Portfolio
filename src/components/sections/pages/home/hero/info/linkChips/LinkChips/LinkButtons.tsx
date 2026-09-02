import GithubIcon from "@/assets/svg/github.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";
import LinkedinIcon from "@/assets/svg/linkedin.svg?react";
import MailIcon from "@/assets/svg/email.svg?react";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from "react-i18next";

import "./style.css";

export function LinkChips() {
  const { t } = useTranslation();
  const { showHint, hideHint } = useAppContext();
  const data = {
    github: { url: "https://github.com/Gvalente95", icon: GithubIcon },
    // youtube: { url: "https://www.youtube.com/@lesonnar6722", icon: YoutubeIcon },
    instagram: { url: "https://www.instagram.com/giulio.valente95/", icon: InstagramIcon },
    linkedin: { url: "", icon: LinkedinIcon },
    mail: { url: "", icon: MailIcon },
  };

  const emailAddress = "valente95giulio@gmail.com";
  function onMailCick(e: React.MouseEvent) {
    showHint(t("emailCopied"), e.currentTarget);
    navigator.clipboard.writeText(emailAddress);
    setTimeout(() => {
      hideHint();
    }, 1000);
  }

  return (
    <div className="link-chips">
      {Object.entries(data).map(([key, chip]) => {
        const Icon = chip.icon;

        if (key === "mail") {
          return (
            <div key={key}>
              <Icon className="link-chip" onClick={(e) => onMailCick(e)} />
            </div>
          );
        }
        return (
          <a className="link-chip" key={key} href={chip.url} target="_blank" rel="noopener noreferrer">
            <Icon className="icon" />
          </a>
        );
      })}
    </div>
  );
}
