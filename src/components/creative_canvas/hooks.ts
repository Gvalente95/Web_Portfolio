import { useEffect, useMemo, useRef, useState } from "react";
import type { Blob } from "./type";
import { marchingSquaresPath } from "./utils";
import { f_range } from "../../utils/math";

export const useMarchingBlobs = ({ size, resolution }: { size: { width: number; height: number }; resolution: number }) => {
  const { mouse } = useMouse();
  const [time, setTime] = useState(0);
  const blobsRef = useRef<Blob[]>([]);
  const bigCHange = 0.2;
  const blobMaxSize = 150;

  useEffect(() => {
    blobsRef.current = Array.from({ length: 10 }, (_, i) => {
      const homeX = f_range(20, size.width - 20);
      const homeY = f_range(80, size.height - 20);
      return {
        id: i,
        x: size.width / 2,
        y: size.height / 2,
        homeX: homeX,
        homeY: homeY,
        vx: 0,
        vy: 0,
        r: 20 + Math.random() * (Math.random() < bigCHange ? blobMaxSize : blobMaxSize / 2),
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        range: 30 + Math.random() * 90,
      };
    });
  }, [size.width, size.height]);

  useEffect(() => {
    let frame: number;

    const animate = (t: number) => {
      const viewTop = window.scrollY;
      const viewBottom = window.scrollY + window.innerHeight;
      const margin = 500;

      const m = mouse.current;
      const blobs = blobsRef.current;

      for (const b of blobs) {
        const visible = b.y + b.r > viewTop - margin && b.y - b.r < viewBottom + margin;

        if (!visible) {
          b.vx *= 0.95;
          b.vy *= 0.95;
          continue;
        }

        const dx = m.x - b.x;
        const dy = m.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (m.down) {
          b.vx += (dx / dist) * 0.25;
          b.vy += (dy / dist) * 0.25;

          if (dist < 250) {
            const force = (1 - dist / 250) * 0.08;
            b.vx += m.vx * force;
            b.vy += m.vy * force;
          }
        } else {
          const homeDx = b.homeX - b.x;
          const homeDy = b.homeY - b.y;
          const homeDist = Math.sqrt(homeDx * homeDx + homeDy * homeDy) || 1;

          b.vx += (homeDx / homeDist) * Math.min(homeDist * 0.01, 0.6);
          b.vy += (homeDy / homeDist) * Math.min(homeDist * 0.01, 0.6);
        }

        b.vx *= 0.92;
        b.vy *= 0.92;

        b.x += b.vx;
        b.y += b.vy;
      }

      mouse.current.vx *= 0.8;
      mouse.current.vy *= 0.8;

      setTime(t * 0.001);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const blobPath = useMemo(() => marchingSquaresPath(size.width, size.height, blobsRef.current, time, window.scrollY, resolution), [size.width, size.height, time]);
  return { blobPath };
};

export const useMouse = () => {
  const mouse = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    down: false,
    releasedAt: 0,
  });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const oldX = mouse.current.x;
      const oldY = mouse.current.y;

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY;
      mouse.current.vx = e.clientX - oldX;
      mouse.current.vy = e.clientY + window.scrollY - oldY;
    };

    const down = () => {
      mouse.current.down = true;
    };

    const up = () => {
      mouse.current.down = false;
      mouse.current.releasedAt = performance.now();
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  return { mouse };
};

export const useDocumentSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: document.body.scrollHeight,
  });
  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth,
        height: document.body.scrollHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return { size };
};
