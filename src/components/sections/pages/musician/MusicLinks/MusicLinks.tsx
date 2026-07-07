import SpotifyLogo from "@/assets/svg/spotify.svg";
import AppleMusicLogo from "@/assets/svg/apple-music.svg";
import SoundCloudLogo from "@/assets/svg/soundcloud.svg";

import "./style.css";

export function MusicLinks() {
  const linksData = [
    { icon: SpotifyLogo, url: "https://open.spotify.com/intl-fr/artist/7vBqRAQvSzrHZKVh3Vdmr6", info: "Spotify" },
    { icon: AppleMusicLogo, url: "https://music.apple.com/us/artist/lesonnar/1557033025", info: "Apple Music" },
    { icon: SoundCloudLogo, url: "", info: "Deezer" },
  ];
  return (
    <div className="music-links">
      {linksData.map((data, _) => {
        return <img style={{ top: _ * 40, left: _ }} src={data.icon} className="icon music-link" />;
      })}
    </div>
  );
}
