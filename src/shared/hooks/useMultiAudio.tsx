import { useState, useEffect } from "react";

type Player = {
  url: string;
  playing: boolean;
};
const useMultiAudio = (urls: string[]) => {
  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      };
    }),
  );

  const [players, setPlayers] = useState(
    urls.map((url) => {
      return {
        url,
        playing: false,
      };
    }),
  );

  const toggle = (targetIndex: number) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle] as const;
};

const MultiPlayer = ({ urls }: { urls: string[] }) => {
  const [players, toggle] = useMultiAudio(urls);

  return (
    <div>
      {players.map((player: Player, i: number) => (
        <Player key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
  );
};

const Player = ({ player, toggle }: { player: Player; toggle: () => void }) => (
  <div>
    <p>Stream URL: {player.url}</p>
    <button onClick={toggle}>{player.playing ? "Pause" : "Play"}</button>
  </div>
);

export default MultiPlayer;
