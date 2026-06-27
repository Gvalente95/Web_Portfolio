import { useEffect, useState } from "react";

export const useKeyActions = ({ onKeyDown, onKeyUp }: { onKeyDown?: (e: KeyboardEvent) => void; onKeyUp?: (e: KeyboardEvent) => void }) => {
  const [keys, setKeys] = useState<Record<string, boolean>>({});

  const handleKeyPress = (e: KeyboardEvent) => {
    setKeys((prev) => ({
      ...prev,
      [e.key.toLowerCase()]: true,
    }));
    if (onKeyDown) onKeyDown(e);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setKeys((prev) => ({
      ...prev,
      [e.key.toLowerCase()]: false,
    }));
    if (onKeyUp) onKeyUp(e);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { keys };
};
