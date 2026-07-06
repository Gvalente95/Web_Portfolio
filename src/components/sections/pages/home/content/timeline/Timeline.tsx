import { useParams } from "react-router-dom";
import timelineData from "@/data/timeline.json";
import { useSpinObject } from "@/hooks/useSpinObject";

import "./style.css";

type Lang = "en" | "fr" | "it";
type TimelineDate = [number, number?, number?];
type TimelineDateJson = number[];

type TimelineStepJson = {
  start: TimelineDateJson;
  end?: TimelineDateJson;
  name: Record<Lang, string>;
  info?: Record<Lang, string[]>;
};

const timelineStart = 2016;
const timelineEnd = 2026;

export function Timeline() {
  const { lang = "en" } = useParams();
  const currentLang = ["en", "fr", "it"].includes(lang) ? (lang as Lang) : "en";

  const data = Object.entries(timelineData as Record<string, TimelineStepJson>);

  function toDate([year, month = 1, day = 1]: TimelineDate) {
    return new Date(year, month - 1, day);
  }

  const { ref } = useSpinObject({ axes: ["y", "x", "z"], drag: true });

  function getTopValue(dateData: TimelineDate) {
    const start = new Date(timelineStart, 0, 1);
    const end = new Date(timelineEnd + 1, 0, 1);
    const date = toDate(dateData);

    return ((date.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
  }

  function formatDate(dateData: TimelineDate) {
    const [year, month, day] = dateData;

    if (!month) return String(year);

    return toDate([year, month, day ?? 1]).toLocaleDateString(currentLang, {
      month: "short",
      day: day ? "numeric" : undefined,
      year: "numeric",
    });
  }

  function asTimelineDate(date: TimelineDateJson): TimelineDate {
    return date as TimelineDate;
  }

  const positionedData = data.map(([key, item], i) => {
    const top = getTopValue(asTimelineDate(item.start));
    const endTop = item.end ? getTopValue(asTimelineDate(item.end)) : top;

    const closeCount = data.filter(([, other]) => Math.abs(getTopValue(other.start as TimelineDate) - top) < 4).findIndex(([otherKey]) => otherKey === key);

    return {
      key,
      ...item,
      top,
      endTop,
      side: i % 2 === 0 ? "left" : "right",
      offset: closeCount,
    };
  });

  return (
    <div className="timeline">
      <div className="timeline-world" ref={ref}>
        <div className="timeline-bar" />

        <div className="timeline-bound timeline-bound-start">{timelineStart}</div>
        <div className="timeline-bound timeline-bound-end">{timelineEnd}</div>

        {positionedData.map((item) => {
          const durationHeight = Math.max(item.endTop - item.top, 1.2);

          return (
            <div
              key={item.key}
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
                <div className="timeline-card-inner">
                  <div className="timeline-date">
                    {formatDate(asTimelineDate(item.start))}
                    {item.end && <> — {formatDate(asTimelineDate(item.end))}</>}
                  </div>

                  <div className="timeline-title">{item.name[currentLang]}</div>

                  {/* {item.info?.[currentLang]?.map((info, index) => (
                    <p key={index} className="timeline-info">
                      {info}
                    </p>
                  ))} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
