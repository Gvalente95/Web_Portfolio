import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AppContextType = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const contextValue = useMemo(
    () => ({
      isDark,
      setIsDark,
    }),
    [isDark, setIsDark],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
