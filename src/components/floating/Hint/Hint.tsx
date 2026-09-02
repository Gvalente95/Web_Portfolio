import { useAppContext } from "@/contexts/AppContext";
import { createPortal } from "react-dom";

import "./style.css";

export function Hint() {
  const { hintData } = useAppContext();

  if (!hintData) return null;

  const estimatedWidth = hintData.text.length * 7.8 + 20;
  const rect = hintData.el.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - estimatedWidth / 2;

  left = Math.max(8, Math.min(left, window.innerWidth - estimatedWidth - 8));

  const top = rect.top - 40;
  const text = hintData.text;
  return createPortal(
    <div style={{ left, top }} className="hint">
      {text}
    </div>,
    document.body,
  );
}
