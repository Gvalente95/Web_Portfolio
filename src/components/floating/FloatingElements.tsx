import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { AudioPlayer } from "./AudioPlayer.tsx/AudioPlayer";

export function FloatingElements() {
  const { currentTrack } = useAudioPlayer();
  return <div>{currentTrack && <AudioPlayer />}</div>;
}
