import { useIntersection } from "@/hooks/useIntersection";
import { useTranslation } from "react-i18next";

import "./style.css";

const delays = [22, 36, 41, 99, 11, 128, 56, 3, 98, 42, 127];

export function ContactIntro({ status }: { status: "error" | "sending" | "sent" | "idle" }) {
  const { t } = useTranslation();
  const { isIntersecting, ref } = useIntersection({ once: true });

  const text = status === "idle" ? t("contact.brief") : status === "sending" ? "" : t("contact.receiveQueryBrief");

  const spans = createSpans(text);

  function createSpans(text: string) {
    const newSpans = text.split(" ").map((item, i) => {
      const isAccent = item.startsWith("*");
      if (isAccent) item = item.slice(1, item.length);
      return (
        <span key={i} className={`letter${isAccent ? " animated" : ""}`} style={{ animationDelay: `${delays[i] * 10}ms` }}>
          {item}&nbsp;
        </span>
      );
    });
    return newSpans;
  }

  return (
    <div ref={ref} className={`contact-cool${isIntersecting ? " in-view" : ""}`}>
      <div className="contact-cool--intro">{spans}</div>
    </div>
  );
}
