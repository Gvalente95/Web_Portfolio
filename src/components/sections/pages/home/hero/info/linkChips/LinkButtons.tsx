import GithubIcon from "@/assets/svg/github.svg?react";
import YoutubeIcon from "@/assets/svg/youtube.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";

import "./style.css";

export function LinkChips() {
  const data = {
    github: { url: "https://github.com/Gvalente95", icon: GithubIcon },
    youtube: { url: "https://www.youtube.com/@lesonnar6722", icon: YoutubeIcon },
    instagram: { url: "https://www.instagram.com/giulio.valente95/", icon: InstagramIcon },
  };

  return (
    <div className="link-chips">
      {Object.entries(data).map(([key, chip]) => {
        const Icon = chip.icon;
        return (
          <a className="link-chip" key={key} href={chip.url} target="_blank" rel="noopener noreferrer">
            <Icon className="icon" />
          </a>
        );
      })}
    </div>
  );
}
