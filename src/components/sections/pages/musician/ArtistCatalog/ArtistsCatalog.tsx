import { useEffect, useState } from "react";
import data from "../../../../../data/audio.json";
import { AlbumDisplay } from "./AlbumDisplay/AlbumDisplay";

import { useAudioPlayer } from "../../../../../contexts/AudioPlayerContext";
import { isMobile } from "@/utils/navigation";
import spotifyIcon from "@/assets/svg/spotify.svg";
import soundCloudIcon from "@/assets/svg/soundcloud.svg";
import instagramIcon from "@/assets/svg/instagram.svg";

import "./style.css";
import i18n from "@/i18n";

export type AudioAlbum = {
  name?: string;
  icon: string;
  files: string[];
  path: string;
};

type SupportedLanguage = "en" | "fr" | "it";

export type AudioArtist = {
  name: string;
  icon?: string;
  intro?: Partial<Record<SupportedLanguage, string>>;
  albums: Record<string, AudioAlbum>;
  youtubeUrls?: string[];
  spotifyUrl?: string;
  soundCloudUrl?: string;
  instagramUrl?: string;
};

type AudioData = Record<string, AudioArtist>;

export function ArtistCatalogs() {
  const [ghostStartRect, setGhostStartRect] = useState<DOMRect | null>(null);
  const { loadAudioTracks, isAlbumOpen } = useAudioPlayer();

  const artists = Object.entries(data as AudioData).map(([key, artist]) => ({
    id: key,
    ...artist,
    albums: Object.entries(artist.albums ?? {}).map(([albumName, album]) => ({
      name: albumName,
      ...album,
    })),
  }));

  useEffect(() => {
    const tracks = artists.flatMap((artist) =>
      artist.albums.flatMap((album) =>
        album.files.map((file) => ({
          artistName: artist.name,
          name: file,
          src: album.path + file,
          albumName: album.name,
          albumIcon: album.icon,
        })),
      ),
    );

    loadAudioTracks(tracks);
  }, []);

  const openedCenterAlbum = isMobile()
    ? artists
        .flatMap((artist) =>
          artist.albums.map((album) => ({
            artistName: artist.name,
            album,
          })),
        )
        .find(({ album }) => isAlbumOpen(album.name))
    : undefined;

  const language = i18n.resolvedLanguage?.split("-")[0] as SupportedLanguage;

  return (
    <div className="artist-catalogs">
      {artists.map((artist) => {
        const intro = artist.intro?.[language] ?? artist.intro?.en;

        return (
          <section key={artist.id} className="artist">
            <div className="artist-header">
              <div className="artist-title">
                <h2>{artist.name}</h2>
              </div>

              <div className="artist-links">
                {artist.spotifyUrl && (
                  <a className="artist-link" href={artist.spotifyUrl} target="_blank" rel="noreferrer" aria-label={`${artist.name} on Spotify`} title="Spotify">
                    <img src={spotifyIcon} alt="" />
                  </a>
                )}

                {artist.soundCloudUrl && (
                  <a className="artist-link" href={artist.soundCloudUrl} target="_blank" rel="noreferrer" aria-label={`${artist.name} on SoundCloud`} title="SoundCloud">
                    <img src={soundCloudIcon} alt="" />
                  </a>
                )}

                {artist.instagramUrl && <img src={instagramIcon} alt="" />}
              </div>

              {intro && <p className="artist-intro">{intro}</p>}
            </div>

            <div className="artist-divider" />

            <div className="albums">
              {artist.albums.map((album) => (
                <AlbumDisplay artistName={artist.name} key={album.name} album={album} isGhost={false} onOpen={setGhostStartRect} />
              ))}
            </div>

            {!!artist.youtubeUrls?.length && (
              <div className="youtube-container">
                {artist.youtubeUrls.map((url, index) => (
                  <YoutubeIFrame key={`${artist.id}-youtube-${index}`} url={url} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {isMobile() && openedCenterAlbum && (
        <AlbumDisplay artistName={openedCenterAlbum.artistName} key={`${openedCenterAlbum.album.name}-ghost`} album={openedCenterAlbum.album} isGhost startRect={ghostStartRect} />
      )}
    </div>
  );
}

export function YoutubeIFrame({ url }: { url: string }) {
  return (
    <iframe
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
