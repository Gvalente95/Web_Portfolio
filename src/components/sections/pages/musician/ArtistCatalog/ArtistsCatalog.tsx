import data from "../../../../../data/audio.json";
import { AlbumDisplay } from "./AlbumDisplay/AlbumDisplay";

import "./style.css";

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
  const artists = Object.entries(data as AudioData).map(([key, artist]) => ({
    id: key,
    ...artist,
    albums: Object.entries(artist.albums ?? {}).map(([albumName, album]) => ({
      name: albumName,
      ...album,
    })),
  }));

  return (
    <div className="artist-catalogs">
      {artists.map((artist) => (
        <div key={artist.id} className="artist">
          <h2>{artist.name}</h2>

          <div className="albums">
            {artist.albums.map((album) => (
              <AlbumDisplay artistName={artist.name} key={album.name} album={album} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
