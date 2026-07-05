import "./style.css";

type TimelineDate = [number, number?, number?];

type TimelineStep = {
  start: TimelineDate;
  end?: TimelineDate;
  name?: string;
  info?: string[];
};

const timelineStart = 2016;
const timelineEnd = 2026;

export function Timeline() {
  const data: TimelineStep[] = [
    {
      start: [2019, 9, 12],
      end: [2020, 4, 12],
      name: "Aviation Administrative in the swiss army",
      info: ["Ord. Bureau Office and administrative tasks within aviation unit."],
    },
    {
      start: [2020, 5, 12],
      end: [2022, 2, 12],
      name: "Worked as an audio Technician",
      info: ["Live and studio audio setup, patching, maintenance and troubleshooting.", "Responsible technician for small production runs and venue black-box operations."],
    },
    {
      start: [2022, 2, 12],
      end: [2023],
      name: "Sound Design (student project)",
      info: [
        "Final-year project – interactive 3D simulation",
        "- Created sound design for a 3D island exploration simulation with two cave environments",
        "- Implemented realistic cavern acoustics in one environment and deliberately altered fidelity/processing",
      ],
    },
    {
      start: [2016, 4, 2],
      end: [2019],
      name: "Music Cursus",
      info: ["ETM", "Guitar & Voice"],
    },
    {
      start: [2018, 4, 2],
      end: [2019],
      name: "Worked as a musician and music produceer",
      info: ["DAWN.w, LeSonnar"],
    },
    {
      start: [2019],
      end: [2023],
      name: "Bachelor of Arts, Sound Engineering",
      info: ["Sound Engineering"],
    },
    {
      start: [2024],
      end: [2026],
      name: "Architecte en Technologie du Numérique",
      info: ["School 42"],
    },
    {
      start: [2025],
      end: [2026],
      name: "Started working on Web projects, Vanilla JS and React",
      info: ["School 42"],
    },
  ];

  function toDate([year, month = 1, day = 1]: TimelineDate) {
    return new Date(year, month - 1, day);
  }

  function getTopValue(dateData: TimelineDate) {
    const start = new Date(timelineStart, 0, 1);
    const end = new Date(timelineEnd + 1, 0, 1);
    const date = toDate(dateData);

    return ((date.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
  }

  function formatDate(dateData: TimelineDate) {
    const [year, month, day] = dateData;

    if (!month) return String(year);

    return toDate([year, month, day ?? 1]).toLocaleDateString("en-US", {
      month: "short",
      day: day ? "numeric" : undefined,
      year: "numeric",
    });
  }

  const positionedData = data.map((item, i) => {
    const top = getTopValue(item.start);
    const endTop = item.end ? getTopValue(item.end) : top;
    const closeCount = data.filter((other) => Math.abs(getTopValue(other.start) - top) < 4).findIndex((other) => other === item);

    return {
      ...item,
      top,
      endTop,
      side: i % 2 === 0 ? "left" : "right",
      offset: closeCount,
    };
  });

  return (
    <div className="timeline">
      <div className="timeline-bar" />

      <div className="timeline-bound timeline-bound-start">{timelineStart}</div>
      <div className="timeline-bound timeline-bound-end">{timelineEnd}</div>

      {positionedData.map((item, i) => {
        const durationHeight = Math.max(item.endTop - item.top, 1.2);

        return (
          <div
            key={i}
            className={`timeline-item ${item.side} ${item.end ? "has-duration" : ""}`}
            style={
              {
                top: `${item.top}%`,
                "--event-offset": item.offset,
                "--duration-height": `${durationHeight}%`,
              } as React.CSSProperties
            }
          >
            {item.end && (
              <>
                <div className="timeline-duration" />
                <div className="timeline-duration-line timeline-duration-line-start" />
                <div className="timeline-duration-line timeline-duration-line-end" />
                <div className="timeline-dot timeline-dot-end" />
              </>
            )}

            <div className="timeline-dot" />
            <div className="timeline-line" />

            <div className="timeline-card">
              <div className="timeline-date">
                {formatDate(item.start)}
                {item.end && <> — {formatDate(item.end)}</>}
              </div>

              <div className="timeline-title">{item.name}</div>

              {item.info?.map((info, index) => {
                return (
                  <p key={index} className="timeline-info">
                    {info}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
