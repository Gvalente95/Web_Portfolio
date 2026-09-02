import { useEffect, useState, useRef } from "react";
import GithubIcon from "@/assets/svg/github.svg?react";
import InstagramIcon from "@/assets/svg/instagram.svg?react";
import LinkedIcon from "@/assets/svg/linkedin.svg?react";
import EmailIcon from "@/assets/svg/email.svg?react";

import CopyIcon from "@/assets/svg/copy.svg?react";

import "./style.css";
import { usePageChange } from "@/hooks/usePageChange";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from "react-i18next";

const data = {
  github: { url: "https://github.com/Gvalente95", icon: GithubIcon, scale: 1 },
  email: { url: "https://www.youtube.com/@lesonnar6722", icon: EmailIcon, scale: 1 },
  instagram: { url: "https://www.instagram.com/giulio.valente95/", icon: InstagramIcon, scale: 1 },
  LinkedIcon: { url: "https://www.linkedin.com/in/giulio-valente-966998169", icon: LinkedIcon, scale: 1 },
};

export function LateralBar() {
  const { t } = useTranslation();
  const [mailbarOpen, setMailbarOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [chipsReady, setChipsReady] = useState<number>(-1);
  const pageVersion = usePageChange();
  const { showHint, hideHint } = useAppContext();
  const mailRef = useRef<HTMLDivElement>(null);

  const emailAddress = "valente95giulio@gmail.com";
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

  function onMailCick(e: React.MouseEvent) {
    showHint(t("emailCopied"), e.currentTarget);
    navigator.clipboard.writeText(emailAddress);
  }

  useEffect(() => {
    function onScroll() {
      setMailbarOpen(false);
      hideHint();
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hideHint]);

  useEffect(() => {
    if (!mailbarOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!mailRef.current) return;
      if (mailRef.current.contains(e.target as Node)) return;
      setMailbarOpen(false);
      hideHint();
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mailbarOpen, hideHint]);

  function onToggleMailBar() {
    setMailbarOpen((prev) => !prev);
  }

  return (
    <div className={`lateral-bar${ready ? " ready" : ""}`}>
      <div className={`bar`}>
        <div className="bar-links">
          {Object.entries(data).map(([key, chip], _) => {
            const Icon = chip.icon;
            const scale = chip.scale;
            if (key === "email") {
              return (
                <div key={key} ref={mailRef}>
                  {
                    <div className={`mail-sub-menu${mailbarOpen ? " open" : ""}`}>
                      {emailAddress}
                      <CopyIcon
                        onMouseEnter={(e) => showHint(t("copyEmail"), e.currentTarget)}
                        onMouseLeave={() => hideHint()}
                        onClick={(e) => onMailCick(e)}
                        className="orb-chip ready icon copy-icon "
                      />
                    </div>
                  }
                  <div className={`orb-chip${chipsReady >= _ ? " ready" : ""}${mailbarOpen ? " open" : ""}`}>
                    <Icon onClick={onToggleMailBar} className="icon" />
                  </div>
                </div>
              );
            }
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
