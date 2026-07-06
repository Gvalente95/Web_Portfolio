import instagramIcon from "@/assets/svg/instagram.svg?react";
import youtubeIcon from "@/assets/svg/youtube.svg?react";
import githubIcon from "@/assets/svg/github.svg?react";

import "./style.css";

export const Footer = () => {
  const links = [
    { label: "Dawn.w", url: "https://www.instagram.com/dinnerandwhiskey/", icon: instagramIcon },
    { label: "LeSonnar", url: "https://www.instagram.com/lesonnar_/", icon: instagramIcon },
    { label: "GitHub", url: "https://github.com/Gvalente95/", icon: githubIcon },
    { label: "YouTube", url: "https://www.youtube.com/@lesonnar6722", icon: youtubeIcon },
  ];

  return (
    <footer className="footer">
      <div>© 2026 Giulio Valente. All Rights Reserved.</div>
      <div className="footer-inner">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="footer-link">
              <Icon className="footer-icon" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </footer>
  );
};
