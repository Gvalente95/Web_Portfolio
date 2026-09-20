import "./style.css";

export function BadgesRow({ label, badges }: { label: string; badges: string[] }) {
  return (
	<div className="project-badge-row">
	  {label && <span className="project-badge-label">{label}</span>}

	  <div className="project-badges">
		{badges.map((fileName) => (
		  <img key={fileName} src={`/badge/${fileName}`} alt={fileName} />
		))}
	  </div>
	</div>
  );
}

