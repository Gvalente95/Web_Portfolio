import { useDebugContext } from "./contexts/DebugContext";
import { Router } from "./components/Router";

import "./style/fonts.css";

function App() {
  const { showOutlines } = useDebugContext();
  return (
    <div className="app" data-debug-outlines={showOutlines}>
      <Router />
    </div>
  );
}

export default App;
