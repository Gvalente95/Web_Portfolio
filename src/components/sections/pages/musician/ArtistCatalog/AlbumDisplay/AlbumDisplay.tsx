import { useState } from "react";
import type { AudioAlbum } from "../ArtistsCatalog";
import { useAudioPlayer } from "../../../../../../contexts/AudioPlayerContext";

import "./style.css";
import { useTextEffect } from "../../../home/hero/image/asciiAnimation/AnimatedText";

type AlbumDisplayProps = {
  album: AudioAlbum & { name: string };
  artistName: string;
};

export function AlbumBottomDisplay({ albumName, trackName, isAlbumPlaying }: { albumName: string; trackName: string; isAlbumPlaying: boolean }) {
  const { text } = useTextEffect({ target: trackName + " ", type: "loop", stepDuration: 100 });

  return <div className="album-track-name">{isAlbumPlaying ? text.slice(0, 25 - albumName.length) : trackName}</div>;
}

export function AlbumDisplay({ album, artistName }: AlbumDisplayProps) {
  const [active, setActive] = useState(false);

  const { onTrackChange, onTrackPause, currentTrack, isPlaying } = useAudioPlayer();

  function formatLabel(labelRaw: string) {
    return labelRaw.replaceAll(".wav", "").replaceAll(".mp3", "").replaceAll(".aif", "");
  }

  const isAlbumSelected = currentTrack && currentTrack.albumName === album.name;
  const isAlbumPlaying = isAlbumSelected && isPlaying ? true : false;

  return (
    <div className={`album-display-wrap${active ? " active" : ""}${isAlbumPlaying ? " playing" : ""}`}>
      <div onClick={() => setActive(!active)} className={`album-display${active ? " active" : ""}`} key={album.name}>
        <img className="album-icon" src={album.icon} alt={"File not found " + album.icon} />
        <div className="album-info">
          {album.files.map((f) => {
            const isCurrentTrack = currentTrack && currentTrack.src === album.path + f;

            return (
              <div
                key={album.path + f}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const fullPath = album.path + f;
                  if (isCurrentTrack) onTrackPause();
                  else onTrackChange({ artistName: artistName, name: f, src: fullPath, albumName: album.name, albumIcon: album.icon });
                }}
                className={`album-track${isCurrentTrack ? " selected" : ""}${isCurrentTrack && isPlaying ? " playing" : ""}`}
              >
                {formatLabel(f)}
              </div>
            );
          })}
        </div>
        {!active && (
          <div className="album-bottom">
            <div className="album-title">{album.name}</div>
            {isAlbumSelected && <AlbumBottomDisplay albumName={album.name} trackName={formatLabel(currentTrack.name)} isAlbumPlaying={isAlbumPlaying} />}
          </div>
        )}
      </div>
    </div>
  );
}
