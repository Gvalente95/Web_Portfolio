import { useAudioPlayer } from "../../../../contexts/AudioPlayerContext";
import { useSpinObject } from "../../../../hooks/useSpinObject";

import "./style.css";
import { NavLink, useLocation } from "react-router-dom";

export function AudioPlayer() {
  const { currentTrack, isPlaying, duration, volume, playtime, onTrackChange, onTrackStart, onTrackPause, onTrackStop, onVolumeChange, onSeek } = useAudioPlayer();

  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";

  const { ref, isMoving } = useSpinObject({ axes: ["x", "y"], drag: true });

  let leftHandlePos = 0;
  if (currentTrack) {
    leftHandlePos = (playtime / duration) * 100;
  }

  if (!currentTrack) {
    return <div></div>;
  }

  return (
    <div className={`audio-player${isPlaying ? " playing" : ""}`}>
      <div className="player-box">
        <div className="disk-wrap">
          <div ref={ref} className={`disk${isMoving ? " dragging" : ""}`}>
            {<img src={currentTrack.albumIcon}></img>}
          </div>
        </div>
        <div className="track-info">
          <NavLink to={`/${lang}/music`} className="artist-label">
            {currentTrack?.artistName}
          </NavLink>
          <div className="album-label">{currentTrack?.albumName}</div>
          <div className="track-label">{currentTrack?.name}</div>
        </div>
      </div>
    </div>
  );
}
