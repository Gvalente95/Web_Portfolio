import { useAppContext } from "@/contexts/AppContext";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { AudioPlayer } from "./AudioPlayer.tsx/AudioPlayer";
import { Hint } from "./Hint/Hint";

export function FloatingElements() {
  const { currentTrack } = useAudioPlayer();
  const { hintData } = useAppContext();
  return (
    <div>
      {currentTrack && <AudioPlayer />}
      {hintData && <Hint />}
    </div>
  );
}
