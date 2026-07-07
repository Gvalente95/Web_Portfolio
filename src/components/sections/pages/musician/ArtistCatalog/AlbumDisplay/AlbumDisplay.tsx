import type { AudioAlbum } from "../ArtistsCatalog";
import { useAudioPlayer } from "../../../../../../contexts/AudioPlayerContext";
import { useTextEffect } from "@/hooks/useTextEffect";
import { isMobile } from "@/utils/navigation";
import { AlbumTrack } from "./AlbumTrack.tsx/AlbumTrack";
import { formatAudioFileName } from "./utils";

import "./style.css";
import { useEffect } from "react";

export function AlbumBottomDisplay({ albumName, trackName, isAlbumPlaying }: { albumName: string; trackName: string; isAlbumPlaying: boolean }) {
  const { text } = useTextEffect({ target: trackName + " ", type: "loop", stepDuration: 100, autoStart: true });
  return <div className="album-track-name">{isAlbumPlaying ? text.slice(0, 25 - albumName.length) : trackName}</div>;
}

type AlbumDisplayProps = {
  album: AudioAlbum & { name: string };
  artistName: string;
  isGhost: boolean;
  onOpen?: (rect: DOMRect) => void;
  startRect?: DOMRect | null;
};

export function AlbumDisplay({ album, artistName, isGhost, onOpen, startRect }: AlbumDisplayProps) {
  const { onToggleAlbum, isAlbumOpen, currentTrack, isPlaying } = useAudioPlayer();

  const mobile = isMobile();
  const active = (!mobile || isGhost) && isAlbumOpen(album.name);
  const isAlbumSelected = currentTrack && currentTrack.albumName === album.name;
  const isAlbumPlaying = isAlbumSelected && isPlaying ? true : false;

  function handleClick(e: React.MouseEvent) {
    if (!isGhost) onOpen?.(e.currentTarget.getBoundingClientRect());
    onToggleAlbum(album.name);
  }

  useEffect(() => {
    function closeOnScroll() {
      onToggleAlbum(album.name, false);
    }
    isGhost && window.addEventListener("scroll", closeOnScroll);
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, []);

  return (
    <div
      className={`album-display-wrap${active ? " active" : ""}${isAlbumPlaying ? " playing" : ""}${isGhost ? " ghost" : ""}`}
      style={
        isGhost && startRect
          ? ({
              "--ghost-left": `${startRect.left}px`,
              "--ghost-top": `${startRect.top}px`,
              "--ghost-width": `${startRect.width}px`,
              "--ghost-height": `${startRect.height}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="album-float">
        <div onClick={handleClick} className={`album-display${active ? " active" : ""}`} key={album.name}>
          <img className="album-icon" src={album.icon} alt={"File not found " + album.icon} />
          <div className="album-info">
            {album.files.map((f) => (
              <AlbumTrack fileName={f} artistName={artistName} albumIcon={album.icon} albumName={album.name} albumPath={album.path} />
            ))}
          </div>

          {!active && (
            <div className="album-bottom">
              <div className="album-title">{album.name}</div>
              {isAlbumSelected && <AlbumBottomDisplay albumName={album.name} trackName={formatAudioFileName(currentTrack.name)} isAlbumPlaying={isAlbumPlaying} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
