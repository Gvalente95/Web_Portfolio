import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { formatAudioFileName } from "../utils";

import "./style.css";

interface AlbumTrackProps {
  albumIcon: string;
  artistName: string;
  albumName: string;
  albumPath: string;
  fileName: string;
}
export function AlbumTrack({ albumIcon, artistName, albumName, albumPath, fileName }: AlbumTrackProps) {
  const { onTrackChange, onTrackPause, currentTrack, isPlaying } = useAudioPlayer();
  const fullPath = albumPath + fileName;

  const isCurrentTrack = currentTrack && currentTrack.src === fullPath;

  return (
    <div
      key={albumPath + fileName}
      onClickCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCurrentTrack) onTrackPause();
        else onTrackChange({ artistName: artistName, name: fileName, src: fullPath, albumName, albumIcon });
      }}
      className={`album-track${isCurrentTrack ? " selected" : ""}${isCurrentTrack && isPlaying ? " playing" : ""}`}
    >
      {formatAudioFileName(fileName)}
    </div>
  );
}
