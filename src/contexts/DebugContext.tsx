import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type DebugContextType = {
  showOutlines: boolean;
  setShowOutlines: React.Dispatch<React.SetStateAction<boolean>>;
};

const DebugContext = createContext<DebugContextType | null>(null);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [showOutlines, setShowOutlines] = useState(false);

  const contextValue = useMemo(
    () => ({
      showOutlines,
      setShowOutlines,
    }),
    [showOutlines, setShowOutlines],
  );

  return <DebugContext.Provider value={contextValue}>{children}</DebugContext.Provider>;
}

export function useDebugContext() {
  const context = useContext(DebugContext);

  if (!context) {
    throw new Error("useDebugContext must be used within an AppProvider");
  }

  return context;
}
