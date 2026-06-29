import instagramIcon from "/image/badge/instagram.svg";
import youtubeIcon from "/image/badge/youtube.svg";
import githubIcon from "/image/badge/github.svg";

import "./style.css";

const links = [
  { label: "Dawn.w", url: "https://www.instagram.com/dinnerandwhiskey/", icon: instagramIcon },
  { label: "LeSonnar", url: "https://www.instagram.com/lesonnar_/", icon: instagramIcon },
  { label: "GitHub", url: "https://github.com/Gvalente95/", icon: githubIcon },
  { label: "YouTube", url: "https://www.youtube.com/@lesonnar6722", icon: youtubeIcon },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="footer-link">
            <img src={link.icon} alt="" className="footer-icon" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
};
