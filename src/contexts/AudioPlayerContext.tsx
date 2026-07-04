import { createContext, useContext, useRef, useState, type ReactNode } from "react";

type Track = {
  name: string;
  src: string;
  albumName: string;
  artistName: string;
  albumIcon: string;
};

type PlayerState = {
  volume: number;
  playtime: number;
  isPlaying: boolean;
  currentTrack: Track | null;
  duration: number;
};

type AudioPlayerContextValue = PlayerState & {
  onTrackChange: (track: Track) => void;
  onTrackStart: () => void;
  onTrackStop: () => void;
  onTrackPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playtime, setPlaytime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      audioRef.current.ontimeupdate = () => {
        setPlaytime(audioRef.current?.currentTime ?? 0);
      };

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration ?? 0);
      };

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setPlaytime(0);
      };
    }

    return audioRef.current;
  };

  const onTrackChange = (track: Track) => {
    const audio = getAudio();

    audio.src = track.src;
    audio.currentTime = 0;
    audio.volume = volume;

    setDuration(0);
    setCurrentTrack(track);
    setPlaytime(0);
    setIsPlaying(true);

    audio.play();
  };

  const onTrackStart = () => {
    const audio = getAudio();

    if (!currentTrack) return;

    audio.play();
    setIsPlaying(true);
  };

  const onTrackPause = () => {
    const audio = getAudio();

    audio.pause();
    setIsPlaying(false);
  };

  const onTrackStop = () => {
    const audio = getAudio();

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setPlaytime(0);
  };

  const onVolumeChange = (nextVolume: number) => {
    const audio = getAudio();
    const clamped = Math.min(1, Math.max(0, nextVolume));

    audio.volume = clamped;
    setVolume(clamped);
  };

  const onSeek = (time: number) => {
    const audio = getAudio();

    audio.currentTime = time;
    setPlaytime(time);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        volume,
        playtime,
        isPlaying,
        duration,
        currentTrack,
        onTrackChange,
        onTrackStart,
        onTrackStop,
        onTrackPause,
        onVolumeChange,
        onSeek,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);

  if (!ctx) {
    throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
  }

  return ctx;
}
