import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AppContextType = { hintData: HintData | null; showHint: (text: string, ref: any) => void; hideHint: () => void };

const AppContext = createContext<AppContextType | null>(null);

type HintData = { text: string; el: HTMLElement };

export function AppProvider({ children }: { children: ReactNode }) {
  const [hintData, setHintData] = useState<HintData | null>(null);

  const contextValue = useMemo(
    () => ({
      showHint,
      hideHint,
      hintData,
    }),
    [hintData],
  );

  function showHint(text: string, el: HTMLElement) {
    setHintData({ text, el });
  }
  function hideHint() {
    setHintData(null);
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
