import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { r_range_int } from "../utils/math";

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
  audioTracks: Track[];
  isShuffle: boolean;
};

type AudioPlayerContextValue = PlayerState & {
  onTrackChange: (track: Track) => void;
  onTrackStart: () => void;
  onTrackStop: () => void;
  onTrackPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  loadAudioTracks: (tracks: Track[]) => void;
  onTrackSkip: (dir: "left" | "right") => void;
  onToggleShuffle: () => void;
  onClose: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioTracks, setAudioTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playtime, setPlaytime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

  const currentTrackRef = useRef<Track | null>(null);
  const audioTracksRef = useRef<Track[]>([]);
  const isShuffleRef = useRef(false);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    audioTracksRef.current = audioTracks;
  }, [audioTracks]);

  useEffect(() => {
    isShuffleRef.current = isShuffle;
  }, [isShuffle]);

  const onToggleShuffle = () => setIsShuffle((prev) => !prev);
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
        onTrackSkip("right");
      };
    }

    return audioRef.current;
  };

  const loadAudioTracks = (tracks: Track[]) => {
    setAudioTracks(tracks);
  };

  const onTrackSkip = (dir: "left" | "right") => {
    const track = currentTrackRef.current;
    const tracks = audioTracksRef.current;
    if (!track || tracks.length === 0) return;
    const idx = tracks.findIndex((f) => f.src === track.src);
    if (idx === -1) return;
    let newIdx;
    if (isShuffleRef.current) {
      if (tracks.length === 1) return;
      newIdx = r_range_int(0, tracks.length - 1);
      while (newIdx === idx) newIdx = r_range_int(0, tracks.length - 1);
    } else {
      newIdx = (idx + (dir === "left" ? -1 : 1) + tracks.length) % tracks.length;
    }
    onTrackChange(tracks[newIdx]);
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

  const onClose = () => {
    onTrackStop();
    setCurrentTrack(null);
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
        isShuffle,
        duration,
        currentTrack,
        audioTracks,
        onTrackChange,
        onTrackStart,
        onTrackStop,
        onTrackPause,
        onVolumeChange,
        onSeek,
        loadAudioTracks,
        onTrackSkip,
        onToggleShuffle,
        onClose,
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
