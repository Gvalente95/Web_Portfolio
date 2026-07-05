import computerBgr from "@/assets/computer.jpg";
import { useSelectionBox } from "./useSelectionBox";
import terminalIcon from "@/assets/svg/terminal.svg";
import webApps from "@/data/web-apps.json";
import games from "@/data/games.json";
import audioApps from "@/data/audio-apps.json";

import "./style.css";

type Project = {
  info: string;
  info_short: string;
  image: string;
  video?: string;
  url: string;
  language: string;
  tags: string;
};

type ProjectsData = {
  content: Record<string, Project>;
};

export function Computer() {
  const { ref, selectionBoxRef, selectedIcons, setSelectedIcons, registerIcon } = useSelectionBox<string>();
  const webAppEntries = Object.entries((webApps as ProjectsData).content);
  const gameEntries = Object.entries((games as ProjectsData).content);
  const audioEntries = Object.entries((audioApps as ProjectsData).content);

  const allEntries = [...webAppEntries, ...gameEntries, ...audioEntries];

  const icons = [
    { name: "Terminal", image: terminalIcon, url: "" },
    ...allEntries.map(([name, project]) => ({
      name,
      image: project.image,
      url: project.url,
    })),
  ];

  return (
    <div
      className="computer"
      ref={ref}
      onMouseDown={() => {
        setSelectedIcons([]);
      }}
    >
      <img draggable={false} className="computer-bgr" src={computerBgr}></img>
      <div className="selection-box" ref={selectionBoxRef}></div>

      {icons.map(({ name, image, url }, idx) => {
        const col = idx % 5;
        const row = Math.floor(idx / 5);

        return (
          <div
            ref={registerIcon(name)}
            className={`computer-icon${selectedIcons.includes(name) ? " selected" : ""}`}
            style={{ left: `${col * 96}px`, top: `${row * 88}px` }}
            key={name}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcons([name]);
            }}
            onDoubleClickCapture={() => {
              window.location.href = url;
            }}
          >
            <img className="computer-icon-img" src={image} />
            <div>{name}</div>
          </div>
        );
      })}
    </div>
  );
}
