import { useEffect, useState } from "react";
import data from "../../../../../data/audio.json";
import { AlbumDisplay } from "./AlbumDisplay/AlbumDisplay";

import "./style.css";
import { useAudioPlayer } from "../../../../../contexts/AudioPlayerContext";
import { isMobile } from "@/utils/navigation";

export type AudioAlbum = {
  name?: string;
  icon: string;
  files: string[];
  path: string;
};

export type AudioArtist = {
  name: string;
  icon?: string;
  albums: Record<string, AudioAlbum>;
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
    const tracks = artists.flatMap((art) =>
      art.albums.flatMap((album) =>
        album.files.map((f) => {
          return {
            artistName: art.name,
            name: f,
            src: album.path + f,
            albumName: album.name,
            albumIcon: album.icon,
          };
        }),
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

  return (
    <div className="artist-catalogs">
      {artists.map((artist) => (
        <div key={artist.id} className="artist" onClick={() => {}}>
          {/* <h2>{artist.name}</h2> */}
          <div className="albums">
            {artist.albums.map((album) => (
              <AlbumDisplay artistName={artist.name} key={album.name} album={album} isGhost={false} onOpen={setGhostStartRect} />
            ))}
          </div>
        </div>
      ))}
      {isMobile() && openedCenterAlbum && (
        <AlbumDisplay artistName={openedCenterAlbum.artistName} key={openedCenterAlbum.album.name + "-ghost"} album={openedCenterAlbum.album} isGhost={true} startRect={ghostStartRect} />
      )}
    </div>
  );
}
