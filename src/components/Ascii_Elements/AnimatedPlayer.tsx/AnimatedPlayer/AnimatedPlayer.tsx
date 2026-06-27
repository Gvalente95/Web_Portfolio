import { useEffect, useRef, useState } from "react";
import player_sprites from "../../../../data/ascii/player_sprites.json";

import "./style.css";

function getVisibilityDir(pos: number[]): Dir | null {
  const margin = 80;

  const left = 0;
  const right = window.innerWidth - margin;
  const top = window.scrollY + margin;
  const bottom = window.scrollY + window.innerHeight - margin;

  if (pos[0] < left) return "right";
  if (pos[0] > right) return "left";
  if (pos[1] < top) return "down";
  if (pos[1] > bottom) return "up";

  return null;
}

type Dir = "left" | "right" | "up" | "down";
type Action = "idle" | "move" | "attack";

const directions: Dir[] = ["left", "right", "up", "down"];

export const AnimatedPlayer = () => {
  const [curAction, setCurAction] = useState<Action>("idle");
  const [curDir, setCurDir] = useState<Dir>("down");
  const [frameIndex, setFrameIndex] = useState(0);
  const [pos, setPos] = useState([window.innerWidth / 2, 40]);

  const dirRef = useRef<Dir>("right");
  const actionRef = useRef<Action>("idle");
  const nextDecisionAt = useRef(0);
  const nextFrameAt = useRef(0);

  function pickDir(): Dir {
    return directions[Math.floor(Math.random() * directions.length)];
  }

  function wander(t: number) {
    const speed = 6;

    if (t > nextDecisionAt.current) {
      nextDecisionAt.current = t + 500 + Math.random() * 1200;

      if (Math.random() < 0.65) {
        actionRef.current = "move";
        dirRef.current = pickDir();
      } else {
        actionRef.current = "idle";
      }

      setCurAction(actionRef.current);
      setCurDir(dirRef.current);
    }

    if (actionRef.current !== "move") return;

    let dx = 0;
    let dy = 0;

    if (dirRef.current === "left") dx -= speed;
    if (dirRef.current === "right") dx += speed;
    if (dirRef.current === "up") dy -= speed;
    if (dirRef.current === "down") dy += speed;

    setPos((prev) => {
      const forcedDir = getVisibilityDir(prev);

      if (forcedDir) {
        dirRef.current = forcedDir;
        setCurDir(forcedDir);
      }

      let moveX = dx;
      let moveY = dy;

      if (forcedDir) {
        moveX = 0;
        moveY = 0;

        if (forcedDir === "left") moveX = -speed;
        if (forcedDir === "right") moveX = speed;
        if (forcedDir === "up") moveY = -speed;
        if (forcedDir === "down") moveY = speed;

        actionRef.current = "move";
        setCurAction("move");
      }

      return [prev[0] + moveX, prev[1] + moveY];
    });

    if (t > nextFrameAt.current) {
      nextFrameAt.current = t + 140;
      setFrameIndex((prev) => (prev + 1) % 2);
    }
  }

  useEffect(() => {
    let frame: number;

    const loop = (t: number) => {
      wander(t);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const sprite = curAction === "move" ? player_sprites.move[curDir][frameIndex] : player_sprites[curAction][curDir];

  return (
    <pre
      className="animated-sprite"
      style={{
        left: pos[0],
        top: pos[1],
      }}
    >
      {sprite}
    </pre>
  );
};
