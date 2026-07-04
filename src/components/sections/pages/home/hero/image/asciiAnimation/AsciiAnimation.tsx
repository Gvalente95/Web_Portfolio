import { AnimatedText } from "./AnimatedText";

export function AsciiAnimation() {
  return (
    <div>
      <AnimatedText
        segments={[
          { text: "Welcome to my ", type: "_" },
          { text: "web portfolio. ", color: "var(--accent)", type: "shuffle" },
          { text: "It took me quite a lot of effort and time to design it.", type: "_" },
          { text: "hope you'll enjoy it.", type: "all" },
        ]}
      />
    </div>
  );
}
