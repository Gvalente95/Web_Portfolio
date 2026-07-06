import { useState } from "react";
import { useDebugContext } from "../../contexts/DebugContext";
import { NeonButton } from "../shared/ui/neonButton/NeonButton";

import "./style.css";
export function Debugger() {
  const [collapsed, setCollapsed] = useState(true);
  const { showOutlines, setShowOutlines } = useDebugContext();

  if (!import.meta.env.DEV) {
    return <></>;
  }
  return (
    <div className={`debugger${collapsed ? " collapsed" : ""}`}>
      <header onClick={() => setCollapsed((prev) => !prev)}>Debugger</header>
      {!collapsed && (
        <>
          <NeonButton state={showOutlines} onClick={(v) => setShowOutlines(v)} label={`Outlines`} />
        </>
      )}
    </div>
  );
}
