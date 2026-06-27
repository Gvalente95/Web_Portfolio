import "./style.css";

export function SpotifyPlayer({ artistId }: { artistId: string }) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/artist/${artistId}?theme=0`}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "12px",
      }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

export function SpotifyContainer() {
  return (
    <div className="spotify-container">
      <SpotifyPlayer artistId="7vBqRAQvSzrHZKVh3Vdmr6" />
      <SpotifyPlayer artistId="24WXaykATkIU7tYWaTyNhu" />
    </div>
  );
}
