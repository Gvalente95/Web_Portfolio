import { useDebugContext } from "./contexts/DebugContext";
import { Router } from "./components/Router";

import "./style/fonts.css";
import { HashRouter } from "react-router";

function App() {
  const { showOutlines } = useDebugContext();
  return (
    <div className="app" data-debug-outlines={showOutlines}>
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;
