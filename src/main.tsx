import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";
import { DebugProvider } from "./contexts/DebugContext.tsx";

import "./style/index.css";
import "./style/animation.css";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DebugProvider>
      <AppProvider>
        <AudioPlayerProvider>
          <App />
        </AudioPlayerProvider>
      </AppProvider>
    </DebugProvider>
  </StrictMode>,
);
