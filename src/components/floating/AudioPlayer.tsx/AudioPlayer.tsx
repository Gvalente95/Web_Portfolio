import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";
import { clamp } from "@/utils/math";
import PauseIcon from "@/assets/svg/pause.svg?react";
import PlayIcon from "@/assets/svg/play.svg?react";
import EffronteIcon from "@/assets/svg/effronte.svg?react";
import EfbackIcon from "@/assets/svg/efback.svg?react";
import ShuffleIcon from "@/assets/svg/shuffle.svg?react";
import CloseIcon from "@/assets/svg/close.svg?react";

import { NavLink, useLocation } from "react-router-dom";

import { createPortal } from "react-dom";
import { useDragObject } from "../../../hooks/useDragObject";

import "./style.css";

export function useAutoRotation() {
  const { isPlaying } = useAudioPlayer();

  const isSpinningManuallyRef = useRef(false);

  const [diskRotation, setDiskRotation] = useState(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) return;
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (!isSpinningManuallyRef.current) {
        rotationRef.current = (rotationRef.current + delta * 0.06) % 360;
        setDiskRotation(rotationRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  return { diskRotation };
}

export function AudioPlayer() {
  const { currentTrack, isPlaying, duration, playtime, onTrackSkip, onTrackStart, onTrackPause, onSeek, onToggleShuffle, isShuffle, onClose } = useAudioPlayer();
  const { dragRef } = useDragObject({
    onDown: (v) => onSeek(clamp(v.normX * duration, 0, duration - 5)),
    onDrag: (v) => onSeek(clamp(v.normX * duration, 0, duration - 5)),
  });
  const { diskRotation } = useAutoRotation();
  const { pathname } = useLocation();
  const lang = pathname.split("/")[1] || "en";

  if (!currentTrack) return <div></div>;

  let trackProgress = (playtime / duration) * 100;

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const node = (
    <div className={`audio-player${isPlaying ? " playing" : ""}`}>
      <div className="player-box">
        <div className="disk-wrap">
          <div className="disk" style={{ "--disk-rotation": `${diskRotation}deg` } as React.CSSProperties}>
            <img src={currentTrack.albumIcon}></img>
            <NavLink to={`/${lang}/music`} className="nav-icon" aria-label="Go to music page" />
          </div>
          <div className="player-control">
            <EfbackIcon className="icon" onClick={() => onTrackSkip("left")} />
            {isPlaying ? <PauseIcon className="icon play-icon" onClick={() => onTrackPause()} /> : <PlayIcon className="icon play-icon" onClick={() => onTrackStart()} />}
            <EffronteIcon className="icon" onClick={() => onTrackSkip("right")} />
            <ShuffleIcon className={`icon${isShuffle ? " active" : ""}`} onClick={() => onToggleShuffle()} />
          </div>
        </div>

        <div className="track-info">
          <div className="artist-label">{currentTrack?.artistName}</div>

          <div className="album-label">{currentTrack?.albumName}</div>
          <div className="track-label">{currentTrack?.name}</div>

          <div className="track-progress-row">
            <div className="track-progress--info">{formatTime(playtime)}</div>
            <div ref={dragRef} className="track-progress">
              <div className="track-progress--fill" style={{ width: `${trackProgress}%` }} />
            </div>
            <div className="track-progress--info">{formatTime(duration)}</div>
          </div>
        </div>
      </div>
      <CloseIcon className="icon close" onClick={() => onClose()} />
    </div>
  );

  return createPortal(node, document.body);
}
