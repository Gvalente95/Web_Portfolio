import { useEffect, useState } from "react";
import GithubIcon from "@/assets/svg/github.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";
import LinkedIcon from "@/assets/svg/linkedin.svg?react";
import EmailIcon from "@/assets/svg/email.svg?react";

import "./style.css";
import { usePageChange } from "@/hooks/usePangeChange";

const data = {
  github: { url: "https://github.com/Gvalente95", icon: GithubIcon, scale: 1 },
  email: { url: "https://www.youtube.com/@lesonnar6722", icon: EmailIcon, scale: 1 },
  instagram: { url: "https://www.instagram.com/giulio.valente95/", icon: InstagramIcon, scale: 1 },
  LinkedIcon: { url: "", icon: LinkedIcon, scale: 1 },
};

export function LateralBar() {
  const [ready, setReady] = useState(false);
  const [chipsReady, setChipsReady] = useState<number>(-1);
  const pageVersion = usePageChange();

  useEffect(() => {
    setReady(false);
    setChipsReady(-1);

    const barStart = 0;
    const chipsStart = 200;
    const spacing = 50;
    const maxIndex = Object.keys(data).length - 1;

    let chipsTimeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      setReady(true);

      chipsTimeout = setTimeout(() => {
        interval = setInterval(() => {
          setChipsReady((prev) => {
            if (prev >= maxIndex) {
              clearInterval(interval);
              return prev;
            }

            return prev + 1;
          });
        }, spacing);
      }, chipsStart);
    }, barStart);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(chipsTimeout);
      clearInterval(interval);
    };
  }, [pageVersion]);

  return (
    <div className={`lateral-bar${ready ? " ready" : ""}`}>
      <div className="bar glow">
        <div className="bar-links">
          {Object.entries(data).map(([key, chip], _) => {
            const Icon = chip.icon;
            const scale = chip.scale;
            return (
              <a style={{ scale }} className={`orb-chip${chipsReady >= _ ? " ready" : ""}`} key={key} href={chip.url} target="_blank" rel="noopener noreferrer">
                <Icon className="icon bar-chip" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
